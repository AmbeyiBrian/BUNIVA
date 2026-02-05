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
document.querySelectorAll('.main-nav a').forEach(link => {
    link.addEventListener('click', () => {
        mainNav.classList.remove('active');
    });
});

// Dark mode toggle
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle?.querySelector('i');

if (themeToggle && themeIcon) {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        themeIcon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeIcon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Header scroll effect
const header = document.querySelector('.site-header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Scroll reveal animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Apply to all sections except hero (which has its own animation)
document.querySelectorAll('section:not(.hero-section)').forEach(section => {
    section.classList.add('fade-in-section');
    observer.observe(section);
});
