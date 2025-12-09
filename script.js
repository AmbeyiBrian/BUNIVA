// Mobile navigation
const navToggle = document.getElementById('nav-toggle-btn');
const navClose = document.getElementById('nav-close-btn');
const mainNav = document.getElementById('main-nav');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        mainNav.classList.add('active');
    });
}

if (navClose) {
    navClose.addEventListener('click', () => {
        mainNav.classList.remove('active');
    });
}

// Close nav when clicking on links
const navLinks = document.querySelectorAll('.main-nav a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mainNav.classList.remove('active');
    });
});

// Dark mode toggle
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

// Check for saved preference, otherwise use system preference
const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Only set data-theme if user has manually chosen (overrides system)
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
}

// Update icon based on current theme
const currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
if (currentTheme === 'dark') {
    themeIcon.className = 'fas fa-sun';
} else {
    themeIcon.className = 'fas fa-moon';
}

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const actualCurrent = currentTheme || (systemPrefersDark ? 'dark' : 'light');
    const newTheme = actualCurrent === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update icon
    if (newTheme === 'dark') {
        themeIcon.className = 'fas fa-sun';
    } else {
        themeIcon.className = 'fas fa-moon';
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});