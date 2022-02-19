const input = document.getElementById('password');
const eye = document.getElementById('showPassword');

eye.addEventListener('click', (eventClick) => {
    eventClick.preventDefault();

    const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
    input.setAttribute('type', type);
})