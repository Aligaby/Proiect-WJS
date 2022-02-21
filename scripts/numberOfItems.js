import { listaDeProduse } from './cart.js';

if (listaDeProduse.length > 0) {
    const numberOfItems = document.getElementById('numberOfItems');
    numberOfItems.style.display = "inline";
    numberOfItems.textContent = listaDeProduse.length;
}