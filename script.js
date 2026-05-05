let current = 'login';
function switchTab(tab) {
    if (tab === current) return;
    const prev = current;
    current = tab;

    const loginPanel = document.getElementById('panel-login');
    const registerPanel = document.getElementById('panel-register');
    const tabLine = document.getElementById('tabLine');
    const tabs = document.querySelectorAll('.tab-btn');

    tabs.forEach((t, i) => t.classList.toggle('active', (i === 0 && tab === 'login') || (i === 1 && tab === 'register')));
    tabLine.classList.toggle('right', tab === 'register');

    if (tab === 'register') {
        loginPanel.className = 'form-panel left';
        registerPanel.className = 'form-panel active';
    } else {
        registerPanel.className = 'form-panel right';
        loginPanel.className = 'form-panel active';
    }
}


function rippleClick(e) {
    const btn = e.currentTarget;
    const circle = document.createElement('span');
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    circle.classList.add('ripple');
    circle.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px`;
    btn.appendChild(circle);
    setTimeout(() => circle.remove(), 700);
}

/* ─── RAIN ─── */
const canvas = document.getElementById('rain');
const ctx = canvas.getContext('2d');
let drops = [];

function resizeRain() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initDrops();
}

function initDrops() {
    drops = [];
    const count = Math.floor(canvas.width / 3.5);
    for (let i = 0; i < count; i++) {
        drops.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            len: Math.random() * 32 + 18,
            speed: Math.random() * 7 + 5,
            opacity: Math.random() * 0.35 + 0.25,
            width: Math.random() * 1.0 + 0.6,
        });
    }
}

function drawRain() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drops.forEach(d => {
        const grad = ctx.createLinearGradient(d.x, d.y, d.x + d.len * 0.18, d.y + d.len);
        grad.addColorStop(0, `rgba(192,24,42,0)`);
        grad.addColorStop(0.5, `rgba(220,30,50,${d.opacity})`);
        grad.addColorStop(1, `rgba(180,180,255,${d.opacity * 0.6})`);

        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x + d.len * 0.18, d.y + d.len);
        ctx.strokeStyle = grad;
        ctx.lineWidth = d.width;
        ctx.stroke();

        d.y += d.speed;
        d.x += d.speed * 0.08;
        if (d.y > canvas.height) {
            d.y = -d.len;
            d.x = Math.random() * canvas.width;
        }
    });
    requestAnimationFrame(drawRain);
}

window.addEventListener('resize', resizeRain);
resizeRain();
drawRain();


function spawnEmber() {
    const el = document.createElement('div');
    el.className = 'ember';
    const x = Math.random() * 100;
    const dx = (Math.random() - 0.5) * 80;
    const dur = Math.random() * 6 + 5;
    el.style.cssText = `left:${x}vw; --dx:${dx}px; animation-duration:${dur}s; animation-delay:${Math.random() * 4}s; width:${Math.random() * 3 + 1}px; height:${Math.random() * 3 + 1}px; background:${Math.random() > 0.5 ? '#e8a520' : '#c0182a'};`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), (dur + 4) * 1000);
}
setInterval(spawnEmber, 280);
for (let i = 0; i < 12; i++) setTimeout(spawnEmber, i * 200);