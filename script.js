document.addEventListener('DOMContentLoaded', function() {

    // --- Mobile Menu Toggle ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // --- Dark Mode Toggle ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
        const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
        
        // Logika tema: Kunjungan pertama Light, lalu mengingat pilihan
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

    // --- Navbar Aktif Saat Scroll ---
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

});