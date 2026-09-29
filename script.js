/* ==========================================================================
   NĐGC TEAM - INTERACTIVE 3D & AUDIO LOGIC
   ========================================================================== */

// --- 1. DỮ LIỆU THÀNH VIÊN (MEMBERS DATA) ---
const membersData = [
    {
        id: "noxious",
        name: "NOXIOUS",
        role: "Main Artist / Producer",
        avatar: "assets/images/noxious.jpg",
        bio: "Leader và cũng là producer đứng sau cấu trúc âm thanh độc đáo của NĐGC. Chuyên trị New Wave và Dark Synth.",
        socials: { facebook: "#", instagram: "#", soundcloud: "#" }
    },
    {
        id: "hexxo",
        name: "HEXXO",
        role: "Vocalist / Lyricist",
        avatar: "assets/images/hexxo.jpg",
        bio: "Sở hữu chất giọng đặc trưng và khả năng sáng tác melody cuốn hút, mang đậm màu sắc Hyperpop.",
        socials: { facebook: "#", instagram: "#", soundcloud: "#" }
    },
    {
        id: "thokawi",
        name: "THOKAWI",
        role: "Rapper / Beatmaker",
        avatar: "assets/images/thokawi.jpg",
        bio: "Những flow nhanh và sắc bén cùng tư duy làm beat Underground hiện đại.",
        socials: { facebook: "#", instagram: "#", soundcloud: "#" }
    },
    {
        id: "lilziddy",
        name: "LILZIDDY",
        role: "Artist / Audio Engineer",
        avatar: "assets/images/lilziddy.jpg",
        bio: "Phụ trách Mixing & Mastering giúp âm nhạc NĐGC luôn đạt chất lượng âm thanh cao nhất.",
        socials: { facebook: "#", instagram: "#", soundcloud: "#" }
    },
    {
        id: "zura",
        name: "ZURA",
        role: "Visual Artist / Designer",
        avatar: "assets/images/zura.jpg",
        bio: "Người tạo nên toàn bộ nhận diện hình ảnh 3D, Cyberpunk visuals cho các sản phẩm của nhóm.",
        socials: { facebook: "#", instagram: "#", soundcloud: "#" }
    }
];

// --- 2. DỮ LIỆU BÀI HÁT (PLAYLIST DATA) ---
const playlistData = [
    {
        title: "Withered Flower",
        artist: "Zura",
        src: "assets/audio/song1.mp3",
        cover: "assets/images/song1.jpg"
    },
    {
        title: "DIVOIEM",
        artist: "Zura",
        src: "assets/audio/song2.mp3",
        cover: "assets/images/song2.jpg"
    },
    {
        title: "210408",
        artist: "Zura",
        src: "assets/audio/song3.mp3",
        cover: "assets/images/song3.jpg"
    }
];

// --- 3. THREE.JS 3D BACKGROUND (Sphere Visualizer) ---
let scene, camera, renderer, sphere;
function init3DBackground() {
    const canvas = document.getElementById('bg-3d-canvas');
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Create Wireframe Sphere (3D Visual)
    const geometry = new THREE.IcosahedronGeometry(2.2, 3);
    const material = new THREE.MeshBasicMaterial({
        color: 0x00f0ff,
        wireframe: true,
        transparent: true,
        opacity: 0.25
    });
    sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Lights
    const pointLight = new THREE.PointLight(0xff0055, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Mouse Move Parallax
    document.addEventListener('mousemove', (e) => {
        const mouseX = (e.clientX / window.innerWidth) - 0.5;
        const mouseY = (e.clientY / window.innerHeight) - 0.5;
        sphere.rotation.y = mouseX * 2;
        sphere.rotation.x = mouseY * 2;
    });

    animate3D();
}

function animate3D() {
    requestAnimationFrame(animate3D);
    sphere.rotation.y += 0.003;
    sphere.rotation.z += 0.002;
    renderer.render(scene, camera);
}

// Window Resize Handle
window.addEventListener('resize', () => {
    if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
});

// --- 4. RENDER MEMBERS & TILT INITIALIZATION ---
function renderMembers() {
    const container = document.getElementById('members-container');
    container.innerHTML = '';

    membersData.forEach((member) => {
        const card = document.createElement('div');
        card.className = 'member-card glass-panel';
        card.setAttribute('data-tilt', '');
        card.setAttribute('data-tilt-max', '15');
        card.setAttribute('data-tilt-speed', '400');
        card.setAttribute('data-tilt-glare', 'true');
        card.setAttribute('data-tilt-max-glare', '0.3');

        card.innerHTML = `
            <img src="${member.avatar}" alt="${member.name}" class="member-img" onerror="this.src='https://via.placeholder.com/300x400/09090e/00f0ff?text=${member.name}'">
            <div class="member-info-overlay">
                <h3 class="member-name">${member.name}</h3>
                <p class="member-role">${member.role}</p>
            </div>
        `;

        card.addEventListener('click', () => openMemberModal(member));
        container.appendChild(card);
    });

    // Re-initialize VanillaTilt for dynamically added elements
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".member-card"));
    }
}

// Modal Functions
function openMemberModal(member) {
    const modal = document.getElementById('member-modal');
    const modalBody = document.getElementById('modal-body-content');

    modalBody.innerHTML = `
        <div style="text-align: center;">
            <img src="${member.avatar}" style="width:120px; height:120px; border-radius:50%; object-fit:cover; border:2px solid var(--neon-cyan); box-shadow: 0 0 15px var(--neon-cyan);">
            <h2 style="font-family: var(--font-heading); margin-top:15px; color: #fff;">${member.name}</h2>
            <p style="color: var(--neon-magenta); font-family: var(--font-sub); font-weight:600; font-size:1.2rem;">${member.role}</p>
            <p style="color: var(--text-sub); margin: 20px 0; line-height:1.6;">${member.bio}</p>
            <div style="display:flex; justify-content:center; gap:15px; font-size:1.5rem;">
                <a href="${member.socials.facebook}" style="color:var(--neon-cyan)"><i class="fa-brands fa-facebook"></i></a>
                <a href="${member.socials.instagram}" style="color:var(--neon-magenta)"><i class="fa-brands fa-instagram"></i></a>
                <a href="${member.socials.soundcloud}" style="color:var(--neon-green)"><i class="fa-brands fa-soundcloud"></i></a>
            </div>
        </div>
    `;

    modal.classList.add('open');
}

document.getElementById('close-modal-btn').addEventListener('click', () => {
    document.getElementById('member-modal').classList.remove('open');
});

// --- 5. AUDIO PLAYER & WAVE VISUALIZER ---
let currentTrackIndex = 0;
const audio = document.getElementById('audio-player');
const btnPlay = document.getElementById('btn-play');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const progressBar = document.getElementById('progress-bar');
const currentTimeEl = document.getElementById('current-time');
const durationTimeEl = document.getElementById('duration-time');

function loadTrack(index) {
    currentTrackIndex = index;
    const track = playlistData[index];
    document.getElementById('player-title').innerText = track.title;
    document.getElementById('player-artist').innerText = track.artist;
    document.getElementById('player-cover').src = track.cover;
    audio.src = track.src;

    updatePlaylistActive();
}

function updatePlaylistActive() {
    const items = document.querySelectorAll('.playlist-item');
    items.forEach((item, idx) => {
        if (idx === currentTrackIndex) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

function renderPlaylist() {
    const list = document.getElementById('playlist-items');
    list.innerHTML = '';
    playlistData.forEach((track, idx) => {
        const li = document.createElement('li');
        li.className = 'playlist-item';
        li.innerHTML = `<span>${idx + 1}. ${track.title}</span> <span>${track.artist}</span>`;
        li.addEventListener('click', () => {
            loadTrack(idx);
            playAudio();
        });
        list.appendChild(li);
    });
}

function playAudio() {
    audio.play().then(() => {
        btnPlay.innerHTML = '<i class="fa-solid fa-pause"></i>';
    }).catch(err => console.log("Audio playback waiting for user interaction."));
}

function pauseAudio() {
    audio.pause();
    btnPlay.innerHTML = '<i class="fa-solid fa-play"></i>';
}

btnPlay.addEventListener('click', () => {
    if (audio.paused) {
        playAudio();
    } else {
        pauseAudio();
    }
});

btnNext.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex + 1) % playlistData.length;
    loadTrack(currentTrackIndex);
    playAudio();
});

btnPrev.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex - 1 + playlistData.length) % playlistData.length;
    loadTrack(currentTrackIndex);
    playAudio();
});

audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progressPercent;
        currentTimeEl.innerText = formatTime(audio.currentTime);
        durationTimeEl.innerText = formatTime(audio.duration);
    }
});

progressBar.addEventListener('input', () => {
    const seekTime = (progressBar.value / 100) * audio.duration;
    audio.currentTime = seekTime;
});

function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
}

// 2D Canvas Wave Visualizer Simulation
function initAudioWaveCanvas() {
    const canvas = document.getElementById('audio-wave-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let step = 0;
    function drawWave() {
        requestAnimationFrame(drawWave);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#00f0ff';

        const height = canvas.height;
        const width = canvas.width;

        for (let x = 0; x < width; x += 5) {
            const y = audio.paused 
                ? height / 2 + Math.sin(x * 0.02 + step) * 2 
                : height / 2 + Math.sin(x * 0.05 + step) * 15 * Math.random();
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }

        ctx.stroke();
        step += 0.08;
    }
    drawWave();
}

// --- 6. PARTICLES.JS INITIALIZATION ---
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 50, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": ["#00f0ff", "#ff0055", "#8b00ff"] },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.5, "random": true },
                "size": { "value": 3, "random": true },
                "line_linked": { "enable": true, "distance": 150, "color": "#00f0ff", "opacity": 0.15, "width": 1 },
                "move": { "enable": true, "speed": 1.5, "direction": "none", "random": true, "out_mode": "out" }
            },
            "interactivity": {
                "events": { "onhover": { "enable": true, "mode": "grab" } }
            }
        });
    }
}

// --- INITIALIZE ALL ON DOM LOADED ---
document.addEventListener('DOMContentLoaded', () => {
    init3DBackground();
    renderMembers();
    renderPlaylist();
    loadTrack(0);
    initAudioWaveCanvas();
    initParticles();

    // Tilt for Hero Header
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll("[data-tilt]"));
    }
});