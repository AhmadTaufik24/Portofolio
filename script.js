document.addEventListener('DOMContentLoaded', function() {

    // --- 1. Dark Mode Toggle (Logika Final: Kunjungan pertama Light) ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
        const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
        const savedTheme = localStorage.getItem('color-theme');

        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
            if(themeToggleLightIcon) themeToggleLightIcon.classList.remove('hidden');
            if(themeToggleDarkIcon) themeToggleDarkIcon.classList.add('hidden');
        } else {
            document.documentElement.classList.remove('dark');
            if(themeToggleDarkIcon) themeToggleDarkIcon.classList.remove('hidden');
            if(themeToggleLightIcon) themeToggleLightIcon.classList.add('hidden');
        }

        themeToggleBtn.addEventListener('click', function() {
            if(themeToggleDarkIcon) themeToggleDarkIcon.classList.toggle('hidden');
            if(themeToggleLightIcon) themeToggleLightIcon.classList.toggle('hidden');
            const isDark = document.documentElement.classList.toggle('dark');
            localStorage.setItem('color-theme', isDark ? 'dark' : 'light');
        });
    }

    // --- 2. Navbar Aktif Saat Scroll ---
    const navLinks = document.querySelectorAll('header nav a[href^="#"]');
    const sections = document.querySelectorAll('main section[id]');
    if (navLinks.length > 0 && sections.length > 0) {
        const observerNavbar = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.remove('navbar-aktif');
                        if (link.getAttribute('href') === '#' + id) {
                            link.classList.add('navbar-aktif');
                        }
                    });
                }
            });
        }, { rootMargin: "-40% 0px -60% 0px" });
        sections.forEach(section => { observerNavbar.observe(section); });
    }

    // --- 3. Slideshow Foto Profil (BARU) ---
    const profilePhoto = document.getElementById('profile-photo');
    if (profilePhoto) {
        const images = [
            'https://i.ibb.co/6nZtWd3/profile-pic-1.png', // <-- Ganti dengan link foto Anda nanti
            'https://i.ibb.co/StC75sW/profile-pic-2.png'  // <-- Ganti dengan link foto Anda nanti
            // Anda bisa menambah lebih banyak link di sini, contoh: ,'link_foto_3.png'
        ];
        let currentIndex = 0;

        setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length; // Ganti ke foto selanjutnya
            
            // Efek fade out
            profilePhoto.style.opacity = 0; 
            
            // Tunggu fade out selesai, baru ganti gambar dan fade in
            setTimeout(() => {
                profilePhoto.src = images[currentIndex];
                profilePhoto.style.opacity = 1;
            }, 500); // 500ms = durasi transisi di CSS

        }, 4000); // Ganti foto setiap 4 detik
    }

});