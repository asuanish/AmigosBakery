"use strict";

// Light/Dark Mode Function

function toggleMode() {
  let body = document.getElementsByTagName("body")[0];
  let img = document.getElementById("theme");

  if (body.classList.contains("light-mode")) {
    body.classList.remove("light-mode");
    body.classList.add("dark-mode");
  } else {
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
  }

  if (img.src.endsWith("sun.png")) {
    img.src = "images/moon.png";
  } else {
    img.src = "images/sun.png";
  }
}

// Button Function

function showProduct(event) {
  const elemId = event.target.id;
  const selectedNumber = elemId.charAt(elemId.length - 1);

  for (let i = 1; i <= 3; i++) {
    const product = document.getElementById("product" + i);
    if (i === parseInt(selectedNumber)) {
      product.classList.remove("hiddenItem");
      product.classList.add("currentItem");
    } else {
      product.classList.remove("currentItem");
      product.classList.add("hiddenItem");
    }
  }
}

// Game Function

function playGame(event) {
  let randNum = Math.floor(Math.random() * 10) + 1;
  let numInput = document.getElementById("userDisplay");
  let userInput = Number(numInput.value);
  let output = document.getElementById("message");

  if (randNum === 0 || userInput === 0 || userInput === "") {
    output.innerHTML = "Please enter a number between 1 and 10.";
  } else if (randNum === userInput) {
    output.innerHTML = `You've won a $${userInput} prize!`;
  } else {
    output.innerHTML = `Sorry no prizes for you. Try again!`;
  }
  event.preventDefault();
}

// Contact Function

function validateForm(event) {
  event.preventDefault();

  const name = document.getElementById("name");
  const phone = document.getElementById("phone");
  const email = document.getElementById("email");
  const comments = document.getElementById("comments");
  const errorList = document.getElementById("errorList");

  let errors = [];
  errorList.innerHTML = "";
  errorList.classList.add("hide");
  name.classList.remove("error");
  email.classList.remove("error");
  phone.classList.remove("error");
  comments.classList.remove("error");

  const nameRegex = /[A-Za-z]\s[A-Za-z]/i;
  const phoneRegex = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/;

  if (!name.value.match(nameRegex)) {
    errors.push("Please provide your full name");
    name.classList.add("error");
  }

  if (!phone.value.match(phoneRegex)) {
    errors.push("Invalid phone number");
    phone.classList.add("error");
  }

  if (!email.value.match(regexEmail) || email.value === "") {
    errors.push("Invalid email address");
    email.classList.add("error");
  }

  const phoneRadio = document.getElementById("phoneRadio");
  const emailRadio = document.getElementById("emailRadio");
  if (!phoneRadio.checked && !emailRadio.checked) {
    errors.push("Please select a method of contact");
  }

  if (comments.value === "") {
    errors.push("Comment required");
    comments.classList.add("error");
  }

  if (errors.length > 0) {
    const errorList = document.getElementById("errorList");
    errorList.classList.remove("hide");
    errors.forEach((error) => {
      const li = document.createElement("li");
      li.innerHTML = error;
      errorList.appendChild(li);
    });
  }
}

// Event Listener

document
  .getElementById("productButtons")
  .addEventListener("click", showProduct);
document
  .getElementById("contactSubmit")
  .addEventListener("click", validateForm);
document.getElementById("gameSubmit").addEventListener("click", playGame);
