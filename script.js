/* =================================================================
   KODE JAVASCRIPT LENGKAP - FINAL (dengan fitur Translate)
================================================================= */

document.addEventListener('DOMContentLoaded', function() {

    // --- 1. SISTEM TRANSLATE KUSTOM ---

    // Kamus untuk semua teks yang akan diterjemahkan
    const translations = {
        'en': {
            'nav-home': 'Home',
            'nav-work': 'Work',
            'nav-about': 'About',
            'nav-services': 'Services',
            'nav-journal': 'Journal',
            'nav-contact': 'Contact',
            'hero-title': "Hi, I’m Taufik – I build <span class='text-blue-600 dark:text-blue-400'>elegant</span> digital experiences.",
            'hero-subtitle': "A creative professional specializing in UI/UX design and branding, focused on creating user-centric products with a clean and modern aesthetic.",
            'hero-cta1': "View My Work",
            'hero-cta2': "Contact Me",
        },
        'id': {
            'nav-home': 'Beranda',
            'nav-work': 'Karya',
            'nav-about': 'Tentang',
            'nav-services': 'Layanan',
            'nav-journal': 'Jurnal',
            'nav-contact': 'Kontak',
            'hero-title': "Hai, saya Taufik – Saya membangun pengalaman digital yang <span class='text-blue-600 dark:text-blue-400'>elegan</span>.",
            'hero-subtitle': "Seorang profesional kreatif dengan spesialisasi di desain UI/UX dan branding, fokus pada pembuatan produk yang berpusat pada pengguna dengan estetika yang bersih dan modern.",
            'hero-cta1': "Lihat Karya Saya",
            'hero-cta2': "Hubungi Saya",
        }
    };

    const languageToggle = document.getElementById('language-toggle');
    const allTextElements = document.querySelectorAll('[data-lang-en]'); // Ambil semua elemen yang punya label bahasa

    function setLanguage(lang) {
        // Ganti setiap teks di halaman sesuai bahasa yang dipilih
        allTextElements.forEach(el => {
            const text = el.getAttribute(`data-lang-${lang}`);
            if (text) {
                el.innerHTML = text;
            }
        });

        // Perbarui teks pada tombol
        if (languageToggle) {
            languageToggle.innerHTML = lang === 'id' ? '🇮🇩 ID' : '🇬🇧 EN';
        }
        
        // Simpan pilihan bahasa pengguna
        localStorage.setItem('prefLang', lang);
        document.documentElement.lang = lang;
    }

    // Event listener untuk tombol ganti bahasa
    if (languageToggle) {
        languageToggle.addEventListener('click', () => {
            const currentLang = localStorage.getItem('prefLang') || 'id';
            const newLang = currentLang === 'id' ? 'en' : 'id';
            setLanguage(newLang);
        });
    }

    // Saat halaman dimuat, terapkan bahasa yang tersimpan atau default ke ID
    const savedLang = localStorage.getItem('prefLang') || 'id';
    setLanguage(savedLang);


    // --- 2. Mobile Menu Toggle ---
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

    // --- 3. Dark Mode Toggle ---
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

    // --- 4. Mesin Animasi Scroll (jika ada section dengan kelas .animasi) ---
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

});