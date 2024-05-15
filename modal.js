function editNav() {
	var x = document.getElementById("myTopnav"); 
	if (x.className === "topnav") {
		x.className += " responsive";
	} 
	else {
		x.className = "topnav";
	}
} 

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const formElem = document.querySelector("form[name='reserve']");
const modalExitBtn = document.querySelectorAll(".closeModal");
const modalSubmitBtn = document.querySelector(".btn-submit");
const modalForm = document.querySelector("form");
const modalSubmitted = document.querySelector(".submitted");

// tracking if form has been submitted already
let submittedAlready = false;

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
	modalbg.style.display = "block";
}

// Close modal event
modalExitBtn.forEach((btn) => btn.addEventListener("click", closeModal));

// Close modal function 
function closeModal() {
	modalbg.style.display = "none";
}

//makes sure that form displays warning for invalid inputs as they're first entered by user
formData.forEach(formInput => {
	formInput.addEventListener("change", (event) => {
		let validForm = true;
		if (validForm === false) {
			return;
		}
		let input = formInput.querySelector('input');
		let inputType = input.getAttribute("name");
		if (inputType == "location") {
			validForm = checkRadio(formInput);
		}
		else {
			validForm = checkInput(input, inputType);
		}
		if (!validForm) {
			formInput.dataset.showerror = true;
		}
		else {
			formInput.dataset.showerror = false; 
		}
	});
});

// submit modal form event
formElem.addEventListener("submit", function(event) {
	//	validate();
	event.preventDefault();
	if (submittedAlready) {
		validate();
	}
	let validForm = true;
	let	validFinal = true;
	formData.forEach(formInput => {
		let input = formInput.querySelector('input');
		let inputType = input.getAttribute("name");
		if (inputType == "location") {
			validForm = checkRadio(formInput);
		}
		else {
			validForm = checkInput(input, inputType);
		}
		if (!validForm) {
			formInput.dataset.showerror = true;
			validFinal = false;
		}
		else {
			formInput.dataset.showerror = false; 
		}
	});
	if (validFinal === false) {
		alert("Merci de bien vouloir compléter le formulaire");
		return;
	}
	if (validFinal) {
		validate();
	}
})

// confirms to the user that his form is valid and he's good to go.
function validate() {
	const contentModal = document.querySelector(".content");
	const submittedClose = document.querySelector(".button.closeModal");
	const submitted = document.querySelector(".submitted");
	const thanks = document.querySelector(".thanks");
	const	modalBody = document.querySelector(".modal-body");
	let modalHeight = contentModal.scrollHeight;
	let offsetX = modalSubmitBtn.offsetLeft;
	let offsetY = modalSubmitBtn.offsetTop;
	contentModal.style.display = "flex";
	contentModal.style.justifyContent = "end";
	submitted.style.display = "flex";
	thanks.style.margin = (modalHeight - 40) / 2 + "px auto"; 
	contentModal.style.height = modalHeight + 1 + "px";
	modalForm.style.display = "none";
	submittedAlready = true;
}

// master regex function group
function	checkInput(input, inputType) {
	const inputValue = input.value;
	let	valid = false;
	if (inputType == "first" || inputType == "last") {
		valid = validateName(inputValue);
	}
	else if (inputType == "email") {
		valid = validateEmail(inputValue);
	}
	else if (inputType == "birthdate") {
		valid = validateDOB(inputValue);
	}
	else if (inputType == "numEntries") {
		valid = validateNumEntries(inputValue);
	}
	else if (inputType == "terms") {
		valid = input.checked;
	}
	else
		alert("invalid input type : " + inputType);
	return (valid);
}

// radios must all be verifid to ensure this part of form is valid
function	checkRadio(formInput) {
	const radios = formInput.querySelectorAll('input[type="radio"]');
	let valid = false;
	radios.forEach(radio => {
		if (radio.checked) {
			valid = true;
		}
	});
	return (valid);
}

//regex name that allows for single union, single quote and single space
const 	nameRgx= /^([a-zA-Z]+[-'\40]?)+[a-zA-Z]+$/;
// regex for most common emails, does not support UTF8 format mails...
const	emailRgx= /^([\w]+[!#$%^&*_+-=]*)+[@]([\w]+[-]*)[\w]+[.][a-zA-Z]{2,3}$/;
// regex for numerical entry
const	numRgx= /^[0-9]{1,2}/;

// regex check for first name and last name validity
function  validateName(name) {
	return nameRgx.test(name);
}

// regex check for email validity
function	validateEmail(email) {
	return emailRgx.test(email)
}
// Date of birth validity verification following format
function	validateDOB(date) {
	let valid = false;
	const currentDate = new Date();
	const userDate = new Date(date);
	const reasonableDOB = new Date('1900-01-01');
	const age = currentDate.getFullYear() - userDate.getFullYear();
	if (age < 13 && age >= 0) {
		return (valid);
	}
	if (currentDate > userDate && userDate > reasonableDOB) {
		valid = true;
	}
	return (valid);
}

// regex check for number of previous entries
function	validateNumEntries(entries) {
	return numRgx.test(entries);
}
