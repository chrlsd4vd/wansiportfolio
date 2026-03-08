const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.add('light');
} else {
    body.classList.remove('light');
}

themeToggle.addEventListener('click', () => {
    if (body.classList.contains('light')) {
        body.classList.remove('light');
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.add('light');
        localStorage.setItem('theme', 'light');
    }
});
