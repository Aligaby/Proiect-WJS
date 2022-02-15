const endpointUrl = 'data/content.json';
const idCategorie = location.href.split('id=')[1];

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

function dateProdus(produse) {
    // breadcrumbs
    const categorieBreadcrumb = document.getElementById('breadcrumbs__ul-category');
    categorieBreadcrumb.textContent = `${produse[0].categorie}`;

    // creez fiecare produs
    const productsCategory = document.getElementById('productsCategory');  
    produse.forEach(elem => {
        productsCategory.appendChild(createCards(elem));    
    });
} 

fetch(endpointUrl).then((data) => data.json()).then(date => {
    const produse = date.produse;
    produseDinCategorie = [];
    produse.filter(item => {
        if (item.categorie === idCategorie) {
            produseDinCategorie.push(item)
        }
    })
    dateProdus(produseDinCategorie);
})