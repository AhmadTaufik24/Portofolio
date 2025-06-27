document.addEventListener('DOMContentLoaded', function() {

    // --- 1. Mobile Menu Toggle ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => { mobileMenu.classList.toggle('hidden'); });
        mobileMenu.addEventListener('click', (event) => { if (event.target.tagName === 'A') mobileMenu.classList.add('hidden'); });
    }

    // --- 2. Dark Mode Toggle (Kunjungan pertama Light, lalu mengingat) ---
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

    // --- 3. Mesin Animasi Scroll ---
    const elemenAnimasi = document.querySelectorAll('.animasi');
    if (elemenAnimasi.length > 0) {
        const observerAnimasi = new IntersectionObserver((entries) => {
            entries.forEach(entry => { entry.target.classList.toggle('aktif', entry.isIntersecting); });
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

    // --- 5. Slideshow & Typing Effect ---
    const profilePhoto = document.getElementById('profile-photo');
    if (profilePhoto) {
        const images = ['https://i.ibb.co/6nZtWd3/profile-pic-1.png', 'https://i.ibb.co/StC75sW/profile-pic-2.png'];
        let currentImageIndex = 0;
        setInterval(() => {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            profilePhoto.style.opacity = 0;
            setTimeout(() => {
                profilePhoto.src = images[currentImageIndex];
                profilePhoto.style.opacity = 1;
            }, 500);
        }, 4000);
    }

    const typedTextSpan = document.querySelector("#typed-text");
    if (typedTextSpan) {
        const textArray = ["elegant", "intuitive", "modern", "impactful"];
        let textArrayIndex = 0, charIndex = 0;
        function type() {
            if (charIndex < textArray[textArrayIndex].length) {
                typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex++);
                setTimeout(type, 150);
            } else {
                setTimeout(erase, 2000);
            }
        }
        function erase() {
            if (charIndex > 0) {
                typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
                charIndex--;
                setTimeout(erase, 100);
            } else {
                textArrayIndex = (textArrayIndex + 1) % textArray.length;
                setTimeout(type, 500);
            }
        }
        setTimeout(type, 1000);
    }
    
    // --- 6. Logika Accordion Q&A ---
    const qaItems = document.querySelectorAll('.qa-item');
    if (qaItems.length > 0) {
        qaItems.forEach(item => {
            const questionBtn = item.querySelector('.qa-question');
            if (questionBtn) {
                questionBtn.addEventListener('click', () => {
                    const wasActive = item.classList.contains('active');
                    qaItems.forEach(otherItem => {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.qa-answer')?.classList.remove('open');
                    });
                    if (!wasActive) {
                        item.classList.add('active');
                        item.querySelector('.qa-answer')?.classList.add('open');
                    }
                });
            }
        });
    }

    // --- 7. Tombol Back to Top ---
    const backToTopBtn = document.getElementById('back-to-top-btn');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            backToTopBtn.classList.toggle('show', window.scrollY > 400);
        });
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

});