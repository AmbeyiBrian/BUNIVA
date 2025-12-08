// ============================================
// BUNIVA - Particles Animation System
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const particlesContainer = document.getElementById('particles-container');
    if (!particlesContainer) return;

    // ============================================
    // Configuration
    // ============================================

    const CONFIG = {
        particleCount: 50,
        particleSizeMin: 1,
        particleSizeMax: 3,
        speedFactor: 0.3,
        connectionDistance: 100,
        connectionOpacity: 0.15,
        mouseInfluence: 120,
        colors: [
            'rgba(13, 148, 136, 0.8)',   // Teal primary
            'rgba(6, 182, 212, 0.7)',     // Cyan secondary
            'rgba(139, 92, 246, 0.6)',    // Purple accent
            'rgba(255, 255, 255, 0.5)'    // White
        ]
    };

    // ============================================
    // Canvas Setup
    // ============================================

    let width = particlesContainer.clientWidth;
    let height = particlesContainer.clientHeight;
    let mouseX = width / 2;
    let mouseY = height / 2;
    let isMouseInside = false;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    canvas.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;';

    particlesContainer.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    // ============================================
    // Particle Class
    // ============================================

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * CONFIG.speedFactor;
            this.vy = (Math.random() - 0.5) * CONFIG.speedFactor;
            this.size = Math.random() * (CONFIG.particleSizeMax - CONFIG.particleSizeMin) + CONFIG.particleSizeMin;
            this.color = CONFIG.colors[Math.floor(Math.random() * CONFIG.colors.length)];
            this.alpha = Math.random() * 0.5 + 0.5;
            this.pulseSpeed = Math.random() * 0.02 + 0.01;
            this.pulsePhase = Math.random() * Math.PI * 2;
        }

        update() {
            // Movement
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off edges with damping
            if (this.x < 0 || this.x > width) {
                this.vx *= -0.9;
                this.x = Math.max(0, Math.min(width, this.x));
            }
            if (this.y < 0 || this.y > height) {
                this.vy *= -0.9;
                this.y = Math.max(0, Math.min(height, this.y));
            }

            // Mouse interaction
            if (isMouseInside) {
                const dx = mouseX - this.x;
                const dy = mouseY - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < CONFIG.mouseInfluence) {
                    const force = (CONFIG.mouseInfluence - distance) / CONFIG.mouseInfluence;
                    this.vx -= (dx / distance) * force * 0.02;
                    this.vy -= (dy / distance) * force * 0.02;
                }
            }

            // Pulse animation
            this.pulsePhase += this.pulseSpeed;
            this.currentAlpha = this.alpha * (0.7 + Math.sin(this.pulsePhase) * 0.3);
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color.replace(/[\d.]+\)$/, `${this.currentAlpha})`);
            ctx.fill();
        }
    }

    // ============================================
    // Create Particles
    // ============================================

    const particles = [];
    for (let i = 0; i < CONFIG.particleCount; i++) {
        particles.push(new Particle());
    }

    // ============================================
    // Draw Connections
    // ============================================

    const drawConnections = () => {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < CONFIG.connectionDistance) {
                    const opacity = CONFIG.connectionOpacity * (1 - distance / CONFIG.connectionDistance);
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }

            // Connection to mouse
            if (isMouseInside) {
                const dx = mouseX - particles[i].x;
                const dy = mouseY - particles[i].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < CONFIG.mouseInfluence) {
                    const opacity = 0.2 * (1 - distance / CONFIG.mouseInfluence);
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(mouseX, mouseY);
                    ctx.strokeStyle = `rgba(13, 148, 136, ${opacity})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
        }
    };

    // ============================================
    // Animation Loop
    // ============================================

    const animate = () => {
        ctx.clearRect(0, 0, width, height);

        // Update and draw particles
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        // Draw connections
        drawConnections();

        requestAnimationFrame(animate);
    };

    // ============================================
    // Event Listeners
    // ============================================

    const heroSection = document.querySelector('.hero-section');

    heroSection?.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
        isMouseInside = true;
    });

    heroSection?.addEventListener('mouseleave', () => {
        isMouseInside = false;
    });

    window.addEventListener('resize', () => {
        width = particlesContainer.clientWidth;
        height = particlesContainer.clientHeight;
        canvas.width = width;
        canvas.height = height;
    });

    // ============================================
    // Start Animation
    // ============================================

    animate();
    console.log('✨ Particles system initialized');
});
