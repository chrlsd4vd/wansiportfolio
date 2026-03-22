(function () {
  /**
   * Sets the theme on the body element.
   * @param {string} themeName - The theme class to add (e.g., 'theme-1'). 
   *                             Use 'none' to remove all themes.
   */
  function setTheme(themeName) {
    document.body.classList.remove("theme-1", "theme-2", "theme-3", "theme-4");
    
    if (themeName && themeName !== "none") {
      document.body.classList.add(themeName);
    }
    
    // Manage active class on nav links
    document.querySelectorAll("nav ul li").forEach((li) => {
      li.classList.remove("active");
      if (getThemeFromText(li.textContent || "") === themeName) {
        li.classList.add("active");
      }
    });
  }

  /**
   * Maps text content to a specific theme class.
   * @param {string} text - The button/link text.
   * @returns {string|null} - The theme class or null if no match.
   */
  function getThemeFromText(text) {
    const t = text.trim().toLowerCase().replace(/\s+/g, "");
    if (t.includes("stylesheet1")) return "theme-1";
    if (t.includes("stylesheet2")) return "theme-2";
    if (t.includes("stylesheet3")) return "theme-3";
    if (t.includes("stylesheet4")) return "theme-4";
    if (t.includes("nostylesheet")) return "none";
    return null;
  }

  /**
   * Click handler for theme triggers.
   */
  function handleClick(e) {
    const el = e.currentTarget;
    const text = el.textContent || "";
    const themeClass = getThemeFromText(text);

    if (themeClass !== null) {
      setTheme(themeClass);
    }

    // Only prevent default for <a> tags to avoid page jump
    if (el.tagName === "A") {
      e.preventDefault();
    }
  }

  function init() {
    // Select all list items in navigation
    document.querySelectorAll("nav ul li").forEach((li) => {
      li.addEventListener("click", handleClick);
    });

    // Select all links in the main text that trigger theme changes
    document.querySelectorAll("section a").forEach((a) => {
      a.addEventListener("click", handleClick);
    });

    // Set default theme to Stylesheet 1 (The Green/Blue Theme)
    setTheme("theme-1");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
