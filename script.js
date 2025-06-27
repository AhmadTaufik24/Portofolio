/* =================================================================
   KODE JAVASCRIPT LENGKAP - FINAL (Selalu Mulai Light Mode)
================================================================= */

document.addEventListener('DOMContentLoaded', function() {

    // --- 1. Mobile Menu Toggle ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => { mobileMenu.classList.toggle('hidden'); });
        mobileMenu.addEventListener('click', (event) => { if (event.target.tagName === 'A') mobileMenu.classList.add('hidden'); });
    }

    // --- 2. Dark Mode Toggle (DIUBAH) ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
        const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
        
        // --- FIX: Logika diubah untuk selalu memulai dari Light Mode ---
        // Hapus kelas 'dark' dari <html>, pastikan mulai dari light
        document.documentElement.classList.remove('dark');
        // Tampilkan ikon yang benar untuk light mode (yaitu ikon bulan)
        if(themeToggleDarkIcon) themeToggleDarkIcon.classList.remove('hidden');
        if(themeToggleLightIcon) themeToggleLightIcon.classList.add('hidden');
        // Set penyimpanan lokal ke 'light' sebagai default
        localStorage.setItem('color-theme', 'light');

        // Event listener untuk tombol ganti tema tetap berfungsi seperti biasa
        themeToggleBtn.addEventListener('click', function() {
            if(themeToggleDarkIcon) themeToggleDarkIcon.classList.toggle('hidden');
            if(themeToggleLightIcon) themeToggleLightIcon.classList.toggle('hidden');
            
            const isDark = document.documentElement.classList.toggle('dark');
            localStorage.setItem('color-theme', isDark ? 'dark' : 'light');
        });
    }

    // --- 3. Mesin Animasi Scroll ---
    const elemenAnimasi = document.querySelectorAll('.animasi');
    if (elemenAnimasi.length > 0) {
        const observerAnimasi = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                entry.target.classList.toggle('aktif', entry.isIntersecting);
            });
        }, { threshold: 0.1 });
        elemenAnimasi.forEach(el => { observerAnimasi.observe(el); });
    }

    // --- 4. Navbar Aktif Saat Scroll ---
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

    // --- 5. Accordion Q&A ---
    const qaItems = document.querySelectorAll('.qa-item');
    if (qaItems.length > 0) {
        qaItems.forEach(item => {
            const questionBtn = item.querySelector('.qa-question');
            if (questionBtn) {
                questionBtn.addEventListener('click', () => {
                    const answerPanel = item.querySelector('.qa-answer');
                    const wasActive = item.classList.contains('active');
                    
                    qaItems.forEach(otherItem => {
                        otherItem.classList.remove('active');
                        const otherAnswer = otherItem.querySelector('.qa-answer');
                        if (otherAnswer) otherAnswer.classList.remove('open');
                    });

                    if (!wasActive && answerPanel) {
                        item.classList.add('active');
                        answerPanel.classList.add('open');
                    }
                });
            }
        });
    }

});