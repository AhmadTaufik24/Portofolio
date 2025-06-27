/* =================================================================
   KODE JAVASCRIPT LENGKAP - FINAL
   (Semua Fitur dengan Logika Tema yang Diperbarui)
================================================================= */

document.addEventListener('DOMContentLoaded', function() {

    // --- 1. Mobile Menu Toggle ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        mobileMenu.addEventListener('click', (event) => {
            if (event.target.tagName === 'A') {
                mobileMenu.classList.add('hidden');
            }
        });
    }

    // --- 2. Dark Mode Toggle (Kunjungan pertama Light, lalu mengingat) ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
        const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
        
        // Cek tema yang tersimpan di localStorage
        const savedTheme = localStorage.getItem('color-theme');

        // LOGIKA BARU:
        if (savedTheme === 'dark') {
            // Jika tersimpan 'dark', langsung terapkan dark mode
            document.documentElement.classList.add('dark');
            if(themeToggleLightIcon) themeToggleLightIcon.classList.remove('hidden');
            if(themeToggleDarkIcon) themeToggleDarkIcon.classList.add('hidden');
        } else {
            // Jika tidak ada yang tersimpan (kunjungan pertama) atau tersimpan 'light',
            // maka terapkan light mode.
            document.documentElement.classList.remove('dark');
            if(themeToggleDarkIcon) themeToggleDarkIcon.classList.remove('hidden');
            if(themeToggleLightIcon) themeToggleLightIcon.classList.add('hidden');
        }

        // Event listener untuk tombol ganti tema tetap sama
        themeToggleBtn.addEventListener('click', function() {
            if(themeToggleDarkIcon) themeToggleDarkIcon.classList.toggle('hidden');
            if(themeToggleLightIcon) themeToggleLightIcon.classList.toggle('hidden');
            
            // Toggle kelas 'dark' dan simpan pilihan terbaru ke localStorage
            const isDark = document.documentElement.classList.toggle('dark');
            localStorage.setItem('color-theme', isDark ? 'dark' : 'light');
        });
    }

    // --- 3. Navbar Background on Scroll ---
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 10) {
                navbar.classList.add('shadow-md');
            } else {
                navbar.classList.remove('shadow-md');
            }
        });
    }

    // --- 4. Mesin Animasi Scroll (Versi Selalu Berulang) ---
    const elemenAnimasi = document.querySelectorAll('.animasi');
    if (elemenAnimasi.length > 0) {
        const observerAnimasi = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                entry.target.classList.toggle('aktif', entry.isIntersecting);
            });
        }, { threshold: 0.1 });
        elemenAnimasi.forEach(el => {
            observerAnimasi.observe(el);
        });
    }

    // --- 5. Navbar Aktif Saat Scroll ---
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
        sections.forEach(section => {
            observerNavbar.observe(section);
        });
    }

    // --- 6. Logika untuk Accordion Q&A ---
    const qaItems = document.querySelectorAll('.qa-item');
    if (qaItems.length > 0) {
        qaItems.forEach(item => {
            const questionBtn = item.querySelector('.qa-question');
            if (questionBtn) {
                questionBtn.addEventListener('click', () => {
                    const answerPanel = item.querySelector('.qa-answer');
                    const wasActive = item.classList.contains('active');
                    
                    qaItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                            const otherAnswer = otherItem.querySelector('.qa-answer');
                            if(otherAnswer) otherAnswer.classList.remove('open');
                        }
                    });

                    if (!wasActive && answerPanel) {
                        item.classList.add('active');
                        answerPanel.classList.add('open');
                    } else if (answerPanel) {
                        item.classList.remove('active');
                        answerPanel.classList.remove('open');
                    }
                });
            }
        });
    }

    // --- 7. Logika Tombol Back to Top ---
    const backToTopBtn = document.getElementById('back-to-top-btn');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Perbaikan: tambahkan 'e' sebagai parameter
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

});