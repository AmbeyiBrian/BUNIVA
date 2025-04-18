document.addEventListener('DOMContentLoaded', () => {
    // Header scroll effect
    const header = document.querySelector('.site-header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add shadow and slight background change on scroll
        if (scrollTop > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Optional: Hide/show header on scroll down/up
        /*
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;
        */
    });

    const navToggleBtn = document.getElementById('nav-toggle-btn');
    const navCloseBtn = document.getElementById('nav-close-btn');
    const mainNav = document.getElementById('main-nav');

    if (navToggleBtn && mainNav) {
        navToggleBtn.addEventListener('click', () => {
            mainNav.classList.add('active'); // Show nav
        });
    }

    if (navCloseBtn && mainNav) {
        navCloseBtn.addEventListener('click', () => {
            mainNav.classList.remove('active'); // Hide nav
        });
    }

    // Optional: Close nav when a link is clicked (good for single-page sites)
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Only remove active class if the nav is actually open (on mobile)
            if (mainNav.classList.contains('active')) {
                 mainNav.classList.remove('active');
            }
        });
    });

    // Optional: Close nav if user clicks outside of it
    document.addEventListener('click', (event) => {
        // Check if the mainNav exists and is active before trying to close
        if (mainNav && mainNav.classList.contains('active') &&
            !mainNav.contains(event.target) &&
            navToggleBtn && !navToggleBtn.contains(event.target)) { // Make sure not clicking the toggle button itself
                mainNav.classList.remove('active');
        }
    });

    // --- Scroll Navigation Button Logic ---
    const scrollUpBtn = document.getElementById('scroll-up-btn');
    const scrollDownBtn = document.getElementById('scroll-down-btn');
    const scrollNavContainer = document.getElementById('scroll-nav-buttons');
    // Select all direct children sections within main that have an ID
    const sections = Array.from(document.querySelectorAll('main > section[id]'));

    if (!scrollUpBtn || !scrollDownBtn || !scrollNavContainer || sections.length === 0) {
        console.warn("Scroll buttons or sections not found.");
        return; // Exit if elements are missing
    }

    // --- Throttle Function (for performance on scroll) ---
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // --- Function to Update Button States and Visibility ---
    const updateButtonStates = () => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;

        // Visibility Threshold (e.g., show after scrolling past half the first section)
        const visibilityThreshold = sections[0] ? sections[0].offsetHeight / 2 : 200;

        // Show/Hide Container
        if (scrollY > visibilityThreshold) {
            scrollNavContainer.classList.add('visible');
        } else {
            scrollNavContainer.classList.remove('visible');
        }

        // Disable Up Button at Top
        scrollUpBtn.disabled = scrollY < visibilityThreshold; // Disable if near top

        // Disable Down Button at Bottom
        // Check if the bottom of the viewport is very close to the bottom of the document
        scrollDownBtn.disabled = (windowHeight + scrollY) >= (docHeight - 5); // 5px tolerance

    };

    // --- Function to Find Target Section ---
    const findScrollTarget = (direction) => {
        const currentY = window.scrollY;
        const windowHeight = window.innerHeight;
        let targetSection = null;

        if (direction === 'down') {
            // Find the first section whose top is BELOW the current view top + a small offset
            for (const section of sections) {
                if (section.offsetTop > currentY + 5) { // 5px tolerance
                    targetSection = section;
                    break;
                }
            }
        } else if (direction === 'up') {
            // Find the last section whose top is ABOVE the current view top - a small offset
            for (let i = sections.length - 1; i >= 0; i--) {
                 // Ensure we scroll to the *start* of the section above the current view top
                if (sections[i].offsetTop < currentY - 5) { // 5px tolerance
                    targetSection = sections[i];
                    break;
                }
            }
             // If already very close to the top, target the very first section explicitly
             if (currentY < sections[0].offsetHeight && sections.length > 0) {
                 targetSection = sections[0]; // Special case for scrolling fully up
             }
        }
        return targetSection;
    };

    // --- Scroll Button Event Listeners ---
    scrollDownBtn.addEventListener('click', () => {
        const target = findScrollTarget('down');
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });

    scrollUpBtn.addEventListener('click', () => {
        const target = findScrollTarget('up');
        if (target) {
             // If it's the first section, ensure we go right to the top
             if (target === sections[0]) {
                  window.scrollTo({ top: 0, behavior: 'smooth'});
             } else {
                 target.scrollIntoView({ behavior: 'smooth', block: 'start' });
             }
        } else {
             // If no target found above, scroll to the very top
             window.scrollTo({ top: 0, behavior: 'smooth'});
        }
    });

    // --- Update buttons on scroll (throttled) and initial load ---
    window.addEventListener('scroll', throttle(updateButtonStates, 150)); // Update max ~6 times/sec
    updateButtonStates(); // Initial check on load

});

// Potential future JS:
// - Active link highlighting based on scroll position
// - Simple animations on scroll (e.g., fade-in sections)
// - Client-side form validation enhancements