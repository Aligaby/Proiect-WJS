function allStorage() {
    const values = [];
    const keys = Object.keys(sessionStorage);
    let carts = keys.filter(item => item.startsWith('cart'));

    carts.forEach(item => values.push(JSON.parse(sessionStorage.getItem(item))));

    return values;
}

if(!JSON.parse(sessionStorage.getItem('userLogat'))) {
    const section = document.getElementById('sectionList');
    const h1 = document.createElement('h1');
    h1.textContent = `Logheaza-te pentru a iti vedea cosul`;
    section.appendChild(h1);
} else {
    const listaDeProduse = allStorage();
    let valTotalCart = 0
    listaDeProduse.forEach(item => {
        const tbody = document.getElementById('productList');
        tbody.appendChild(createList(item));
        valTotalCart += (item.cantitate * item.pret);
    })
    document.getElementById('valueOfCart').textContent = `${valTotalCart} lei`;
}


function createList(product) {
    const tr = document.createElement('tr');
    const numeProdus = document.createElement('td');
    numeProdus.classList.add('produsInCos');
    numeProdus.textContent = `${product.titlu}`;
    const cantitateProdus = document.createElement('td');
    cantitateProdus.classList.add('cantitateInCos');
    cantitateProdus.textContent = `${product.cantitate}`;
    const pretProdus = document.createElement('td');
    pretProdus.classList.add('pretInCos');
    pretProdus.textContent = `${product.pret} lei`;
    const totalProdus = document.createElement('td');
    totalProdus.classList.add('totalProdusInCos');
    totalProdus.textContent = `${product.cantitate * product.pret} lei`;
    tr.appendChild(numeProdus);
    tr.appendChild(cantitateProdus);
    tr.appendChild(pretProdus);
    tr.appendChild(totalProdus);
    
    return tr
}