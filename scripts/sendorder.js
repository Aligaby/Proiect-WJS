const clientAndItems = document.getElementById('clientAndItems');
clientAndItems.addEventListener('input', () => {
    const submit = clientAndItems.elements['submitOrder'];
    const street = clientAndItems.elements['street'];
    if (street.value.trim() !== '') {
        submit.disabled = false;
    }
})