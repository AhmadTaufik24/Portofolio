document.addEventListener('DOMContentLoaded', function () {

// --- 1. Mobile Menu Toggle --- const mobileMenuButton = document.getElementById('mobile-menu-button'); const mobileMenu = document.getElementById('mobile-menu'); if (mobileMenuButton && mobileMenu) { mobileMenuButton.addEventListener('click', () => { mobileMenu.classList.toggle('hidden'); }); mobileMenu.addEventListener('click', (event) => { if (event.target.tagName === 'A') mobileMenu.classList.add('hidden'); }); }

// --- 2. Dark Mode Toggle --- const themeToggleBtn = document.getElementById('theme-toggle'); if (themeToggleBtn) { const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon'); const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon'); if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) { themeToggleLightIcon?.classList.remove('hidden'); themeToggleDarkIcon?.classList.add('hidden'); document.documentElement.classList.add('dark'); } else { themeToggleDarkIcon?.classList.remove('hidden'); themeToggleLightIcon?.classList.add('hidden'); document.documentElement.classList.remove('dark'); } themeToggleBtn.addEventListener('click', function () { themeToggleDarkIcon?.classList.toggle('hidden'); themeToggleLightIcon?.classList.toggle('hidden'); document.documentElement.classList.toggle('dark'); localStorage.setItem('color-theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light'); }); }

// --- 3. Animasi Scroll --- const elemenAnimasi = document.querySelectorAll('.animasi'); if (elemenAnimasi.length > 0) { const observerAnimasi = new IntersectionObserver((entries) => { entries.forEach(entry => { entry.target.classList.toggle('aktif', entry.isIntersecting); }); }, { threshold: 0.1 }); elemenAnimasi.forEach(el => observerAnimasi.observe(el)); }

// --- 4. Navbar Aktif Saat Scroll --- const navLinks = document.querySelectorAll('header nav a'); const sections = document.querySelectorAll('main section[id]'); if (navLinks.length > 0 && sections.length > 0) { const observerNavbar = new IntersectionObserver((entries) => { entries.forEach(entry => { if (entry.isIntersecting) { const id = entry.target.getAttribute('id'); navLinks.forEach(link => { link.classList.remove('navbar-aktif'); if (link.getAttribute('href') === '#' + id) { link.classList.add('navbar-aktif'); } }); } }); }, { rootMargin: "-50% 0px -50% 0px" }); sections.forEach(section => observerNavbar.observe(section)); }

// --- 5. Swiper Journal Slider --- const journalSliderEl = document.querySelector('.journal-slider'); if (journalSliderEl) { const journalData = [ { title: "The Art of Minimalism in Web Design", description: "Exploring how less can be more...", link: "artikel-1.html" }, { title: "Why Typography is the Soul of Design", description: "A deep dive into how fonts shape perception...", link: "artikel-2.html" }, { title: "My Favorite Tools for Creative Workflow", description: "From Figma to Framer, here are the tools...", link: "artikel-3.html" }, { title: "A Designer's Guide to User Empathy", description: "Understanding the user is the first step...", link: "artikel-4.html" }, ]; const descriptionTitle = document.getElementById('journal-title'); const descriptionExcerpt = document.getElementById('journal-excerpt'); const readMoreBtn = document.getElementById('journal-readmore');

const swiper = new Swiper('.journal-slider', {
  effect: 'slide',
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  loop: true,
  spaceBetween: 20,
  navigation: {
    nextEl: '.journal-next',
    prevEl: '.journal-prev',
  },
  on: {
    slideChange: function () {
      const activeIndex = this.realIndex;
      if (journalData[activeIndex]) {
        descriptionTitle.textContent = journalData[activeIndex].title;
        descriptionExcerpt.textContent = journalData[activeIndex].description;
        readMoreBtn.href = journalData[activeIndex].link;
      }
    },
    init: function () {
      descriptionTitle.textContent = journalData[0].title;
      descriptionExcerpt.textContent = journalData[0].description;
      readMoreBtn.href = journalData[0].link;
    }
  }
});

}

// --- 6. Accordion FAQ --- const qaButtons = document.querySelectorAll('.qa-question-btn'); const qaPanels = document.querySelectorAll('.qa-answer-panel');

if (qaButtons.length > 0 && qaPanels.length > 0) { qaButtons.forEach((button) => { button.addEventListener('click', () => { const targetId = button.getAttribute('data-target'); const targetPanel = document.querySelector(targetId);

// Reset semua tombol & panel
    qaButtons.forEach(btn => {
      btn.classList.remove('qa-question-active');
      const icon = btn.querySelector('.faq-icon');
      if (icon) icon.classList.remove('rotate-180');
    });

    qaPanels.forEach(panel => panel.classList.add('hidden'));

    // Aktifkan yang diklik
    button.classList.add('qa-question-active');
    if (targetPanel) targetPanel.classList.remove('hidden');

    const selectedIcon = button.querySelector('.faq-icon');
    if (selectedIcon) selectedIcon.classList.add('rotate-180');
  });
});

}

});

