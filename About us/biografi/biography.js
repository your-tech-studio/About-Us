/* ============================================================
   biography.js — PPLG Biography Page
   ============================================================ */

const PERSONS = [
    { name: 'Imhotep',               sub: '-PPLG-',          img: 'imhotep.jpg'     },
    { name: 'Dr. Dina El-Bassiouny', sub: '-Accounting-',    img: 'dina.png'        },
    { name: 'Mostafa Seif',          sub: '-Culinary-',      img: 'culinary.png'    },
    { name: 'Maatkare Hatshepsut.',  sub: '-DKV-',           img: 'dkv.png'         },
    { name: 'Hamed El Chiaty',       sub: '-Hospitality-',   img: 'hospitality.jpg' },
];

const BG_IMGS = [
    'image.png',
    'image2.png',
    'image3.png',
    'iamge4.png',
    'iamge4.png',
];

const BALL_ICONS = [
    { vb: '0 0 27 22', d: `<path d="M1.227 22a1.2 1.2 0 01-.874-.352A1.2 1.2 0 010 20.778c0-.346.117-.636.353-.87.236-.235.527-.352.874-.352h24.546c.347 0 .638.117.875.352.236.234.353.524.352.87 0 .347-.118.637-.353.871-.235.235-.527.353-.874.354H1.227zM3.682 18.333c-.675 0-1.253-.24-1.733-.717C1.469 17.138 1.228 16.562 1.227 15.889V2.444C1.227 1.772 1.468 1.197 1.949.719 2.43.24 3.008.001 3.682 0h19.636c.675 0 1.253.24 1.734.719.48.479.721 1.054.72 1.725V15.89c0 .672-.24 1.248-.72 1.727-.481.479-1.059.718-1.734.717H3.682z" fill="white"/>` },
    { vb: '0 0 26 25', d: `<path d="M2.6 25c-.715 0-1.327-.257-1.836-.772C.256 23.713 0 23.093 0 22.368V7.895c0-.724.255-1.343.764-1.858C1.274 5.522 1.886 5.264 2.6 5.263H7.8V2.632c0-.724.255-1.343.764-1.858C9.074.259 9.686.001 10.4 0H15.6c.715 0 1.327.258 1.837.774.51.515.764 1.135.763 1.858V5.263H23.4c.715 0 1.327.258 1.837.774.51.516.764 1.135.763 1.858V22.368c0 .724-.254 1.344-.763 1.86C24.728 24.743 24.116 25.001 23.4 25H2.6zM10.4 5.263H15.6V2.632H10.4v2.631z" fill="white"/>` },
    { vb: '0 0 26 28', d: `<path d="M10.446.108c.132.066.249.16.34.276.092.116.157.25.19.394C11.012.936 12 5.164 12 8c0 1.9-.884 3.594-2.26 4.692-.5.4-.74.836-.74 1.2v.972c.076.496.322 2.338.552 4.248C9.778 21.118 10 23.162 10 24c0 1.061-.421 2.078-1.172 2.828C8.078 27.579 7.061 28 6 28c-1.061 0-2.078-.421-2.828-1.172C2.421 26.078 2 25.061 2 24c0-.84.222-2.88.448-4.756.23-1.91.476-3.752.544-4.248L3 13.892c0-.364-.24-.8-.74-1.2C.986 11.416 0 8.902 0 8 0 5.174.98.968 1.024.78A1.01 1.01 0 012.01 0C2.57 0 3.024.454 3.024 1.014V7.01a1.01 1.01 0 001.952.384A1.01 1.01 0 005 7V1c0-.551.449-1 1-1 .551 0 1 .449 1 1v6.052a1.01 1.01 0 001.969-.042V1.01C8.98.452 9.432 0 9.992 0c.044 0 .24 0 .454.108zM15 9c0-2.387.948-4.676 2.636-6.364C19.324.948 21.613 0 24 0c.552 0 1 .448 1 1v11.946l.038.354c.159 1.493.312 2.986.458 4.48C25.742 20.292 26 23.108 26 24c0 1.061-.421 2.078-1.172 2.828C24.078 27.579 23.061 28 22 28c-1.061 0-2.078-.421-2.828-1.172C18.421 26.078 18 25.061 18 24c0-.892.258-3.708.504-6.22.126-1.274.252-2.494.346-3.398L18.89 14H17c-.53 0-1.039-.211-1.414-.586A2 2 0 0115 12V9z" fill="white"/>` },
    { vb: '0 0 27 27', d: `<path d="M13.5 0C6.045 0 0 6.045 0 13.5C0 20.955 6.045 27 13.5 27C14.7825 27 15.795 25.9875 15.795 24.705C15.795 24.0975 15.5475 23.5575 15.165 23.1525C14.7825 22.7475 14.5575 22.2075 14.5575 21.6C14.5575 20.3175 15.57 19.305 16.8525 19.305H19.98C23.85 19.305 27 16.155 27 12.285C27 5.5125 20.9475 0 13.5 0ZM5.535 13.5C4.2525 13.5 3.24 12.4875 3.24 11.205C3.24 9.9225 4.2525 8.91 5.535 8.91C6.8175 8.91 7.83 9.9225 7.83 11.205C7.83 12.4875 6.8175 13.5 5.535 13.5ZM9.585 7.83C8.3025 7.83 7.29 6.8175 7.29 5.535C7.29 4.2525 8.3025 3.24 9.585 3.24C10.8675 3.24 11.88 4.2525 11.88 5.535C11.88 6.8175 10.8675 7.83 9.585 7.83ZM17.415 7.83C16.1325 7.83 15.12 6.8175 15.12 5.535C15.12 4.2525 16.1325 3.24 17.415 3.24C18.6975 3.24 19.71 4.2525 19.71 5.535C19.71 6.8175 18.6975 7.83 17.415 7.83ZM21.465 13.5C20.1825 13.5 19.17 12.4875 19.17 11.205C19.17 9.9225 20.1825 8.91 21.465 8.91C22.7475 8.91 23.76 9.9225 23.76 11.205C23.76 12.4875 22.7475 13.5 21.465 13.5Z" fill="white"/>` },
    { vb: '0 0 26 31', d: `<path d="M22.75 3.09998H17.16C16.51 1.29998 14.91-0.000015 13-0.000015C11.09-0.000015 9.49 1.29998 8.84 3.09998H3.25C1.755 3.09998 0.585 4.26998 0.585 5.74998V27.95C0.585 29.43 1.755 30.6 3.25 30.6H22.75C24.245 30.6 25.415 29.43 25.415 27.95V5.74998C25.415 4.26998 24.245 3.09998 22.75 3.09998ZM13 2.74998C13.715 2.74998 14.3 3.32498 14.3 4.02498C14.3 4.72498 13.715 5.29998 13 5.29998C12.285 5.29998 11.7 4.72498 11.7 4.02498C11.7 3.32498 12.285 2.74998 13 2.74998ZM15.6 23.3H6.5V20.65H15.6V23.3ZM19.5 18H6.5V15.35H19.5V18ZM19.5 12.7H6.5V10.05H19.5V12.7Z" fill="white"/>` },
];

/* ── DOM refs ─────────────────────────────────────────────────── */
let current   = 0;
const tabs     = document.querySelectorAll('.tab');
const ball     = document.getElementById('ball');
const ballWrap = document.getElementById('ballWrap');
const ballSvg  = document.getElementById('ballSvg');
const tabbar   = document.getElementById('tabbar');

/* ── Ganti background hero img ──────────────────────────────── */
function updateBgImg(idx) {
    const el = document.getElementById('heroBgImg');
    if (el) el.src = BG_IMGS[idx];
}

/* ── Ganti background warna bio section ─────────────────────── */
function updateBioSection(idx) {
    document.querySelector('.bio-section').className = `bio-section bg-${idx}`;
}

/* ── Move ball ───────────────────────────────────────────────── */
function moveBall(idx, animate) {
    const btn    = tabs[idx];
    const bR     = btn.getBoundingClientRect();
    const tR     = tabbar.getBoundingClientRect();
    const ballW  = 70;
    const wrapW  = 117;
    const center = bR.left - tR.left + bR.width / 2;

    if (!animate) {
        ball.style.transition     = 'none';
        ballWrap.style.transition = 'none';
    }

    ball.style.left     = (center - ballW / 2) + 'px';
    ballWrap.style.left = (center - wrapW / 2) + 'px';

    if (!animate) {
        requestAnimationFrame(() => {
            ball.style.transition     = '';
            ballWrap.style.transition = '';
        });
    }

    const ic = BALL_ICONS[idx];
    ballSvg.setAttribute('viewBox', ic.vb);
    ballSvg.innerHTML = ic.d;
}

/* ── Switch tab ─────────────────────────────────────────────── */
function switchTab(idx) {
    if (idx === current) return;
    const prev = current;
    current    = idx;

    tabs.forEach((t, i) => t.classList.toggle('active', i === idx));
    moveBall(idx, true);
    updateBgImg(idx);
    updateBioSection(idx);

    const nameEl = document.getElementById('personName');
    const subEl  = document.getElementById('personSub');
    const imgEl  = document.getElementById('personImg');

    nameEl.classList.add('fading');
    subEl.classList.add('fading');

    setTimeout(() => {
        const p = PERSONS[idx];
        nameEl.textContent = p.name;
        subEl.textContent  = p.sub;
        imgEl.src          = p.img;
        nameEl.classList.remove('fading');
        subEl.classList.remove('fading');
    }, 260);

    const prevPanel = document.getElementById(`panel-${prev}`);
    const nextPanel = document.getElementById(`panel-${idx}`);
    const fromLeft  = idx < prev;

    prevPanel.classList.remove('active');
    nextPanel.classList.remove('from-left');
    if (fromLeft) nextPanel.classList.add('from-left');
    nextPanel.classList.add('active');
}

/* ── Attach clicks ──────────────────────────────────────────── */
tabs.forEach(btn => {
    btn.addEventListener('click', () => switchTab(+btn.dataset.idx));
});

/* ── Init ───────────────────────────────────────────────────── */
window.addEventListener('load', () => {
    moveBall(0, false);
    updateBgImg(0);
    updateBioSection(0);
});
window.addEventListener('resize', () => moveBall(current, false)); 