import { endpointUrl } from './global.js';
// const endpointUrl = './data/content.json';
const productMain = document.getElementById('productMain');
const idProdus = Number(location.href.split('id=')[1]);

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

fetch(endpointUrl).then((data) => data.json()).then(date => {
    const produse = date.produse;
    dateProdus(produse[idProdus-1]);
})