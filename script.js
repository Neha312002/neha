/* ========================================================
   FOR YOU ❤️ — Premium Interactive Script
   ======================================================== */

// ─── Sparkle Cursor Trail (canvas) ──────────────────
(function initSparkles() {
    const canvas = document.getElementById('sparkle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: -100, y: -100 };

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    document.addEventListener('mousemove', e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        for (let i = 0; i < 3; i++) {
            particles.push({
                x: mouse.x + (Math.random() - .5) * 10,
                y: mouse.y + (Math.random() - .5) * 10,
                size: Math.random() * 3 + 1,
                speedX: (Math.random() - .5) * 1.5,
                speedY: (Math.random() - .5) * 1.5 - 1,
                life: 1,
                color: `hsl(${330 + Math.random() * 40}, 100%, ${70 + Math.random() * 20}%)`
            });
        }
    });

    function animateSparkles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p, i) => {
            p.x += p.speedX;
            p.y += p.speedY;
            p.life -= 0.02;
            p.size *= 0.98;
            if (p.life <= 0) { particles.splice(i, 1); return; }
            ctx.save();
            ctx.globalAlpha = p.life;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            // Draw a tiny star
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            // Glow effect
            ctx.shadowBlur = 8;
            ctx.shadowColor = p.color;
            ctx.fill();
            ctx.restore();
        });
        // Keep array from getting too large
        if (particles.length > 200) particles.splice(0, 50);
        requestAnimationFrame(animateSparkles);
    }
    animateSparkles();
})();

// ─── Typewriter Effect for Opening Title ────────────
(function typewriterInit() {
    const el = document.getElementById('opening-title');
    if (!el) return;
    const text = 'Hey You ❤️';
    let i = 0;
    el.style.minHeight = '1.2em';

    function type() {
        if (i <= text.length) {
            el.textContent = text.slice(0, i);
            i++;
            setTimeout(type, 120);
        }
    }
    setTimeout(type, 600);
})();

// ─── Screen 1 → Countdown ──────────────────────────
function enterHeart() {
    const opening = document.getElementById('opening-screen');
    opening.style.opacity = '0';
    opening.style.transition = 'opacity .6s ease';

    setTimeout(() => {
        opening.style.display = 'none';
        const countdown = document.getElementById('countdown-screen');
        countdown.style.display = 'flex';
        countdown.style.opacity = '0';
        countdown.style.transition = 'opacity .6s ease';
        setTimeout(() => { countdown.style.opacity = '1'; }, 50);

        // Start music
        const audio = document.getElementById('bg-music');
        if (audio) audio.play().catch(() => {});

        startCountdown();
    }, 600);
}

// ─── Screen 2: Countdown with Ring + Emoji Trail ────
function startCountdown() {
    const TOTAL = 10;
    let count = TOTAL;
    const circumference = 2 * Math.PI * 54;
    const ring   = document.getElementById('ring-progress');
    const numEl  = document.getElementById('countdown-number');
    const spanEl = document.getElementById('count');
    const trail  = document.getElementById('emoji-trail');
    const emojis = ['💖', '✨', '💕', '🌙', '💗', '🌸', '💘', '⭐', '💝', '🦋'];

    if (ring) {
        ring.style.strokeDasharray  = circumference;
        ring.style.strokeDashoffset = 0;
    }

    const interval = setInterval(() => {
        count--;
        if (spanEl) spanEl.innerText = count;
        if (numEl) numEl.innerText = count;

        // Animate ring
        if (ring) {
            ring.style.strokeDashoffset = circumference * (1 - count / TOTAL);
        }

        // Add emoji to trail
        if (trail) {
            const em = document.createElement('span');
            em.textContent = emojis[TOTAL - count - 1] || '💖';
            trail.appendChild(em);
        }

        if (count === 0) {
            clearInterval(interval);
            const screen = document.getElementById('countdown-screen');
            screen.style.opacity = '0';
            screen.style.transition = 'opacity .5s ease';
            setTimeout(() => {
                screen.style.display = 'none';
                triggerHeartBurst();
            }, 500);
        }
    }, 1000);
}

// ─── Heart Burst → Scroll Content ───────────────────
function triggerHeartBurst() {
    const burst = document.getElementById('heart-burst');
    if (!burst) { revealPage(); return; }

    burst.style.display = 'flex';
    burst.classList.add('active');

    setTimeout(() => {
        burst.style.display = 'none';
        burst.classList.remove('active');
        revealPage();
    }, 1200);
}

// ─── Proposal (now at bottom of page) ───────────────
function sayYes() {
    const resp = document.getElementById('response');
    resp.innerText = 'I knew it 😌❤️';
    resp.style.animation = 'fadeSlideUp .6s ease forwards';
    launchConfetti();

    // After a beat, launch the full celebration
    setTimeout(() => {
        const overlay = document.getElementById('celebration-overlay');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Start fireworks
        initFireworks();

        // Start heart rain
        startHeartRain();

        // Floating emoji bursts
        startEmojiFloats();

        // Typewriter love message
        setTimeout(() => {
            typewriteCelebration("From this moment on, every heartbeat is yours. You are my forever, my always, my everything. I love you more than words could ever say… 💕");
        }, 1800);

    }, 1500);
}

// ─── Fireworks Canvas ────────────────────────────────
function initFireworks() {
    const canvas = document.getElementById('fireworks-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fireworks = [];
    const particles = [];
    const colors = ['#ff6b9d','#ffa8cc','#a18cd1','#ffd700','#ff4d7d','#fbc2eb','#fff','#ee5a6f'];

    class Firework {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height;
            this.targetY = Math.random() * canvas.height * .4 + 40;
            this.speed = 3 + Math.random() * 3;
            this.done = false;
        }
        update() {
            this.y -= this.speed;
            if (this.y <= this.targetY) {
                this.done = true;
                this.explode();
            }
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = '#ffd700';
            ctx.shadowBlur = 8;
            ctx.shadowColor = '#ffd700';
            ctx.fill();
        }
        explode() {
            const count = 40 + Math.floor(Math.random() * 30);
            for (let i = 0; i < count; i++) {
                const angle = (Math.PI * 2 / count) * i;
                const speed = 1 + Math.random() * 3;
                particles.push({
                    x: this.x, y: this.y,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    alpha: 1,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    size: 1.5 + Math.random() * 2,
                    decay: .012 + Math.random() * .015
                });
            }
        }
    }

    let frameId;
    let lastLaunch = 0;

    function loop(time) {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillStyle = 'rgba(0,0,0,0.15)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = 'lighter';

        // Launch new fireworks
        if (!lastLaunch || time - lastLaunch > 300 + Math.random() * 500) {
            fireworks.push(new Firework());
            lastLaunch = time;
        }

        // Update fireworks
        for (let i = fireworks.length - 1; i >= 0; i--) {
            fireworks[i].update();
            fireworks[i].draw();
            if (fireworks[i].done) fireworks.splice(i, 1);
        }

        // Update particles
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += .03; // gravity
            p.alpha -= p.decay;
            if (p.alpha <= 0) { particles.splice(i, 1); continue; }

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.alpha;
            ctx.shadowBlur = 6;
            ctx.shadowColor = p.color;
            ctx.fill();
            ctx.globalAlpha = 1;
        }

        frameId = requestAnimationFrame(loop);
    }
    frameId = requestAnimationFrame(loop);

    // Stop after 15s to save performance
    setTimeout(() => { cancelAnimationFrame(frameId); }, 15000);
}

// ─── Heart Rain ──────────────────────────────────────
function startHeartRain() {
    const container = document.querySelector('.celebration-hearts-rain');
    if (!container) return;
    const hearts = ['❤️','💖','💕','💗','💘','💓','💝','🩷','♥️'];
    let count = 0;
    const interval = setInterval(() => {
        const h = document.createElement('span');
        h.className = 'cel-heart-rain';
        h.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        h.style.left = Math.random() * 100 + '%';
        h.style.fontSize = (.8 + Math.random() * 1.5) + 'rem';
        h.style.animationDuration = (3 + Math.random() * 4) + 's';
        h.style.animationDelay = (Math.random() * .5) + 's';
        container.appendChild(h);
        setTimeout(() => h.remove(), 7500);
        count++;
        if (count > 80) clearInterval(interval);
    }, 200);
}

// ─── Floating Emoji Bursts ───────────────────────────
function startEmojiFloats() {
    const emojis = ['💖','✨','💍','🥰','💕','🌹','💗','⭐','🦋','💘'];
    let count = 0;
    const interval = setInterval(() => {
        const el = document.createElement('span');
        el.className = 'cel-emoji';
        el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        el.style.left = (10 + Math.random() * 80) + '%';
        el.style.bottom = '5%';
        el.style.fontSize = (1.5 + Math.random() * 1.5) + 'rem';
        el.style.animationDuration = (3 + Math.random() * 2) + 's';
        document.getElementById('celebration-overlay').appendChild(el);
        setTimeout(() => el.remove(), 5500);
        count++;
        if (count > 40) clearInterval(interval);
    }, 350);
}

// ─── Celebration Typewriter ──────────────────────────
function typewriteCelebration(text) {
    const el = document.getElementById('celebration-typewriter');
    if (!el) return;
    let i = 0;
    function type() {
        if (i < text.length) {
            el.textContent += text.charAt(i);
            i++;
            setTimeout(type, 45);
        }
    }
    type();
}

function moveNo() {
    const btn = document.getElementById('noBtn');
    const vw = window.innerWidth  - btn.offsetWidth  - 20;
    const vh = window.innerHeight - btn.offsetHeight - 20;
    btn.style.position = 'fixed';
    btn.style.left = Math.max(10, Math.random() * vw) + 'px';
    btn.style.top  = Math.max(10, Math.random() * vh) + 'px';
    btn.style.zIndex = '20';
    btn.style.transition = 'left .15s ease, top .15s ease';
}

// ─── Confetti on YES ────────────────────────────────
function launchConfetti() {
    const container = document.getElementById('yes-confetti');
    if (!container) return;

    const colors = ['#ff6b9d', '#ffa8cc', '#a18cd1', '#fbc2eb', '#fff', '#ff4d7d', '#ee5a6f', '#ffd700'];

    for (let i = 0; i < 80; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.left = Math.random() * 100 + 'vw';
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        piece.style.width  = (Math.random() * 10 + 5) + 'px';
        piece.style.height = (Math.random() * 10 + 5) + 'px';
        piece.style.animationDuration = (Math.random() * 2 + 2) + 's';
        piece.style.animationDelay    = (Math.random() * 1) + 's';
        piece.style.borderRadius = Math.random() > .5 ? '50%' : '2px';
        container.appendChild(piece);
    }

    // Clean up confetti after animation
    setTimeout(() => { container.innerHTML = ''; }, 5000);
}

// ─── Reveal scrollable page (after heart burst) ────
function revealPage() {
    const scroll = document.getElementById('scroll-content');
    scroll.style.display = 'block';
    scroll.style.opacity = '0';
    scroll.style.transition = 'opacity .6s ease';
    setTimeout(() => { scroll.style.opacity = '1'; }, 50);
    window.scrollTo({ top: 0 });
    initScrollReveal();
}

// ─── Smooth scroll helper ───────────────────────────
function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// ─── Scroll-Reveal Observer ─────────────────────────
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Stagger children
                const children = entry.target.querySelectorAll('.reveal-child');
                children.forEach((child, i) => {
                    setTimeout(() => child.classList.add('visible'), i * 140);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ─── Gallery: tap support for mobile ────────────────
document.addEventListener('click', (e) => {
    const card = e.target.closest('.memory-card');
    if (!card) return;
    document.querySelectorAll('.memory-card.tapped').forEach(c => {
        if (c !== card) c.classList.remove('tapped');
    });
    card.classList.toggle('tapped');
});

// ─── Active nav link highlight on scroll ────────────
const sectionIds = ['gallery', 'reasons', 'letter', 'future', 'proposal'];

window.addEventListener('scroll', () => {
    const nav = document.getElementById('sticky-nav');
    if (!nav) return;
    const links = nav.querySelectorAll('a');
    let current = '';

    sectionIds.forEach(id => {
        const sec = document.getElementById(id);
        if (sec && window.scrollY >= sec.offsetTop - 140) {
            current = id;
        }
    });

    links.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });

    // Update section dots too
    document.querySelectorAll('.section-dot').forEach(dot => {
        dot.classList.toggle('active', dot.dataset.section === current);
    });
});

// ─── Parallax scroll effect for dividers ────────────
window.addEventListener('scroll', () => {
    document.querySelectorAll('.parallax-divider').forEach(div => {
        const speed = 0.3;
        const rect = div.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
            const yPos = -(rect.top * speed);
            div.style.backgroundPositionY = yPos + 'px';
        }
    });
});

// ─── Loading Screen ─────────────────────────────────
window.addEventListener('load', () => {
    const loader = document.getElementById('loading-screen');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
            setTimeout(() => loader.remove(), 600);
        }, 800);
    }
});

// ─── Scroll-to-Top Button ───────────────────────────
(function initScrollTop() {
    const btn = document.getElementById('scroll-top-btn');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 500);
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();

// ─── Reading Progress Bar ───────────────────────────
(function initProgressBar() {
    const bar = document.createElement('div');
    bar.id = 'progress-bar';
    document.body.prepend(bar);

    window.addEventListener('scroll', () => {
        const scrollContent = document.getElementById('scroll-content');
        if (!scrollContent || scrollContent.style.display === 'none') return;
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        bar.style.width = Math.min(progress, 100) + '%';
    });
})();

// ─── Section Navigation Dots ────────────────────────
(function initSectionDots() {
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'section-dots';
    dotsContainer.id = 'section-dots';

    const sections = [
        { id: 'gallery', label: 'Memories' },
        { id: 'reasons', label: 'Reasons' },
        { id: 'letter', label: 'Letter' },
        { id: 'future', label: 'Forever' },
        { id: 'proposal', label: 'Question' }
    ];

    sections.forEach(s => {
        const dot = document.createElement('div');
        dot.className = 'section-dot';
        dot.dataset.section = s.id;
        dot.title = s.label;
        dot.addEventListener('click', () => {
            const el = document.getElementById(s.id);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        });
        dotsContainer.appendChild(dot);
    });

    document.body.appendChild(dotsContainer);

    // Only show when scroll-content is visible
    const observer = new MutationObserver(() => {
        const sc = document.getElementById('scroll-content');
        dotsContainer.style.display = sc && sc.style.display !== 'none' ? 'flex' : 'none';
    });
    observer.observe(document.getElementById('scroll-content') || document.body, { attributes: true, attributeFilter: ['style'] });
    dotsContainer.style.display = 'none';
})();

// ─── Button Ripple Effect ───────────────────────────
document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-magic');
    if (!btn) return;

    const ripple = document.createElement('span');
    ripple.className = 'btn-ripple';
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
});

// ─── Smooth Nav Scroll ──────────────────────────────
document.addEventListener('click', (e) => {
    const link = e.target.closest('#sticky-nav a');
    if (!link) return;
    e.preventDefault();
    const targetId = link.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    if (target) {
        const navHeight = document.getElementById('sticky-nav')?.offsetHeight || 60;
        const y = target.getBoundingClientRect().top + window.scrollY - navHeight - 10;
        window.scrollTo({ top: y, behavior: 'smooth' });
    }
});

// ─── Toast Helper ───────────────────────────────────
function showToast(message, duration = 2500) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), duration);
}

// ─── Image Lazy Load with Animation ─────────────────
(function initImageLoad() {
    document.querySelectorAll('.memory-card img').forEach(img => {
        img.classList.add('loading');
        if (img.complete) {
            img.classList.remove('loading');
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', () => {
                img.classList.remove('loading');
                img.classList.add('loaded');
            });
            img.addEventListener('error', () => {
                img.classList.remove('loading');
                img.closest('.memory-card').style.display = 'none';
            });
        }
    });
})();