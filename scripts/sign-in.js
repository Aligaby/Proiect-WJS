const formIn = document.getElementById('signIn-form');
const email = formIn.elements['emailAddress'];
const pass = formIn.elements['password'];
const submit = formIn.elements['submitInUp'];
const errorAboveSignIn = document.getElementById('aboveSignIn');

// function redirect() {
//     location.href = 'index.html';
// }

formIn.addEventListener('input', () => {
    if (email.value.trim() !== '' && pass.value !== '') {
        submit.disabled = false;
    }
})

formIn.addEventListener('submit', (eventSubmit) => {
    eventSubmit.preventDefault();

    const userInStorage = JSON.parse(localStorage.getItem(email.value));
    if (userInStorage !== null && userInStorage.userPassword === pass.value) {
        location.href = 'index.html';
    } else {
        errorAboveSignIn.innerText = 'Email or password is invalid';
    }
})