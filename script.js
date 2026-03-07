// Register GSAP TextPlugin
gsap.registerPlugin(TextPlugin);

const wishesData = [
    { text: "Droga Oliwko,\nZ okazji Twojego święta\nżyczę Ci uśmiechu na każdy dzień,", img: "1.jpg" },
    { text: "siły w realizowaniu pasji,", img: "2.jpg" },
    { text: "odwagi do bycia sobą,", img: "3.jpg" },
    { text: "niekończącej się radości\ni pogody ducha,", img: "4.jpg" },
    { text: "aby każdy Twój dzień\nbył wyjątkowy", img: "5.jpg" },
    { text: "i pełen pięknych\nchwil.", img: "6.jpg" },
    { text: "mnóstwa miłości i ciepła\nod bliskich,", img: "7.jpg" },
    { text: "spełnienia nawet tych\nnajskrytszych marzeń,", img: "8.jpg" },
    { text: "wspaniałych i inspirujących\nludzi wokół Ciebie,", img: "9.jpg" },
    { text: "dużo zdrowia,\nbo ono jest najważniejsze,", img: "10.jpg" },
    { text: "samych sukcesów,\nktóre dodadzą Ci skrzydeł,", img: "11.jpg" },
    { text: "wewnętrznego spokoju\ni chwili tylko dla siebie,", img: "12.jpg" },
    { text: "niezapomnianych\ni szalonych podróży,", img: "13.jpg" },
    { text: "Pamiętaj zawsze,\nże jesteś niesamowita!", img: "14.jpg" },
    { text: "Kocham Cię!\n\nKubek", img: "15.jpg" }
];

// 1. Particle System (Canvas falling petals/leaves)
const canvas = document.getElementById('particles-bg');
const ctx = canvas.getContext('2d');
let particles = [];
const particleCount = 50;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = ~~(Math.random() * -canvas.height) - 50;
        this.size = Math.random() * 3 + 2;
        this.speedY = Math.random() * 1.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 1.5;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.05;

        const colors = ['#FFB6C1', '#FFC0CB', '#FFE4E1', '#FFF0F5'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.y * 0.01) * 0.5;
        this.rotation += this.rotationSpeed;

        if (this.y > canvas.height + 50 || this.x > canvas.width + 50 || this.x < -50) {
            this.reset();
            this.y = -50;
        }
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.fillStyle = this.color;

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(this.size, -this.size * 1.5, this.size * 2, -this.size, this.size, this.size);
        ctx.bezierCurveTo(-this.size, this.size * 2, -this.size * 1.5, this.size, 0, 0);
        ctx.fill();
        ctx.restore();
    }
}

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}
animateParticles();

// 2. Initial Loader & Dynamically create pages
const book = document.getElementById('greeting-book');

let html = `
    <div class="page" id="page-0">
        <div class="page-face page-front cover-front">
            <h2 class="front-title">8<br>Marca</h2>
            <div class="panda-front-wrapper">
                <img src="pandy_2.png" alt="Elegancka Panda" class="panda-front" id="panda-front">
            </div>
            <div class="unlock-container">
                <p class="front-subtitle">Przytrzymaj by otworzyć</p>
                <div class="unlock-btn" id="unlock-btn">
                    <svg class="heart-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" stroke="currentColor" stroke-width="1.5" />
                        <path class="heart-fill" d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" fill="#ffb6c1" />
                    </svg>
                </div>
            </div>
        </div>
        <div class="page-face page-back">
            <div class="back-design"></div>
        </div>
    </div>
`;

wishesData.forEach((data, index) => {
    html += `
    <div class="page" id="page-${index + 1}">
        <div class="page-face page-front inside-page">
            <div class="wishes-container">
                <p class="wishes-text">${data.text.replace(/\n/g, '<br>')}</p>
            </div>
            <div class="panda-inside-wrapper visible-panda">
                <img src="${data.img}" alt="Panda" class="panda-inside">
            </div>
            ${index < wishesData.length - 1 ? `
            <div class="next-page-hint">
                <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>` : ''}
        </div>
        <div class="page-face page-back">
            <div class="back-design"></div>
        </div>
    </div>
    `;
});

book.innerHTML = html;

const pagesElements = document.querySelectorAll('.page');
let currentPageIndex = 0;
let isCardOpen = false;

pagesElements.forEach((page, i) => {
    page.style.zIndex = pagesElements.length - i;
});

window.addEventListener('load', () => {
    const tl = gsap.timeline();

    tl.to(".loader-title", { opacity: 1, duration: 1.5, y: -10, ease: "power2.out" })
        .to(".loader-line", { width: "120px", duration: 1, ease: "power2.inOut" }, "-=0.8")
        .to(".loader-content", { opacity: 0, duration: 1, delay: 0.8 })
        .to("#loader", { display: "none", duration: 0 })
        .to("#main-content", { opacity: 1, duration: 1 })
        .from("#greeting-book", {
            y: 80,
            opacity: 0,
            rotationX: 15,
            rotationY: -5,
            duration: 1.8,
            ease: "back.out(1.2)",
            transformPerspective: 2000
        }, "-=0.5")
        .from(".front-title", { x: -40, opacity: 0, duration: 1, ease: "power3.out" }, "-=1.2")
        .from("#panda-front", { y: 40, scale: 0.9, opacity: 0, duration: 1.2, ease: "back.out(1.5)" }, "-=1.0")
        .from(".unlock-container", { opacity: 0, y: 10, duration: 1 }, "-=0.8");

    // Insert swipe hint on mobile
    if (window.innerWidth <= 768) {
        setTimeout(() => {
            const swipeHint = document.createElement('div');
            swipeHint.className = 'swipe-hint hidden';
            swipeHint.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <div class="hand-icon">👆</div>
                <svg viewBox="0 -1 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            `;
            document.body.appendChild(swipeHint);
        }, 2000);
    }
});

// Sound Effects
const flipSound = new Audio('https://www.soundjay.com/misc/sounds/page-flip-01a.mp3');
flipSound.volume = 0.5;

const magicUnlockSound = new Audio('https://www.soundjay.com/misc/sounds/magic-chime-01.mp3');
magicUnlockSound.volume = 0.6;

const bgMusic = new Audio('https://cdn.pixabay.com/download/audio/2022/02/07/audio_4f6764dca3.mp3');
bgMusic.loop = true;
bgMusic.volume = 0.3;

function playFlipSound() {
    // Clone and play so rapid flipping won't cut the sound
    const s = flipSound.cloneNode();
    s.volume = 0.4;
    s.play().catch(e => { /* Ignore auto-play strict errors on first interaction */ });
}

// Sparkle Trail
function createSparkle(x, y) {
    if (Math.random() > 0.4) return; // limit density
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    const emojis = ['✨', '💖', '⭐', '🌸'];
    sparkle.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    document.body.appendChild(sparkle);

    gsap.to(sparkle, {
        y: "-=80",
        x: (Math.random() - 0.5) * 60,
        opacity: 0,
        rotation: (Math.random() - 0.5) * 180,
        scale: Math.random() + 0.5,
        duration: 1 + Math.random(),
        onComplete: () => sparkle.remove()
    });
}

document.addEventListener('mousemove', (e) => createSparkle(e.clientX, e.clientY));
document.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) createSparkle(e.touches[0].clientX, e.touches[0].clientY);
}, { passive: true });

// Unlock Logic
let holdTimeout;
let isUnlocked = false;

setTimeout(() => {
    const unlockBtn = document.getElementById('unlock-btn');
    const heartFill = document.querySelector('.heart-fill');

    if (unlockBtn && heartFill) {
        gsap.set(heartFill, { clipPath: "inset(100% 0 0 0)" });

        function startUnlock(e) {
            if (isCardOpen || isUnlocked) return;
            // Only prevent default on touch to avoid stopping mouse clicks
            if (e.type === 'touchstart') e.preventDefault();

            gsap.to(heartFill, { clipPath: "inset(0% 0 0 0)", duration: 1.2, ease: "none" });
            gsap.to(unlockBtn, { scale: 1.15, duration: 1.2, ease: "sine.out" });

            holdTimeout = setTimeout(() => {
                completeUnlock();
            }, 1200);
        }

        function stopUnlock() {
            if (isUnlocked || isCardOpen) return;
            clearTimeout(holdTimeout);

            gsap.to(heartFill, { clipPath: "inset(100% 0 0 0)", duration: 0.4, ease: "power2.out" });
            gsap.to(unlockBtn, { scale: 1, duration: 0.4 });
        }

        function completeUnlock() {
            isUnlocked = true;
            if (navigator.vibrate) navigator.vibrate([80, 50, 80]); // haptic
            magicUnlockSound.play().catch(e => { });
            bgMusic.play().catch(e => { });
            goForward();
        }

        unlockBtn.addEventListener('mousedown', startUnlock);
        unlockBtn.addEventListener('touchstart', startUnlock, { passive: false });
        window.addEventListener('mouseup', stopUnlock);
        window.addEventListener('touchend', stopUnlock);

        // Encourage holding
        unlockBtn.addEventListener('click', () => {
            if (!isUnlocked) {
                const hint = document.querySelector('.front-subtitle');
                if (hint) gsap.fromTo(hint, { x: -5 }, { x: 5, duration: 0.1, yoyo: true, repeat: 3 });
            }
        });
    }
}, 100);

// 3. Flip Mechanics
function hideHint() {
    gsap.to('.unlock-container', { opacity: 0, duration: 0.3 });
}

function showSwipeHint() {
    const swipeHint = document.querySelector('.swipe-hint');
    if (swipeHint && window.innerWidth <= 768 && isCardOpen && currentPageIndex === 1) {
        swipeHint.classList.remove('hidden');
        gsap.fromTo(swipeHint, { opacity: 0, y: 20 }, { opacity: 0.7, y: 0, duration: 0.8 });

        // Auto hide after a few seconds
        setTimeout(() => {
            gsap.to(swipeHint, { opacity: 0, duration: 0.8, onComplete: () => swipeHint.style.display = 'none' });
        }, 4000);
    }
}

function goForward() {
    if (currentPageIndex >= pagesElements.length - 1) return;
    if (!isUnlocked && currentPageIndex === 0) return; // Prevent skipping unlock

    if (!isCardOpen) {
        isCardOpen = true;
        showSwipeHint();
    }

    playFlipSound();

    const page = pagesElements[currentPageIndex];
    page.classList.add('flipped');

    // Switch z-index halfway through the flip
    setTimeout(() => {
        page.style.zIndex = currentPageIndex;
    }, 750); // half of 1.5s CSS transition

    // Slide the book right to keep the spine centered
    if (currentPageIndex === 0 && window.innerWidth > 768) {
        gsap.to('.book', { x: "50%", duration: 1.5, ease: "power3.inOut" });
    }

    currentPageIndex++;
    hideHint();

    // Add satisfying pop scale to text when revealed
    if (currentPageIndex > 0) {
        const nextText = pagesElements[currentPageIndex]?.querySelector('.wishes-text');
        if (nextText) {
            gsap.fromTo(nextText,
                { scale: 0.9, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.6, delay: 0.8, ease: "back.out(1.5)" }
            );
        }

        const nextImage = pagesElements[currentPageIndex]?.querySelector('.visible-panda img');
        if (nextImage) {
            gsap.fromTo(nextImage,
                { scale: 0.8, y: 20, opacity: 0 },
                { scale: 1, y: 0, opacity: 1, duration: 0.8, delay: 0.9, ease: "back.out(1.2)" }
            );
        }
    }

    // Confetti on the last page
    if (currentPageIndex === pagesElements.length - 1) {
        setTimeout(() => {
            const duration = 3 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

            function randomInRange(min, max) {
                return Math.random() * (max - min) + min;
            }

            const interval = setInterval(function () {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 50 * (timeLeft / duration);

                // since particles fall down, start a bit higher than random
                confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
                confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
            }, 250);
        }, 1000); // Wait for the page to flip
    }
}

function goBack() {
    if (currentPageIndex > 0) {
        playFlipSound();
        currentPageIndex--;
        const page = pagesElements[currentPageIndex];
        page.classList.remove('flipped');

        setTimeout(() => {
            page.style.zIndex = pagesElements.length - currentPageIndex;
        }, 750);

        if (currentPageIndex === 0 && window.innerWidth > 768) {
            gsap.to('.book', { x: "0%", duration: 1.5, ease: "power3.inOut" });
            isCardOpen = false;
        }
    }
}

// Click events
document.querySelector('.scene').addEventListener('click', (e) => {
    // Block clicks from triggering early skips
    if (!isUnlocked && currentPageIndex === 0) return;
    if (e.target.closest('.unlock-btn')) return;

    if (window.innerWidth <= 768) {
        // Left 30% of screen = Back, Right 70% = Forward
        if (e.clientX < window.innerWidth * 0.3) {
            goBack();
        } else {
            goForward();
        }
    } else {
        const pageNode = e.target.closest('.page');
        if (pageNode) {
            if (pageNode.classList.contains('flipped')) {
                goBack();
            } else {
                goForward();
            }
        }
    }
});

// Swipe Events for Mobile
let touchStartX = 0;
let touchEndX = 0;
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;

    // Check if swipe is somewhat horizontal, prevent scrolling from registering as swipes
    if (Math.abs(touchStartY - touchEndY) < 100) {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            goForward();
        }
        if (touchEndX > touchStartX + swipeThreshold) {
            goBack();
        }
    }
});

// 4. Smooth Mouse & Gyroscope Parallax
let targetX = 0;
let targetY = 0;
let currentX = 0;
let currentY = 0;

// Mouse for Desktop
document.addEventListener('mousemove', (e) => {
    // Only apply mouse parallax if not on mobile portrait
    if (window.innerWidth > 768) {
        targetX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
        targetY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
    }
});

// Gyroscope for Mobile
window.addEventListener('deviceorientation', (e) => {
    if (!e.gamma || !e.beta) return;

    // gamma is the left-to-right tilt in degrees, where right is positive
    // beta is the front-to-back tilt in degrees, where front is positive
    let gamma = e.gamma;
    let beta = e.beta;

    // Constrain the tilt slightly
    if (gamma > 30) gamma = 30;
    if (gamma < -30) gamma = -30;
    if (beta > 60) beta = 60;
    if (beta < 10) beta = 10;

    targetX = gamma / 30; // normalized roughly -1 to 1
    targetY = (beta - 35) / 25; // normalized roughly -1 to 1 based on comfortable holding angle
});

function renderParallax() {
    currentX += (targetX - currentX) * 0.05;
    currentY += (targetY - currentY) * 0.05;

    gsap.set(".scene", {
        rotationY: currentX * 10,
        rotationX: -currentY * 5,
        transformPerspective: 2000,
        transformOrigin: "center center"
    });

    if (!isCardOpen) {
        gsap.set("#panda-front", {
            x: currentX * 20,
            y: currentY * 15,
            rotation: currentX * 5 + 3
        });
    } else {
        // Apply slight parallax to inside pandas
        gsap.set(".panda-inside", {
            x: currentX * 10,
            y: currentY * 10
        });
    }

    requestAnimationFrame(renderParallax);
}
renderParallax();

