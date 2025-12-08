// ============================================
// BUNIVA - Modern Animations & Interactions
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    // ============================================
    // Scroll-Triggered Animations
    // ============================================

    const initScrollAnimations = () => {
        // Add animation class to elements
        const animatableElements = [
            '.product-card',
            '.service-card',
            '.contact-details',
            '.section-title'
        ];

        animatableElements.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                el.classList.add('animate-on-scroll');
            });
        });

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    // Optionally stop observing after animation
                    // observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    };

    // ============================================
    // Active Navigation Link Highlighting
    // ============================================

    const initActiveNavigation = () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.main-nav a');

        const updateActiveLink = () => {
            const scrollPosition = window.scrollY + 150;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        };

        window.addEventListener('scroll', updateActiveLink, { passive: true });
        updateActiveLink();
    };

    // ============================================
    // Header Scroll Effect
    // ============================================

    const initHeaderScroll = () => {
        const header = document.querySelector('.site-header');
        if (!header) return;

        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;

            if (currentScroll > 100) {
                header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.boxShadow = 'none';
            }

            lastScroll = currentScroll;
        }, { passive: true });
    };

    // ============================================
    // Smooth Parallax for Hero
    // ============================================

    const initParallax = () => {
        const orbs = document.querySelectorAll('.gradient-orb');
        if (orbs.length === 0) return;

        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;

            orbs.forEach((orb, index) => {
                const speed = 0.1 + (index * 0.05);
                const yOffset = scrollY * speed;
                orb.style.transform = `translateY(${yOffset}px)`;
            });
        }, { passive: true });
    };

    // ============================================
    // Button Hover Effects
    // ============================================

    const initButtonEffects = () => {
        const buttons = document.querySelectorAll('.btn');

        buttons.forEach(btn => {
            btn.addEventListener('mouseenter', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                btn.style.setProperty('--mouse-x', `${x}px`);
                btn.style.setProperty('--mouse-y', `${y}px`);
            });
        });
    };

    // ============================================
    // Card Tilt Effect
    // ============================================

    const initCardTilt = () => {
        const cards = document.querySelectorAll('.product-card, .service-card');

        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 30;
                const rotateY = (centerX - x) / 30;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });
    };

    // ============================================
    // Typing Effect for Hero (Optional)
    // ============================================

    const initTypingEffect = () => {
        const heroHeading = document.querySelector('.hero-section h1');
        if (!heroHeading || typeof Typed === 'undefined') return;

        new Typed(heroHeading, {
            strings: [heroHeading.textContent],
            typeSpeed: 40,
            startDelay: 500,
            showCursor: false
        });
    };

    // ============================================
    // Counter Animation for Stats
    // ============================================

    const animateCounter = (element, target, duration = 2000) => {
        let start = 0;
        const increment = target / (duration / 16);

        const updateCounter = () => {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };

        updateCounter();
    };

    // ============================================
    // Initialize All Animations
    // ============================================

    initScrollAnimations();
    initActiveNavigation();
    initHeaderScroll();
    initParallax();
    initButtonEffects();
    initCardTilt();

    // Optional effects - uncomment to enable
    // initTypingEffect();

    console.log('✨ BUNIVA animations initialized');
});
