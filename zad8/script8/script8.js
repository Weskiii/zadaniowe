function toggleTheme() {
  const theme = document.getElementById("theme");

  if (theme.getAttribute("href") === "style8/red8.css") {
    theme.setAttribute("href", "style8/green8.css");
  } else {
    theme.setAttribute("href", "style8/red8.css");
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

const skillsList = document.getElementById("skills-list");
const projectsList = document.getElementById("projects-list");
const projectForm = document.getElementById("project-form");
const projectNameInput = document.getElementById("projectName");
const projectLinkInput = document.getElementById("projectLink");
const projectNameError = document.getElementById("projectNameError");
const projectLinkError = document.getElementById("projectLinkError");

let projects = [];

function saveProjectsToLocalStorage() {
  localStorage.setItem("projects", JSON.stringify(projects));
}

function loadProjectsFromLocalStorage() {
  const savedProjects = localStorage.getItem("projects");

  if (savedProjects) {
    projects = JSON.parse(savedProjects);
    renderProjects();
  } else {
    fetch("data.json")
      .then((response) => response.json())
      .then((data) => {
        projects = data.projects;
        saveProjectsToLocalStorage();
        renderProjects();
      })
      .catch((error) => console.error("Błąd ładowania JSON:", error));
  }
}

function renderProjects() {
  projectsList.innerHTML = "";

  projects.forEach((project, index) => {
    const li = document.createElement("li");

    const a = document.createElement("a");
    a.href = project.link;
    a.textContent = "Link do projektu";
    a.target = "_blank";

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Usuń";
    deleteButton.classList.add("delete-project-btn");

    deleteButton.addEventListener("click", function () {
      projects.splice(index, 1);
      saveProjectsToLocalStorage();
      renderProjects();
    });

    li.textContent = project.name + " - ";
    li.appendChild(a);
    li.appendChild(deleteButton);

    projectsList.appendChild(li);
  });
}

if (projectForm) {
  projectForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const projectName = projectNameInput.value.trim();
    const projectLink = projectLinkInput.value.trim();

    projectNameError.textContent = "";
    projectLinkError.textContent = "";

    let isValid = true;

    if (projectName === "") {
      projectNameError.textContent = "Podaj nazwę projektu.";
      isValid = false;
    }

    if (projectLink === "") {
      projectLinkError.textContent = "Podaj link do projektu.";
      isValid = false;
    }

    if (isValid) {
      const newProject = {
        name: projectName,
        link: projectLink,
      };

      projects.push(newProject);
      saveProjectsToLocalStorage();
      renderProjects();

      projectForm.reset();
    }
  });
}

fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    data.skills.forEach((skill) => {
      const li = document.createElement("li");
      li.textContent = skill;
      skillsList.appendChild(li);
    });
  })
  .catch((error) => console.error("Błąd ładowania JSON:", error));

loadProjectsFromLocalStorage();
