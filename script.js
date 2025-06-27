/* =================================================================
   KODE JAVASCRIPT LENGKAP - FINAL (SEMUA FITUR)
   - Menu Mobile
   - Dark Mode
   - Animasi Scroll
   - Accordion Q&A
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

    // --- 2. Dark Mode Toggle ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
        const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
        
        if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            if(themeToggleLightIcon) themeToggleLightIcon.classList.remove('hidden');
            if(themeToggleDarkIcon) themeToggleDarkIcon.classList.add('hidden');
            document.documentElement.classList.add('dark');
        } else {
            if(themeToggleDarkIcon) themeToggleDarkIcon.classList.remove('hidden');
            if(themeToggleLightIcon) themeToggleLightIcon.classList.add('hidden');
            document.documentElement.classList.remove('dark');
        }

        themeToggleBtn.addEventListener('click', function() {
            if(themeToggleDarkIcon) themeToggleDarkIcon.classList.toggle('hidden');
            if(themeToggleLightIcon) themeToggleLightIcon.classList.toggle('hidden');
            document.documentElement.classList.toggle('dark');
            if (document.documentElement.classList.contains('dark')) {
                localStorage.setItem('color-theme', 'dark');
            } else {
                localStorage.setItem('color-theme', 'light');
            }
        });
    }

    // --- 3. Mesin Animasi Scroll (Versi Selalu Berulang) ---
    const elemenAnimasi = document.querySelectorAll('.animasi');
    if (elemenAnimasi.length > 0) {
        const observerAnimasi = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aktif');
                } else {
                    entry.target.classList.remove('aktif');
                }
            });
        }, { threshold: 0.1 });
        elemenAnimasi.forEach(el => {
            observerAnimasi.observe(el);
        });
    }

    // --- 4. Logika untuk Accordion Q&A ---
    const qaItems = document.querySelectorAll('.qa-item');
    if (qaItems.length > 0) {
        qaItems.forEach(item => {
            const questionBtn = item.querySelector('.qa-question');
            const answerPanel = item.querySelector('.qa-answer');

            if (questionBtn && answerPanel) {
                questionBtn.addEventListener('click', () => {
                    const isOpen = item.classList.contains('active');

                    // Tutup semua item lain
                    qaItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                            otherItem.querySelector('.qa-answer').classList.remove('open');
                        }
                    });

                    // Buka atau tutup item yang diklik
                    item.classList.toggle('active');
                    answerPanel.classList.toggle('open');
                });
            }
        });
    }

});