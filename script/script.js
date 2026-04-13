function toggleTheme() {
  const theme = document.getElementById("theme");

  if (theme.getAttribute("href") === "style/red.css") {
    theme.setAttribute("href", "style/green.css");
  } else {
    theme.setAttribute("href", "style/red.css");
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