// Add smooth animations to elements as they come into view
document.addEventListener('DOMContentLoaded', () => {
    // Setup Intersection Observer for animation
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    // Optional: Stop observing after animation
                    // observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15, // Trigger when 15% of the element is visible
            rootMargin: '0px 0px -50px 0px' // Negative bottom margin to trigger earlier
        });
        
        elements.forEach(element => {
            observer.observe(element);
        });
    };
    
    // Initialize animations
    animateOnScroll();
    
    // Add typed text effect to hero heading
    const initTypeEffect = () => {
        const heroHeading = document.querySelector('.hero-section h1');
        if (heroHeading && typeof Typed !== 'undefined') {
            // Check if Typed.js is loaded
            new Typed(heroHeading, {
                strings: [heroHeading.textContent],
                typeSpeed: 40,
                startDelay: 1000,
                showCursor: false
            });
        }
    };
    
    // Optional: initialize typed effect if Typed.js is included
    // initTypeEffect();
    
    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            const speed = 0.5; // Adjust speed as needed
            
            // Move background slightly for parallax effect
            if (scrollPosition < window.innerHeight) {
                heroSection.style.backgroundPosition = `center ${scrollPosition * speed}px`;
            }
        });
    }
    
    // Add active class to nav items based on scroll position
    const updateActiveNavLink = () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.main-nav a');
        
        const scrollPosition = window.scrollY + 100; // Offset for header height
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(navLink => {
                    navLink.classList.remove('active');
                    if (navLink.getAttribute('href') === `#${sectionId}`) {
                        navLink.classList.add('active');
                    }
                });
            }
        });
    };
    
    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // Initialize on page load
    
    // Enhanced hover effects for feature items
    const featureItems = document.querySelectorAll('.feature-item, .benefit-item');
    featureItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.classList.add('hover');
        });
        item.addEventListener('mouseleave', () => {
            item.classList.remove('hover');
        });
    });
});
