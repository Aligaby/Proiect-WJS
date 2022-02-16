// cale fisier JSON
const endpointUrl = 'data/content.json';
// conectarea la formularul de cautare
const formSearch = document.getElementById('hero__form');
const inputSearch = formSearch.elements['hero__form-searchBar'];
const submitSearch = formSearch.elements['hero__form-submitSearch'];

const productsCategory = document.getElementById('valueSearch'); 
const mesajSearch = document.getElementById('mesajSearch');

// mesaj initial pe pagina de search pentru a informa vizitatorul de dimensiunea minima a wordului cautat
mesajSearch.textContent = `Foloseste pentru cuvantul cautat minim 3 caractere`;

formSearch.addEventListener('submit', (eventSubmit) => {
    eventSubmit.preventDefault();
    
    productsCategory.innerHTML = ''; // curat pagina de rezultatele de la cautarea anterioara
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
    const wordToFound = inputSearch.value.trim().toLowerCase();
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
    const buton = document.createElement('button');
    buton.classList.add('card__button');
    buton.type = 'submit';
    buton.textContent = 'COMANDA';
    const a = document.createElement('a');
    a.href = `./produs.html?id=${product.id}`;
    a.textContent = `${product.id}`;
    card.appendChild(img);
    card.appendChild(titlu);
    card.appendChild(pret);
    card.appendChild(buton);
    card.appendChild(a);

    return card; 
}