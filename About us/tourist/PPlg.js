
document.addEventListener('DOMContentLoaded', function () {

    const track = document.getElementById('iconicTrack');
    const itemWidth = 428 + 24; // width slide + gap
    const maxIndex = 2;         // 5 foto - 3 tampil = 2 langkah max

    let currentIndex = 0;
    let startX = 0;
    let isDragging = false;

    // ── MOUSE (desktop) ──
    track.addEventListener('mousedown', function (e) {
        isDragging = true;
        startX = e.clientX;
        track.style.transition = 'none';
        track.style.cursor = 'grabbing';
    });

    document.addEventListener('mouseup', function (e) {
        if (!isDragging) return;
        isDragging = false;
        track.style.cursor = 'grab';

        const diff = startX - e.clientX;

        if (diff > 50) currentIndex++;   // geser kiri → maju
        if (diff < -50) currentIndex--;   // geser kanan → mundur

        // Batasi index
        if (currentIndex < 0) currentIndex = 0;
        if (currentIndex > maxIndex) currentIndex = maxIndex;

        track.style.transition = 'transform 0.4s ease';
        track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    });

    // ── TOUCH (mobile/tablet) ──
    track.addEventListener('touchstart', function (e) {
        startX = e.touches[0].clientX;
        track.style.transition = 'none';
    });

    track.addEventListener('touchend', function (e) {
        const diff = startX - e.changedTouches[0].clientX;

        if (diff > 50) currentIndex++;
        if (diff < -50) currentIndex--;

        if (currentIndex < 0) currentIndex = 0;
        if (currentIndex > maxIndex) currentIndex = maxIndex;

        track.style.transition = 'transform 0.4s ease';
        track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    });

});

// ===== DATA SCHEDULE =====
const scheduleData = [
    {
        day: "Day 1",
        subtitle: "Arrival in Cairo",
        img: "air.png",
        boxHeight: "343px",
        boxBottom: "215px",
        titleColor: "#000000",
        desc: "Your journey begins with a flight from Soekarno–Hatta International Airport (CGK) to Cairo International Airport (CAI). Upon arrival, you will be warmly welcomed by a professional tour guide and transferred to a five-star hotel in Cairo. After completing the check-in process, guests can relax and enjoy the hotel's facilities while recovering from the long journey. The day concludes with a pleasant dinner at the hotel."
    },
    {
        day: "Day 2",
        subtitle: "Al-Azhar Mosque Cultural Visit",
        img: "mesjid.jpeg",
        boxHeight: "343px",
        boxBottom: "215px",
        titleColor: "#FFF",
        desc: "After breakfast, the tour continues with a visit to the historic Al-Azhar Mosque, one of the oldest mosques in the world, founded in 970 AD by the Fatimid Dynasty. Known as an important center of Islamic learning, the mosque is admired for its remarkable architecture and long intellectual tradition. During the visit, guests will explore the mosque's history and have the opportunity to perform prayers before returning to the hotel."
    },
    {
        day: "Day 3",
        subtitle: "The Egyptian Museum Exploration",
        img: "patung.jpeg",
        boxHeight: "250px",
        boxBottom: "300px",
        titleColor: "#FFF",
        desc: "The third day is dedicated to discovering the rich heritage of ancient Egypt at the world-renowned Egyptian Museum in Cairo. The museum houses more than 120,000 historical artifacts, including statues of pharaohs, ancient relics, mummies, and the famous golden treasures of Tutankhamun."
    },
    {
        day: "Day 4",
        subtitle: "Giza Pyramids & Nile Experience",
        img: "unta.jpeg",
        boxHeight: "400px",
        boxBottom: "215px",
        titleColor: "#FFF",
        desc: "On the fourth day, guests will explore some of Egypt's most iconic landmarks in the Giza region. The tour includes visits to the magnificent Giza Pyramids and the remarkable Sphinx of Memphis located in Mit Rahina. Carved from alabaster and weighing around 90 tons, the Memphis Sphinx is believed to represent Pharaoh Amenhotep II and stands as one of the largest statues of its kind. Travelers will also enjoy the scenic beauty of the Nile River while learning about its crucial role in shaping Egyptian civilization."
    },
    {
        day: "Day 5",
        subtitle: "Departure and Return Journey",
        img: "gedung.jpeg",
        boxHeight: "200px",
        boxBottom: "400px",
        titleColor: "#FFF",
        desc: "After breakfast, guests will check out from the hotel and be transferred to Cairo International Airport for the return flight to Jakarta."
    }
];

let currentDay = 0;
let autoTimer = null;

// ===== FUNGSI GANTI SLIDE =====
function goToDay(index) {
    const img = document.getElementById('scheduleBgImg');
    const dayEl = document.getElementById('scheduleDay');
    const subEl = document.getElementById('scheduleSubtitle');
    const descEl = document.getElementById('scheduleDesc');
    const titleBox = document.querySelector('.schedule-day-title');
    const descBox = document.querySelector('.schedule-desc-box');
    const dots = document.querySelectorAll('.schedule-dot');

    // Fade OUT
    img.classList.add('fade');
    titleBox.classList.add('fade');
    descBox.classList.add('fade');

    setTimeout(() => {
        // Update konten
        currentDay = index;
        const data = scheduleData[index];
        img.src = data.img;
        dayEl.textContent = data.day;
        subEl.textContent = data.subtitle;
        descEl.textContent = data.desc;
        descBox.style.height = data.boxHeight;
        descBox.style.bottom = data.boxBottom;
        titleBox.style.color = data.titleColor;

        // Update dot aktif
        dots.forEach((d, i) => {
            d.classList.toggle('active', i === index);
        });

        // Fade IN
        img.classList.remove('fade');
        titleBox.classList.remove('fade');
        descBox.classList.remove('fade');
    }, 500);

    // Reset timer otomatis
    resetAutoTimer();
}

// ===== AUTO PLAY =====
function resetAutoTimer() {
    if (autoTimer) clearInterval(autoTimer);
    autoTimer = setInterval(() => {
        const next = (currentDay + 1) % scheduleData.length;
        goToDay(next);
    }, 4000); // ← ganti angka ms (4000 = 4 detik)
}

// ===== ICONIC SLIDER DRAG =====
document.addEventListener('DOMContentLoaded', function () {

    // Mulai auto play schedule
    resetAutoTimer();

    // ── Drag slider iconic ──
    const track = document.getElementById('iconicTrack');
    if (!track) return;

    const itemWidth = 428 + 24;
    const maxIndex = 2;
    let iconicIndex = 0;
    let startX = 0;
    let isDragging = false;

    track.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        track.style.transition = 'none';
        track.style.cursor = 'grabbing';
    });

    document.addEventListener('mouseup', (e) => {
        if (!isDragging) return;
        isDragging = false;
        track.style.cursor = 'grab';

        const diff = startX - e.clientX;
        if (diff > 50) iconicIndex++;
        if (diff < -50) iconicIndex--;
        iconicIndex = Math.max(0, Math.min(maxIndex, iconicIndex));

        track.style.transition = 'transform 0.4s ease';
        track.style.transform = `translateX(-${iconicIndex * itemWidth}px)`;
    });

    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        track.style.transition = 'none';
    });

    track.addEventListener('touchend', (e) => {
        const diff = startX - e.changedTouches[0].clientX;
        if (diff > 50) iconicIndex++;
        if (diff < -50) iconicIndex--;
        iconicIndex = Math.max(0, Math.min(maxIndex, iconicIndex));

        track.style.transition = 'transform 0.4s ease';
        track.style.transform = `translateX(-${iconicIndex * itemWidth}px)`;
    });
});

// =====================================================
//  dest-panel.js — Slide-out panel on card hover
// =====================================================

const destData = [
    {
        color: 'color-1',
        num: '01',
        title: 'GIZA\nPYRAMIDS',
        desc: 'Visiting the Pyramids of Giza offers a remarkable glimpse into ancient Egyptian history. Visitors can explore the iconic pyramids, admire the Great Sphinx, and enjoy breathtaking desert views.\n\nIt is a truly unforgettable experience that combines culture, history, and stunning scenery in one destination, making it a must-visit site for travelers from around the world.'
    },
    {
        color: 'color-2',
        num: '02',
        title: 'EGYPTIAN\nMUSEUM',
        desc: 'Visiting the Egyptian Museum offers a fascinating journey into ancient Egyptian civilization. Visitors can admire royal mummies, monumental statues, and the legendary treasures of Tutankhamun.\n\nIt is an inspiring experience that brings history to life, allowing travelers to connect directly with the legacy of one of the world\'s greatest civilizations.'
    },
    {
        color: 'color-3',
        num: '03',
        title: 'AL-AZHAR\nMOSQUE',
        desc: 'Visiting Al-Azhar Mosque offers a meaningful journey into Egypt\'s rich Islamic heritage and architectural beauty. Visitors can admire its elegant minarets, intricate carvings, and peaceful courtyard.\n\nIt is a serene and inspiring experience that connects travelers with centuries of faith and cultural tradition in the heart of Cairo.'
    }
];

window.addEventListener('load', function () {
    const cards = document.querySelectorAll('.dest-card');
    const row   = document.querySelector('.dest-cards-row');

    // Buat panel untuk tiap kartu
    cards.forEach((card, i) => {
        const data = destData[i];

        // Buat elemen panel
        const panel = document.createElement('div');
        panel.className = `dest-panel ${data.color}`;
        panel.innerHTML = `
            <p class="dest-panel-num">${data.num}</p>
            <div class="dest-panel-line"></div>
            <h3 class="dest-panel-title">${data.title.replace('\n', '<br>')}</h3>
            <p class="dest-panel-desc">${data.desc.replace(/\n\n/g, '<br><br>')}</p>
        `;

        // Taruh panel di dalam row (bukan di dalam card)
        row.appendChild(panel);

        // ── Mouse enter: tampilkan panel di sebelah kanan kartu ──
        card.addEventListener('mouseenter', () => {
            const cardRect = card.getBoundingClientRect();
            const rowRect  = row.getBoundingClientRect();

            // Posisi panel: kanan kartu + 12px gap
            const panelLeft = cardRect.right - rowRect.left + 12;
            const panelTop  = cardRect.top - rowRect.top + (cardRect.height / 2);

            panel.style.left = panelLeft + 'px';
            panel.style.top  = panelTop + 'px';
            panel.style.transform = 'translateY(-50%) translateX(-10px)';

            // Force reflow lalu animasi masuk
            panel.offsetHeight;
            panel.style.transition = 'opacity 0.35s ease, transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            panel.style.transform = 'translateY(-50%) translateX(0px)';
            panel.classList.add('visible');
        });

        // ── Mouse leave: sembunyikan panel ───────────────────────
        card.addEventListener('mouseleave', (e) => {
            // Cek apakah mouse pindah ke panel itu sendiri
            if (e.relatedTarget === panel || panel.contains(e.relatedTarget)) return;
            hidePanel(panel);
        });

        panel.addEventListener('mouseleave', (e) => {
            if (e.relatedTarget === card || card.contains(e.relatedTarget)) return;
            hidePanel(panel);
        });
    });

    function hidePanel(panel) {
        panel.style.transform = 'translateY(-50%) translateX(-10px)';
        panel.style.opacity   = '0';
        setTimeout(() => panel.classList.remove('visible'), 350);
    }
});