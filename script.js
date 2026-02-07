const title = document.querySelector('h1');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const responseText = document.getElementById('responseText');
const gif = document.querySelector('.gif');
const hoverSound = document.getElementById('hoverSound');
const yesSound = document.getElementById('yesSound');
const noSound = document.getElementById('noSound');

yesBtn.addEventListener('click', () => {
    responseText.textContent = 'Thanks to you, I smile a little more, laugh a little harder. I am beyond grateful that I have you in my life.I love you❤ 💖 💞';
    gif.src = '3.jpeg';
    yesBtn.style.display = 'none';
    noBtn.style.display = 'none';
    title.style.color = 'transparent';
    title.style.height = '0';
    title.style.margin = '0';
});

yesBtn.addEventListener('click', () => {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
});

noBtn.addEventListener('mouseover', () => {
    moveNoBtn();
});

// Keep the "No" button on-screen and support touch devices.
function moveNoBtn() {
    const padding = 8; // small padding from container edges
    const container = document.querySelector('.container');
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const maxX = Math.max(0, rect.width - noBtn.offsetWidth - padding);
    const maxY = Math.max(0, rect.height - noBtn.offsetHeight - padding);
    let x = Math.random() * maxX;
    let y = Math.random() * maxY;
    // clamp just in case
    x = Math.min(Math.max(x, padding), maxX);
    y = Math.min(Math.max(y, padding), maxY);
    noBtn.style.position = 'absolute';
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
    noBtn.style.zIndex = 9999;
}

// Touch support: move the button on touchstart so it doesn't go off-screen on mobile
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveNoBtn();
}, { passive: false });

noBtn.addEventListener('click', () => {
    responseText.textContent = 'No? Well, you\'re still my Valentine! 🤭';
    gif.src = 'https://i.pinimg.com/originals/3e/47/7e/3e477e83c35e2a7a38f19ccdad163faa.gif';
    yesBtn.style.display = 'none';
    noBtn.style.display = 'none';
    title.style.display = 'none';
});

// hearts animation

const canvas = document.getElementById('heartsCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

resizeCanvas();

document.addEventListener('mousemove', (e) => {
    const heart = new Heart();
    heart.x = e.clientX;
    heart.y = e.clientY;
    heart.size = 10;
    heart.speed = 1;
    hearts.push(heart);
});

document.addEventListener('touchmove', (e) => {
    const t = e.touches && e.touches[0];
    if (!t) return;
    const heart = new Heart();
    heart.x = t.clientX;
    heart.y = t.clientY;
    heart.size = 10;
    heart.speed = 1;
    hearts.push(heart);
}, { passive: true });

const hearts = [];

class Heart {
    constructor(isPermanent = false) {
        this.x = Math.random() * canvas.width;
        this.y = isPermanent ? Math.random() * canvas.height : -50;
        this.size = Math.random() * 20 + 10;
        this.speed = Math.random() * 2 + 1;
        this.color = Math.random() > 0.5 ? '#ff6f61' : '#ff3b2f';
        this.isPermanent = isPermanent;
    }

    draw() {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.bezierCurveTo(this.x - this.size / 2, this.y - this.size / 4, this.x - this.size, this.y + this.size / 2, this.x, this.y + this.size);
        ctx.bezierCurveTo(this.x + this.size, this.y + this.size / 2, this.x + this.size / 2, this.y - this.size / 4, this.x, this.y);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        this.y += this.speed;
        if (this.y > canvas.height) {
            if (this.isPermanent) {
                this.y = -50;
                this.x = Math.random() * canvas.width;
            } else {
                this.markedForDeletion = true;
            }
        }
        this.draw();
    }
}

function init() {
    for (let i = 0; i < 50; i++) {
        hearts.push(new Heart(true));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = hearts.length - 1; i >= 0; i--) {
        hearts[i].update();
        if (hearts[i].markedForDeletion) {
            hearts.splice(i, 1);
        }
    }
    requestAnimationFrame(animate);
}

init();
animate();

window.addEventListener('resize', () => {
    resizeCanvas();
    // if the noBtn ended up off-screen after resize, clamp it back
    if (noBtn.style.position === 'absolute') {
        const padding = 8;
        const container = document.querySelector('.container');
        if (container) {
            const rect = container.getBoundingClientRect();
            const maxX = Math.max(0, rect.width - noBtn.offsetWidth - padding);
            const maxY = Math.max(0, rect.height - noBtn.offsetHeight - padding);
            let curLeft = parseFloat(noBtn.style.left) || 0;
            let curTop = parseFloat(noBtn.style.top) || 0;
            curLeft = Math.min(Math.max(curLeft, padding), maxX);
            curTop = Math.min(Math.max(curTop, padding), maxY);
            noBtn.style.left = curLeft + 'px';
            noBtn.style.top = curTop + 'px';
        }
    }
});

// sounds

