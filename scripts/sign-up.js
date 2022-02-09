const form = document.getElementById('signup-form');

const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const emailAddress = document.getElementById('emailAddress');
const password = document.getElementById('password');
const city = document.getElementById('city');
const country = document.getElementById('country');
const submitButton = document.getElementById('submitInUp');

const inputRequired = 'Please fill in this field';
const passRequired = 'Please enter your password';
const passInvalid = 'Your password must be at least 8 characters long, one number, one uppercase, one special character ';
const emailRequired = 'Please enter your email';
const emailInvalid = 'Please enter a correct email address format';

form.addEventListener('input', () => { // pentru a debloca inputul country
    if (city.value.trim() === '') {
        country.setAttribute('readonly', 'readonly');
        country.value = '';
    } else {
        country.removeAttribute('readonly');
    }
})

form.addEventListener('input', () => { // pentru a debloca butonul submit
    if (firstName.value.trim() !== '' && lastName.value.trim() !== '' && emailAddress.value.trim() !== '' && password.value.trim() !== '' && country.value.trim() !== '') {
        submitButton.disabled = false;
    }
})

function hasValue(input, message) {
    if (input.value.trim() === '') {
        // daca campul este gol afisez eroarea (parametrul 2)
        return showError(input, message);
	}
	return showSuccess(input);
}

function showError(input, message) {
    // daca campul nu indeplineste conditiile afisez eroare si returnez false
    return showMessage(input, message, false);
}

function showSuccess(input) {
    // daca campul este OK nu afisez nimic si returnez true
    return showMessage(input, '', true);
}

function showMessage(input, message, type) {
    const msg = input.parentNode.querySelector('.underInput');
    msg.innerText = message;

    input.className = type ? 'success' : 'error';

    return type;
}

function validateEmail(input, requiredMsg, invalidMsg) {
	// verific daca campul nu este empty
	if (!hasValue(input, requiredMsg)) {
		return false;
	}
	// validare format email
	const emailRegex =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	const email = input.value.trim();
	if (!emailRegex.test(email)) {
		return showError(input, invalidMsg);
	}

    // verific daca email a mai fost utilizat
    const emailInLocalMemory = JSON.parse(localStorage.getItem(email));
    if (emailInLocalMemory) {
		return showError(input, 'This email is used');
	}

	return true;
}

function validatePassword(input, requiredMsg, invalidMsg) { 
    // verific daca campul nu este empty
    if (!hasValue(input, requiredMsg)) {
		return false;
	}

    // validare parola
    const passValue = input.value;
    if (passValue < 8) {
        return showError(input, invalidMsg);
    }
    const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
    if(!passValue.match(passRegex)) { 
        console.log(passValue);
        return showError(input, invalidMsg);
    }

    return true;
}

function redirect() {
    location.href = "sign-in.html";
}

form.addEventListener("submit", (eventSubmit) => {
    // stop form submission
    eventSubmit.preventDefault();

    // validez formularul
    let firstNameValid = hasValue(form.elements['firstName'], inputRequired);
    let lastNameValid = hasValue(form.elements['lastName'], inputRequired);
    let emailValid = validateEmail(form.elements["emailAddress"], emailRequired, emailInvalid);
    let passwordValid = validatePassword(form.elements['password'], passRequired, passInvalid);
    let cityValid = hasValue(form.elements['city'], inputRequired);
    let countryValid = hasValue(form.elements['country'], inputRequired);
    
    if (firstNameValid && lastNameValid && emailValid && cityValid && countryValid && passwordValid) {
        user = {
            userFirstName: firstName.value,
            userLastName: lastName.value,
            userEmail: emailAddress.value,
            userPassword: password.value,
            userCity: city.value,
            userCountry: country.value
        }
        localStorage.setItem(emailAddress.value, JSON.stringify(user));
        redirect();
    }
});
