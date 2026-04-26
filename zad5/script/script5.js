function toggleTheme() {
  const theme = document.getElementById("theme");

  if (theme.getAttribute("href") === "style/red5.css") {
    theme.setAttribute("href", "style/green5.css");
  } else {
    theme.setAttribute("href", "style/red5.css");
  }
}

function toggleProjects() {
  const projectsContent = document.getElementById("projects-content");
  const button = document.querySelector(".toggle-section-btn");

  if (projectsContent.style.display === "none") {
    projectsContent.style.display = "block";
    button.textContent = "Ukryj";
  } else {
    projectsContent.style.display = "none";
    button.textContent = "Pokaż";
  }
}

const form = document.getElementById("contact-form");

if (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    const firstNameError = document.getElementById("firstNameError");
    const lastNameError = document.getElementById("lastNameError");
    const emailError = document.getElementById("emailError");
    const messageError = document.getElementById("messageError");
    const successMessage = document.getElementById("successMessage");

    firstNameError.textContent = "";
    lastNameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";
    successMessage.textContent = "";

    let isValid = true;

    const containsDigit = /\d/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (firstName === "") {
      firstNameError.textContent = "Pole imię jest wymagane.";
      isValid = false;
    } else if (containsDigit.test(firstName)) {
      firstNameError.textContent = "Imię nie może zawierać cyfr.";
      isValid = false;
    }

    if (lastName === "") {
      lastNameError.textContent = "Pole nazwisko jest wymagane.";
      isValid = false;
    } else if (containsDigit.test(lastName)) {
      lastNameError.textContent = "Nazwisko nie może zawierać cyfr.";
      isValid = false;
    }

    if (email === "") {
      emailError.textContent = "Pole e-mail jest wymagane.";
      isValid = false;
    } else if (!emailPattern.test(email)) {
      emailError.textContent = "Podaj poprawny adres e-mail.";
      isValid = false;
    }

    if (message === "") {
      messageError.textContent = "Pole wiadomość jest wymagane.";
      isValid = false;
    }

    if (isValid) {
      successMessage.textContent =
        "Formularz został poprawnie wypełniony. Dziękuję za kontakt!";
      form.reset();
    }
  });
}
