const hamburger = document.getElementById('hamburger');
const onOffMenu = document.getElementById('responsive__nav');

hamburger.addEventListener('click', () => {
    onOffMenu.classList.toggle('close');
});