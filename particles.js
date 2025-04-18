document.addEventListener('DOMContentLoaded', () => {
    // Particles animation for hero section
    const particlesContainer = document.getElementById('particles-container');
    if (!particlesContainer) return;
    
    // Configuration
    const PARTICLE_COUNT = 60;
    const PARTICLE_SIZE_MIN = 1;
    const PARTICLE_SIZE_MAX = 3;
    const SPEED_FACTOR = 0.5;
    const CONNECTION_DISTANCE = 120;
    const CONNECTION_OPACITY = 0.15;
      // Colors - using consistent brand colors
    const particleColors = [
        'rgba(255, 255, 255, 0.7)',
        'rgba(0, 128, 143, 0.8)', // Primary teal
        'rgba(255, 209, 102, 0.8)' // Accent gold
    ];
    
    let width = particlesContainer.clientWidth;
    let height = particlesContainer.clientHeight;
    let mouseX = width / 2;
    let mouseY = height / 2;
    
    // Create canvas
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    
    particlesContainer.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    
    // Create particles
    const particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * SPEED_FACTOR,
            vy: (Math.random() - 0.5) * SPEED_FACTOR,
            size: Math.random() * (PARTICLE_SIZE_MAX - PARTICLE_SIZE_MIN) + PARTICLE_SIZE_MIN,
            color: particleColors[Math.floor(Math.random() * particleColors.length)]
        });
    }
    
    // Mouse movement listener
    document.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    });
    
    // Resize listener
    window.addEventListener('resize', () => {
        width = particlesContainer.clientWidth;
        height = particlesContainer.clientHeight;
        canvas.width = width;
        canvas.height = height;
    });
    
    // Animation function
    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        // Update and draw particles
        particles.forEach(particle => {
            // Move particles
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > height) particle.vy *= -1;
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
            
            // Connect particles near the mouse
            const dx = mouseX - particle.x;
            const dy = mouseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < CONNECTION_DISTANCE) {
                // Draw connection to mouse
                ctx.beginPath();
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(mouseX, mouseY);
                ctx.strokeStyle = `rgba(255, 255, 255, ${CONNECTION_OPACITY * (1 - distance / CONNECTION_DISTANCE)})`;
                ctx.stroke();
                
                // Gently push particles away from mouse
                particle.vx -= dx * 0.0002;
                particle.vy -= dy * 0.0002;
            }
            
            // Connect close particles
            particles.forEach(otherParticle => {
                if (particle === otherParticle) return;
                
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < CONNECTION_DISTANCE) {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${CONNECTION_OPACITY * (1 - distance / CONNECTION_DISTANCE)})`;
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animate);
    }
    
    // Start animation
    animate();
});
