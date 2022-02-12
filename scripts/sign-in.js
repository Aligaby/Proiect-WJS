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

    if (userInStorage === null || email.value !== userInStorage.userEmail) {
        errorAboveSignIn.innerText = `You must first create an account`;
    } else if (email.value === userInStorage.userEmail && pass.value !== userInStorage.userPassword) {
        errorAboveSignIn.innerText = `Email or password is invalid`;
    } else if (email.value === userInStorage.userEmail && pass.value === userInStorage.userPassword && loggedUser === null) {
        sessionStorage.setItem('userLogat', JSON.stringify(userInStorage));
        location.href = 'index.html';
    } else if (email.value === userInStorage.userEmail && pass.value === userInStorage.userPassword && loggedUser !== null) { 
        errorAboveSignIn.innerText = `${loggedUser.userFirstName} ${loggedUser.userLastName} you are already connected`;
    }    
})