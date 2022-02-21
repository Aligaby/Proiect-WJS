(function creareContinut() {
    const urlRelativ = new URL(window.location);
    const firstName = urlRelativ.searchParams.get('firstName');
    const lastName = urlRelativ.searchParams.get('lastName');
    const valoareFinala = urlRelativ.searchParams.get('valoareFinala');  
    const mesajDeMultumire = document.getElementById('mesajDeMultumire');
    const h3 = document.createElement('h1');
    h3.textContent = `${firstName} ${lastName} multumim pentru comanda!`;
    const p = document.createElement('p');
    p.innerHTML = `La livrare trebuie sa achiti curierului suma de <span>${valoareFinala} lei</span>`;
    mesajDeMultumire.appendChild(h3);
    mesajDeMultumire.appendChild(p);
})();

(function soldProducts() {
    const keys = Object.keys(sessionStorage);
    let carts = keys.filter(item => item.startsWith('cart'));
    carts.forEach(item => sessionStorage.removeItem(item));
    const numberOfItems = document.getElementById('numberOfItems');
    numberOfItems.style.display = "none";
})();