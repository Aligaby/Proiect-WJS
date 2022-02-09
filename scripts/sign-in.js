const formIn = document.getElementById('signIn-form');
const email = formIn.elements['emailAddress'];
const pass = formIn.elements['password'];
const submit = formIn.elements['submitInUp'];
const errorAboveSignIn = document.getElementById('aboveSignIn');

formIn.addEventListener('input', () => {
    if (email.value.trim() !== '' && pass.value !== '') {
        submit.disabled = false;
    }
})

formIn.addEventListener('submit', (eventSubmit) => {
    eventSubmit.preventDefault();

    const userInStorage = JSON.parse(localStorage.getItem(email.value));
    const loggedUser = JSON.parse(sessionStorage.getItem('userLogat'));
    if (userInStorage !== null && userInStorage.userPassword === pass.value) {
        sessionStorage.setItem('userLogat', JSON.stringify(userInStorage));
        location.href = 'index.html';
    } else if (loggedUser.userFirstName !== 'undefined') {
        // nu permite altui email sa se logheze daca deja este unul logat in sessionStorage
        errorAboveSignIn.innerText = `You are logged in as ${loggedUser.userFirstName}`;
    } else {
        errorAboveSignIn.innerText = 'Email or password is invalid';
    }
})