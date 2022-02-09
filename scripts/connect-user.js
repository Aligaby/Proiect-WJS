(function userLogat() {
    const loggedUser = JSON.parse(sessionStorage.getItem('userLogat'));
    const navRight = document.querySelector('#nav-right');

    if (loggedUser !== null) {
        navRight.removeChild(navRight.children[1]);
        navRight.children[1].innerText = `Buna ${loggedUser.userFirstName}`;

        // console.log(navRight.children[1].innerText.trim());
        // console.log(loggedUser);
    }
})();