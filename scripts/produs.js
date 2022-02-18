import { endpointUrl } from './global.js'; // calea spre JSON

// selectie valoare id produs din URL
const idProdus = Number(location.href.split('id=')[1]);

// preluare date din JSON
fetch(endpointUrl).then((data) => data.json()).then(date => {
    const produse = date.produse;
    dateProdus(produse[idProdus-1]);
    cartProdus(produse[idProdus-1])
})

// datele din JSON sunt incarcate in DOM
function dateProdus(produs) {
    const {id, categorie, titlu, descriere, pret, producator, codprodus, imagine, disponibilitate} = produs;

    // meta title
    document.title = `${titlu}`;

    // breadcrumbs
    const categorieBreadcrumb = document.getElementById('breadcrumbs__ul-category').firstElementChild;
    categorieBreadcrumb.href = `./categorie.html?id=${categorie}`;
    const withoutLine = categorie.split('-').join(' ');
    categorieBreadcrumb.textContent = `${withoutLine}`;
    // categorieBreadcrumb.textContent = `${categorie}`;
    const produsBreadcrumb = document.getElementById('breadcrumbs__ul-product');
    produsBreadcrumb.textContent = `${titlu}`;

    // produs
    const titluJson = document.getElementById('productTop__buyInfo-h1');
    titluJson.textContent = `${titlu}`;
    const imgJson = document.getElementById('productImage__img');
    imgJson.src = `${imagine}`;
    imgJson.alt = `${titlu}`;
    const producatorJson = document.getElementById('productTop__buyInfo-manufacturer');
    producatorJson.textContent = `Producator: ${producator}`;
    const codProdusJson = document.getElementById('productTop__buyInfo-productCode');
    codProdusJson.textContent = `Cod produs: ${codprodus}`;
    const pretJson = document.getElementById('productTop__buyInfo-price');
    pretJson.textContent = `${pret} lei`;
    if (disponibilitate) {
        const disponibilJson = document.querySelector('.inStoc-verde');
        disponibilJson.textContent = `In Stoc`;
    } else {
        const disponibilJson = document.getElementById('productTop__buyInfo-availability').children[0];
        disponibilJson.classList.toggle('inStoc-orange');
        disponibilJson.textContent = `La Comanda`;
    }
    const descriereJson = document.querySelector('.productContent__description');
    descriereJson.innerText = `${descriere}`;
} 

// alegerea cantitatii
const formQ = document.getElementById('formQuantity');
const inputQ = formQ.elements['formQuantity__quantity'];
const regex = /[^0-9]/g;
const butonMinus = formQ.elements['decrease'];
const butonPlus = formQ.elements['increase'];

formQ.addEventListener('input', () => {
    if (!inputQ.value) {
        inputQ.value = 1;
    } else {
        inputQ.value = inputQ.value.replace(regex, '');
    }
})

function chooseQuantity() {
    inputQ.value = 1

    function descrescator() {
        butonMinus.addEventListener('click', () => {
            if (inputQ.value <= 1) {
                inputQ.value = 1;
            } else {
                inputQ.value--;
            }
        })
    }

    function crescator() {
        butonPlus.addEventListener('click', () => {
            inputQ.value++
        })
    }

    return {
        crescator,
        descrescator
    };
}

const cantitate = chooseQuantity();
cantitate.descrescator();
cantitate.crescator();

function cartProdus(produs) {
    const {id, categorie, titlu, descriere, pret, producator, codprodus, imagine, disponibilitate} = produs;

    formQ.addEventListener('submit', (eventSubmit) => {
        const cart = {
            titlu: titlu,
            pret: pret,
            cantitate: Number(inputQ.value)
        }

        sessionStorage.setItem('cart'.concat(id), JSON.stringify(cart));
    });
    
}