const endpointUrl = 'data/content.json';
const productMain = document.getElementById('productMain');

fetch(endpointUrl).then((rezultat) => rezultat.json()).then(rezultatDate => {
    const produse = rezultatDate.produse;
    console.log(produse);

    produse.forEach(produs => {
        const {id, titlu, descriere} = produs;
        const userContainer = document.createElement('article');
        const idJson = document.createElement('div');
        const titluJson = document.createElement('div');
        const descriereJson = document.createElement('div');

        idJson.textContent = `${id}`;
        titluJson.textContent = `${titlu}`;
        descriereJson.textContent = `${descriere}`;
        userContainer.appendChild(idJson);
        userContainer.appendChild(titluJson);
        userContainer.appendChild(descriereJson);
        productMain.appendChild(userContainer);
    });
})

// const urlRelativ = location.href.split('/');
// const urlPagina = urlRelativ[urlRelativ.length-1];
// const idUrlPagina = urlPagina.substring(0, 2);
// console.log(+idUrlPagina);