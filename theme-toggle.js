document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  const themes = ["mongo", "express", "react", "node"];

  // Load saved theme or default
  const savedTheme = localStorage.getItem("theme") || "mongo";
  applyTheme(savedTheme);
  themeToggle.value = savedTheme;

  // Change theme on select
  themeToggle.addEventListener("change", (e) => {
    const selectedTheme = e.target.value;
    applyTheme(selectedTheme);
    localStorage.setItem("theme", selectedTheme);
  });

  function applyTheme(themeName) {
    document.body.classList.remove(...themes.map(t => `theme-${t}`));
    document.body.classList.add(`theme-${themeName}`);
  }
});
