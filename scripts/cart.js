export let listaDeProduse = allStorage();

const cartFromUrl = window.location.pathname.split('/')
const numberCartFromUrl = cartFromUrl.length-1;

const inputValoareFinala = document.getElementById('valoareFinala');

if (cartFromUrl[numberCartFromUrl] === 'cart.html') {
    if (!JSON.parse(sessionStorage.getItem('userLogat'))) {
        listaDeProduse = 0;
        const section = document.getElementById('sectionList');
        const h1 = document.createElement('h1');
        h1.textContent = `Conecteaza-te pentru a vedea cosul!`;
        section.appendChild(h1);
    } else {
        let valTotalCart = 0;
        createTable();
        dateUserCompletate();
        listaDeProduse.forEach(item => {
            const tbody = document.getElementById('productList');
            tbody.appendChild(createList(item));
            valTotalCart += (item.cantitate * item.pret);
        })
        document.getElementById('valueOfCart').textContent = `${valTotalCart} lei`;
        inputValoareFinala.value = valTotalCart;
    }
}

function allStorage() {
    const values = [];
    const keys = Object.keys(sessionStorage);
    let carts = keys.filter(item => item.startsWith('cart'));

    carts.forEach(item => values.push(JSON.parse(sessionStorage.getItem(item))));

    return values;
}

function createTable() {
    const section = document.getElementById('sectionList');
    // creez tabelul
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    thead.setAttribute('id', 'headList');
    const tr = document.createElement('tr');
    const tdNume = document.createElement('td');
    tdNume.textContent = 'Denumire produs';
    const tdCant = document.createElement('td');
    tdCant.textContent = 'Cantitate';
    const tdPret = document.createElement('td');
    tdPret.textContent = 'Pret';
    const tdTotal = document.createElement('td');
    tdTotal.textContent = 'Total';
    const tdRemove = document.createElement('td');
    tdRemove.textContent = 'Sterge';
    const tbody = document.createElement('tbody');
    tbody.setAttribute('id', 'productList');
    tr.appendChild(tdNume);
    tr.appendChild(tdCant);
    tr.appendChild(tdPret);
    tr.appendChild(tdTotal);
    tr.appendChild(tdRemove);
    thead.appendChild(tr);
    table.appendChild(thead);
    table.appendChild(tbody);
    // creez linia de valoare totala
    const valoareFinala = document.createElement('div');
    valoareFinala.setAttribute('id', 'valoareFinala');
    const div = document.createElement('div');
    div.textContent = 'Valoare achizitie';
    const valueOfCart = document.createElement('div');
    valueOfCart.setAttribute('id', 'valueOfCart');
    valoareFinala.appendChild(div);
    valoareFinala.appendChild(valueOfCart);

    section.appendChild(table);
    section.appendChild(valoareFinala);
};

function dateUserCompletate() {
    const dateUtilizator = JSON.parse(sessionStorage.getItem('userLogat'));
    const firstName = document.getElementById('firstName');
    firstName.value = dateUtilizator.userFirstName;
    const lastName = document.getElementById('lastName');
    lastName.value = dateUtilizator.userLastName;
    const email = document.getElementById('emailAddress');
    email.value = dateUtilizator.userEmail;
    const city = document.getElementById('city');
    city.value = dateUtilizator.userCity;
    const country = document.getElementById('country');
    country.value = dateUtilizator.userCountry;
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
    const removeItem = document.createElement('td');
    removeItem.classList.add(`id${product.id}`);
    removeItem.classList.add('removeItem');
    removeItem.innerHTML = `<span class="material-icons">close</span>`
    tr.appendChild(numeProdus);
    tr.appendChild(cantitateProdus);
    tr.appendChild(pretProdus);
    tr.appendChild(totalProdus);
    tr.appendChild(removeItem);
    
    return tr
}