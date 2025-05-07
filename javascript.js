// Amigos Bakery 2.0

"use strict";

// Themes
function toggleMode() {
  const body = document.body;
  const themeIcon = document.getElementById("theme");

  body.classList.toggle("light-mode");
  body.classList.toggle("dark-mode");

  themeIcon.src = body.classList.contains("light-mode")
    ? "images/sun.png"
    : "images/moon.png";
}

// Favorite
function setupFavoriteForm() {
  const form = document.getElementById("favorite-form");
  const input = document.getElementById("favoriteNumber");
  const display = document.getElementById("favorite-display");

  const storedFavorite = localStorage.getItem("favoritePanDulce");
  if (storedFavorite) {
    display.textContent = `Your favorite is: ${storedFavorite}`;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const favorite = input.value.trim();
    if (favorite) {
      localStorage.setItem("favoritePanDulce", favorite);
      display.textContent = `Your favorite is: ${favorite}`;
      input.value = "";
    }
  });
}

// Game
function setupGameForm() {
  const gameForm = document.getElementById("guessingGame");

  gameForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const randNum = Math.floor(Math.random() * 10) + 1;
    const userInput = Number(
      document.getElementById("userDisplay").value.trim()
    );
    const output = document.getElementById("message");

    if (!userInput || userInput < 1 || userInput > 10) {
      output.textContent = "❗ Please enter a valid number between 1 and 10.";
    } else if (userInput === randNum) {
      output.textContent = `🎉 Congratulations! You picked ${userInput} and won a prize!`;
    } else {
      output.textContent = `😞 Sorry, you picked ${userInput} but the winning number was ${randNum}. Try again!`;
    }
  });
}

// Contact
function validateForm(event) {
  event.preventDefault();

  const name = document.getElementById("name");
  const phone = document.getElementById("phone");
  const email = document.getElementById("email");
  const comments = document.getElementById("comments");
  const errorList = document.getElementById("errorList");

  const errors = [];
  errorList.innerHTML = "";
  errorList.classList.add("hide");

  [name, phone, email, comments].forEach((input) =>
    input.classList.remove("error")
  );

  const nameRegex = /[A-Za-z]\s[A-Za-z]/i;
  const phoneRegex = /^([+]?\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
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
    errorList.classList.remove("hide");
    errors.forEach((error) => {
      const li = document.createElement("li");
      li.innerHTML = error;
      errorList.appendChild(li);
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  setupFavoriteForm();
  setupGameForm();
  document
    .getElementById("contactSubmit")
    .addEventListener("click", validateForm);
});
