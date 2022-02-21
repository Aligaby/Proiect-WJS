(function userLogat() {
    const loggedUser = JSON.parse(sessionStorage.getItem('userLogat'));
    const navRight = document.querySelector('#nav-right');
    const loginDelLink = document.getElementById('login');

    if (loggedUser !== null) {
        navRight.removeChild(navRight.children[1]);
        navRight.children[1].innerText = `Buna ${loggedUser.userFirstName}`;
        logout.style.display = 'inline';
        loginDelLink.removeAttribute('href'); // scot linkul de pe "Buna X"
    }
})();