// cale fisier JSON
import { endpointUrl } from './global.js';
import { formSearch } from './global.js';
import { inputSearch } from './global.js';

const productsCategory = document.getElementById('valueSearch'); 
const mesajSearch = document.getElementById('mesajSearch');

// mesaj initial pe pagina de search pentru a informa vizitatorul de dimensiunea minima a wordului cautat
mesajSearch.textContent = `Foloseste pentru cuvantul cautat minim 3 caractere`;

// daca cautarea vina din alta pagina (index, produs, categorie)
const url = new URL(window.location);
const query = url.searchParams.get('query');
if(query) {
    inputSearch.value = query;
    fetchDataFromJson();
}

// daca cautarea vina din pagina de search apasand butonul search
formSearch.addEventListener('submit', (eventSubmit) => {
    eventSubmit.preventDefault();
    
    productsCategory.innerHTML = ''; // curat pagina de rezultatele de la cautarea anterioare
    if (inputSearch.value.length > 2) {
        fetchDataFromJson();
    } else {
        inputSearch.value = '';
    }
});

function fetchDataFromJson() {
    fetch(endpointUrl).then((data) => data.json()).then(date => {
        const arrayProducts = date.produse;
        dateProdus(arrayProducts);
    })
}

function dateProdus(produse) {
    const cleanWord = inputSearch.value.replace(/\\/g, '');
    const wordToFound = cleanWord.trim().toLowerCase();
    let countProduseGasite = 0;
    // creez fiecare produs
    produse.forEach(elem => {
        if (elem.descriere.toLowerCase().search(wordToFound) > 0) {
            countProduseGasite++;
            productsCategory.appendChild(createCards(elem));
        }
    });

    if (countProduseGasite === 0) {
        mesajSearch.textContent = `Din pacate cautarea nu a returnat niciun produs. Incerca din nou!`;
    } else {
        mesajSearch.textContent = `Au fost gasite ${countProduseGasite} produse ce se potrivesc cu cautarea ta`;
        inputSearch.value = ''; // curat inputul de valoarea cautata care a returnat rezultat
    }
} 

function createCards(product) {
    const card = document.createElement('section');
    card.classList.add('card');
    const img = document.createElement('img');
    img.classList.add('card__img');
    img.src = `${product.imagine}`;
    img.alt = `${product.titlu}`;
    const titlu = document.createElement('p');
    titlu.classList.add('card__title');
    titlu.textContent = `${product.titlu}`;
    const pret = document.createElement('p');
    pret.classList.add('card__price');
    pret.textContent = `${product.pret} lei`;
    const seeProduct = document.createElement('a');
    seeProduct.classList.add('card__a');
    seeProduct.href = `./produs.html?id=${product.id}`;
    seeProduct.textContent = `SEE PRODUCT`;
    card.appendChild(img);
    card.appendChild(titlu);
    card.appendChild(pret);
    card.appendChild(seeProduct);

    return card; 
}