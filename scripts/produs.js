const endpointUrl = 'data/content.json';
const productMain = document.getElementById('productMain');
const idProdus = Number(location.href.split('id=')[1]);

function dateProdus(produs) {
    const {id, categorie, titlu, descriere, producator, imagine} = produs;
    const userContainer = document.createElement('article');
    const idJson = document.createElement('div');
    const categorieJson = document.createElement('div');
    const titluJson = document.createElement('div');
    const descriereJson = document.createElement('div');
    const producatorJson = document.createElement('div');
    const imgJson = document.createElement('img');

    idJson.textContent = `${id}`;
    categorieJson.textContent = `${categorie}`;
    titluJson.textContent = `${titlu}`;
    descriereJson.textContent = `${descriere}`;
    producatorJson.textContent = `${producator}`;
    imgJson.src = `${imagine}`;
    userContainer.appendChild(idJson);
    userContainer.appendChild(categorieJson);
    userContainer.appendChild(titluJson);
    userContainer.appendChild(descriereJson);
    userContainer.appendChild(producatorJson);
    userContainer.appendChild(imgJson);
    productMain.appendChild(userContainer);
} 

fetch(endpointUrl).then((data) => data.json()).then(date => {
    const produse = date.produse;
    console.log(produse);
    dateProdus(produse[idProdus-1]);
})