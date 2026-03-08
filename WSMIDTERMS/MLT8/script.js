(function () {
  // ---- helper: set theme class on body ----
  function setTheme(themeName) {
    // remove any existing theme-* classes
    document.body.classList.remove("theme-1", "theme-2", "theme-3", "theme-4");
    if (themeName && themeName !== "none") {
      document.body.classList.add(themeName);
    }
  }

  // ---- map text to theme class ----
  function getThemeFromText(text) {
    const t = text.trim().toLowerCase().replace(/\s+/g, "");
    if (t.includes("stylesheet1") || t === "stylesheet1") return "theme-1";
    if (t.includes("stylesheet2") || t === "stylesheet2") return "theme-2";
    if (t.includes("stylesheet3") || t === "stylesheet3") return "theme-3";
    if (t.includes("stylesheet4") || t === "stylesheet4") return "theme-4";
    if (t.includes("nostylesheet") || t === "nostylesheet") return "none";
    return null;
  }

  // ---- click handler ----
  function handleClick(e) {
    const el = e.currentTarget;
    const text = el.textContent || "";
    const themeClass = getThemeFromText(text);
    if (themeClass !== null) {
      setTheme(themeClass);
    }
    e.preventDefault(); // safe even for <li> (does nothing)
  }

  // ---- attach listeners to all clickable items ----
  function init() {
    // all <li> inside nav
    document.querySelectorAll("nav ul li").forEach((li) => {
      li.addEventListener("click", handleClick);
    });

    // all <a> inside section paragraphs (including "No Stylesheet")
    document.querySelectorAll("section p a").forEach((a) => {
      a.addEventListener("click", handleClick);
    });

    // optional: set default theme to "theme-1" when page loads
    setTheme("theme-1");
  }

  // run after DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
