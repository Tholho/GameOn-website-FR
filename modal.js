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

// Flag variable to track if form has been submitted already
let submittedAlready = false;

// Launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Launch modal form
function launchModal() {
	modalbg.style.display = "block";
}

// Close modal event
modalExitBtn.forEach((btn) => btn.addEventListener("click", closeModal));

// Close modal function 
function closeModal() {
	modalbg.style.display = "none";
}

// Makes sure that form displays warning for invalid inputs as they're first entered by user
formData.forEach(formInput => {
	formInput.addEventListener("change", (event) => {
		let validForm = true;
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

// On submit, the form is checked for validation, and this calls most of the subprocessess
formElem.addEventListener("submit", function(event) {
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

// Confirms to the user that his form is valid and he's good to go, also tweaks modal size
function validate() {
	const contentModal = document.querySelector(".content");
	const submitted = document.querySelector(".submitted");
	const thanks = document.querySelector(".thanks");
	let modalHeight = contentModal.scrollHeight;
	contentModal.style.display = "flex";
	contentModal.style.justifyContent = "end";
	submitted.style.display = "flex";
	thanks.style.margin = (modalHeight - 40) / 2 + "px auto"; 
	contentModal.style.height = modalHeight + 1 + "px";
	modalForm.style.display = "none";
	submittedAlready = true;
}

// Main regex function group
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

// Radios must all be verifid to ensure this part of form is valid
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

//////// REGEX LIST

// Regex name that allows for single union, single quote and single space
const 	nameRgx= /^([a-zA-Z]+[-'\40]?)+[a-zA-Z]+$/;

// Regex for most common emails, does not support UTF8 format mails...
const	emailRgx= /^([\w]+[!#$%^&*_+-=]*)+[@]([\w]+[-]*)[\w]+[.][a-zA-Z]{2,3}$/;

// Regex for numerical entry
const	numRgx= /^[0-9]{1,2}/;

//////// FORM CHECKING FUNCTIONS

// Regex check for first name and last name validity
function  validateName(name) {
	return nameRgx.test(name);
}

// Regex check for email validity
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

// Regex check for number of previous entries
function	validateNumEntries(entries) {
	return numRgx.test(entries);
}
