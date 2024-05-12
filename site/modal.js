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

// submit modal form event
formElem.addEventListener("submit", function(event) {
	//	validate();
	event.preventDefault();
	if (submittedAlready) {
		validate();
	}
	let validForm = true;
	formData.forEach(formInput => {
		console.log(validForm + " validForm");
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
			alert("Merci de bien vouloir compléter le formulaire");
		}
		else {
			formInput.dataset.showerror = false; 
		}
	});

	// catch one of them fails -> alert the user with a list of problematic inputs

	// else validate
	if (validForm) {
		validate();
	}
})

// confirms to the user that his form is valid and he's good to go.
function validate() {
	const contentModal = document.querySelector(".content");
	const submittedClose = document.querySelector(".button.closeModal");
	const submitted = document.querySelector(".submitted");
	const thanks = document.querySelector(".thanks");
	//	console.log(contentModal.scrollHeight);
	const	modalBody = document.querySelector(".modal-body");
	//	let modalWidth = modalBody.clientWidth;
	let modalHeight = contentModal.scrollHeight;
	let offsetX = modalSubmitBtn.offsetLeft;
	let offsetY = modalSubmitBtn.offsetTop;
	contentModal.style.display = "flex";
	contentModal.style.justifyContent = "end";
	submitted.style.display = "flex";
	thanks.style.margin = (modalHeight - 40) / 2 + "px auto"; 
	//	contentModal.style.width = modalWidth + "px";
	contentModal.style.height = modalHeight + 1 + "px";
	//	submittedClose.style.left = offsetX + "px";
	//	submittedClose.style.top = offsetY + "px";
	modalForm.style.display = "none";
	submittedAlready = true;
}

// master regex function group

function	checkInput(input, inputType) {
	const inputValue = input.value;
	let	valid = false;
	if (inputType == "first" || inputType == "last") {
		console.log("entering name test input is " + input + "inputtype is" + inputType);
		valid = validateName(inputValue);
		console.log(valid);
	}
	else if (inputType == "email") {
		console.log("entering mail test");
		valid = validateEmail(inputValue);
	}
	else if (inputType == "birthdate") {
		console.log("entering bod test");
		valid = validateDOB(inputValue);
	}
	else if (inputType == "numEntries") {
		valid = validateNumEntries(inputValue);
	}
	else if (inputType == "terms") {
		valid = input.checked;
	}
	else
		console.log("invalid input type : " + inputType);
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
const 	nameRgx= /^([a-zA-Z]{1,}[-'\40]?)*[a-zA-Z]{1,}$/;
// regex for most common emails, does not support UTF8 format mails...
const	emailRgx= /^([\w]+[!#$%^&*_+-=]*)+[@]([\w]+[-]*)[\w]+[.][a-zA-Z]{2,3}$/;
// regex for numerical entry
const	numRgx= /^[0-9]{1,2}/;

function checkRegex(input, regextype) {
	if (input.test(regextype)) {
		alert("name is valid");
	}
}

// regex check for first name and last name validity
function  validateName(name) {
	return nameRgx.test(name);
}
// regex check for email validity
// regex WIP ^([\w]{1,}[-_]?)*[a-zA-Z]{1,}[@]([\w]+[!#$%^&*][.][a-zA-Z]{2,3}$
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
		alert("L'utilisateur est trop jeune pour valider le formulaire");
		return (valid);
	}
	if (currentDate > userDate && userDate > reasonableDOB) {
		valid = true;
	}
	/*	if (date === null) {
		console.log("null");
	}
	if (date === NaN) {
		console.log("nan");
	}
	console.log(valid);
	console.log(userDate + " is date" + valid);
	*/
	return (valid);
}

// regex check for number of previous entries
function	validateNumEntries(entries) {
	return numRgx.test(entries);
}
