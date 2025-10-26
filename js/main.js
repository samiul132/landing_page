/* Floating Bubbles */
(function () {
    const atmosphere = document.getElementById('atmosphere');
    if (!atmosphere) return;

    const ELEMENTS = [
        { label: "Hâ‚‚O", type: "H2O" },
        { label: "COâ‚‚", type: "CO2" },
        { label: "Hâ‚‚SOâ‚„", type: "H2SO4" },
        { label: "Oâ‚‚", type: "O2" },
        { label: "Nâ‚‚", type: "N2" },
        { label: "CHâ‚„", type: "CH4" },
        { label: "NHâ‚ƒ", type: "NH3" },
        { label: "SOâ‚‚", type: "SO2" }
    ];

    const MAX_BUBBLES = 20;
    const SPAWN_INTERVAL = 800;
    const SIZE_MIN = 40;
    const SIZE_MAX = 110;
    const DURATION_MIN = 10000;
    const DURATION_MAX = 20000;
    let live = 0;

    const rand = (min, max) => Math.random() * (max - min) + min;

    function createBubble() {
        if (live >= MAX_BUBBLES) return;

        const elData = ELEMENTS[Math.floor(Math.random() * ELEMENTS.length)];
        const el = document.createElement("div");
        el.className = "atm-bubble";
        el.dataset.type = elData.type;
        el.textContent = elData.label;

        const size = rand(SIZE_MIN, SIZE_MAX);
        el.style.width = size + "px";
        el.style.height = size + "px";
        el.style.left = rand(2, 95) + "%";
        el.style.setProperty("--s", (size / SIZE_MAX).toFixed(2));
        el.style.setProperty("--start-x", rand(-40, 40) + "px");
        el.style.setProperty("--drift", rand(-60, 60) + "px");

        const duration = rand(DURATION_MIN, DURATION_MAX);
        el.style.animationDuration = duration / 1000 + "s";

        atmosphere.appendChild(el);
        requestAnimationFrame(() => el.classList.add("animate"));
        live++;

        setTimeout(() => {
            el.remove();
            live--;
        }, duration + 500);
    }

    setInterval(() => {
        const count = Math.floor(rand(0, 2));
        for (let i = 0; i <= count; i++) createBubble();
    }, SPAWN_INTERVAL);

    for (let i = 0; i < 6; i++) setTimeout(createBubble, i * 250);

})();


/* Mobile Menu Toggle */
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        const menu = document.getElementById('mobile-menu');
        if (menu) menu.classList.toggle('hidden');
    });
}


/* Scroll-Triggered Animations (Fade Up) */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const delay = parseFloat(el.getAttribute('data-animation-delay') || 0);

            setTimeout(() => el.classList.add('is-visible'), delay * 1000);
            observer.unobserve(el);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('[data-animation-class]').forEach(el => {
    el.classList.add(el.getAttribute('data-animation-class'));
    observer.observe(el);
});


/* Counter Animation */
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.counter-value').forEach(counter => {
                const target = +counter.getAttribute('data-target');
                let count = 0;
                const duration = 2000;
                const start = performance.now();

                const updateCount = (timestamp) => {
                    const elapsed = timestamp - start;
                    const progress = Math.min(elapsed / duration, 1);
                    count = Math.floor(progress * target);
                    counter.textContent = count;

                    if (progress < 1) requestAnimationFrame(updateCount);
                };
                requestAnimationFrame(updateCount);
            });
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.counter-value').forEach(counter => {
    const section = counter.closest('[data-section]');
    if (section) counterObserver.observe(section);
});


/* Accordion Animation */
document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        const icon = header.querySelector('i');
        const isOpen = content.classList.contains('active');

        // Close all others
        document.querySelectorAll('.accordion-content').forEach(c => {
            c.classList.remove('active');
            c.style.maxHeight = null;
        });
        document.querySelectorAll('.accordion-header i').forEach(i => {
            i.classList.remove('rotate-180');
        });

        if (!isOpen) {
            // Open clicked one
            content.classList.add('active');
            content.style.maxHeight = content.scrollHeight + "px";
            if (icon) icon.classList.add('rotate-180');
        }
    });
});

/* Product Filter */
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Get filter value
        const filter = button.getAttribute('data-filter');
        
        // Show/hide products based on filter
        document.querySelectorAll('.product-showcase').forEach(product => {
            if (filter === 'all' || product.getAttribute('data-category') === filter) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    });
});

/* Pricing Toggle */
document.querySelectorAll('input[name="pricing"]').forEach(radio => {
    radio.addEventListener('change', () => {
        const monthlyPrices = [29, 79, 199];
        const yearlyPrices = [23, 63, 159]; // 20% discount
        
        const priceElements = document.querySelectorAll('.price-card .text-4xl');
        
        if (document.getElementById('monthly').checked) {
            priceElements.forEach((element, index) => {
                element.textContent = `$${monthlyPrices[index]}`;
            });
        } else {
            priceElements.forEach((element, index) => {
                element.textContent = `$${yearlyPrices[index]}`;
            });
        }
    });
});
/* Tailwind Config Extension */
tailwind.config = {
    theme: {
        extend: {
            colors: {
                'deep-navy': '#0A192F',
                'deep-purple': '#4D1D7C',
                'gradient-start': '#050A30',
                'gradient-end': '#1B003B',
                'accent-blue': '#64FFDA',
                'text-light': '#CCD6F6',
                'text-muted': '#8892B0',
            },
            animation: {
                'gradient-shift': 'gradient-shift 15s ease infinite',
                'blob': 'blob 7s infinite',
            },
            keyframes: {
                'gradient-shift': {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                },
                'blob': {
                    '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
                    '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
                    '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
                },
            },
        },
    },
};

document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll('nav a[href]');
    const currentPath = window.location.pathname.split("/").pop(); // e.g. "about-us.html"

    navLinks.forEach(link => {
        const linkPath = link.getAttribute("href");

        if (linkPath === currentPath || (linkPath === "index.html" && currentPath === "")) {
            link.classList.add("text-accent-blue", "active-nav", "font-semibold");
        } else {
            link.classList.remove("text-accent-blue", "active-nav", "font-semibold");
        }
    });
});

// Smoke Animation JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('smokeCanvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    function setCanvasDimensions() {
        const container = canvas.parentElement;
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
    }
    
    setCanvasDimensions();
    
    // Animation state
    let time = 0;
    const bounceSpeed = 0.01;
    
    // Air composition labels
    const airComponents = ['N₂', 'O₂', 'Ar', 'CO₂', 'H₂O'];
    
    // Smoke particle with ocean wave-like shape
    class SmokeParticle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.vx = Math.random() * 2 + 2;
            this.vy = (Math.random() - 0.5) * 0.5 - 0.5;
            this.life = 0;
            this.maxLife = Math.random() * 80 + 60;
            this.size = Math.random() * 30 + 20;
            this.rotation = Math.random() * Math.PI * 2;
            this.rotationSpeed = (Math.random() - 0.5) * 0.03;
            this.waveOffset = Math.random() * Math.PI * 2;
            this.waveFrequency = Math.random() * 2 + 2;
            this.component = airComponents[Math.floor(Math.random() * airComponents.length)];
            this.showLabel = Math.random() < 0.3; // 30% chance to show label
        }
    
        update() {
            this.life++;
            const progress = this.life / this.maxLife;
            
            // Ocean wave motion
            this.x += this.vx;
            this.y += this.vy + Math.sin(this.life * 0.05 + this.waveOffset) * 0.5;
            
            this.vx *= 0.99;
            this.vy *= 0.99;
            
            this.rotation += this.rotationSpeed;
            this.size += 0.4;
            
            return this.life < this.maxLife;
        }
    
        draw() {
            const progress = this.life / this.maxLife;
            const alpha = Math.max(0, 1 - progress);
            
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            
            // Draw ocean wave-like smoke shape
            ctx.beginPath();
            const points = 12;
            for (let i = 0; i <= points; i++) {
                const angle = (i / points) * Math.PI * 2;
                
                // Create wave pattern like ocean waves
                const wave1 = Math.sin(angle * this.waveFrequency + this.life * 0.1);
                const wave2 = Math.sin(angle * (this.waveFrequency + 1) + this.life * 0.15);
                const waveEffect = (wave1 + wave2 * 0.5) * 0.3;
                
                const r = this.size * (0.8 + waveEffect);
                const x = Math.cos(angle) * r;
                const y = Math.sin(angle) * r * 0.7; // Slightly flatten for wave effect
                
                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.closePath();
            
            // Gradient for green smoke
            const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size);
            gradient.addColorStop(0, `rgba(120, 255, 120, ${alpha * 0.8})`);   // light green center
            gradient.addColorStop(0.4, `rgba(90, 240, 90, ${alpha * 0.5})`);
            gradient.addColorStop(0.7, `rgba(60, 200, 60, ${alpha * 0.3})`);
            gradient.addColorStop(1, `rgba(40, 160, 40, 0)`);                  // fade out green

            ctx.fillStyle = gradient;
            ctx.fill();

            // Green wave ridges
            ctx.strokeStyle = `rgba(100, 255, 100, ${alpha * 0.4})`;
            ctx.lineWidth = 1;
            ctx.stroke();

            
            // Draw air component label
            if (this.showLabel && alpha > 0.3) {
                ctx.font = 'bold 14px Arial';
                ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.9})`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(this.component, 0, 0);
            }
            
            ctx.restore();
        }
    }
    
    const particles = [];
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        time += bounceSpeed;
        
        // Create particles from the left side of the screen
        const emissionX = canvas.width * 0.1;
        const emissionY = canvas.height * 0.5;
        
        if (Math.random() < 0.25) {
            particles.push(new SmokeParticle(emissionX, emissionY));
        }
        
        // Update and draw particles
        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].draw();
            if (!particles[i].update()) {
                particles.splice(i, 1);
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        setCanvasDimensions();
    });
    
    // Handle canvas click for more particles
    canvas.addEventListener('click', (e) => {
        const rect = canvas.getBoundingClientRect();
        const emissionX = canvas.width * 0.1;
        const emissionY = canvas.height * 0.5;
        
        for (let i = 0; i < 25; i++) {
            particles.push(new SmokeParticle(
                emissionX + (Math.random() - 0.5) * 20,
                emissionY + (Math.random() - 0.5) * 20
            ));
        }
    });
});