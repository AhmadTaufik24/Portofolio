document.addEventListener('DOMContentLoaded', function () {

  // === 1. Toggle Mobile Menu ===
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
    mobileMenu.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        mobileMenu.classList.add('hidden');
      }
    });
  }

  // === 2. Toggle Dark Mode ===
  const themeToggleBtn = document.getElementById('theme-toggle');
  const darkIcon = document.getElementById('theme-toggle-dark-icon');
  const lightIcon = document.getElementById('theme-toggle-light-icon');

  if (themeToggleBtn) {
    // Set icon saat load
    if (
      localStorage.getItem('color-theme') === 'dark' ||
      (!localStorage.getItem('color-theme') &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
      lightIcon?.classList.remove('hidden');
      darkIcon?.classList.add('hidden');
    } else {
      document.documentElement.classList.remove('dark');
      darkIcon?.classList.remove('hidden');
      lightIcon?.classList.add('hidden');
    }

    // Toggle saat klik
    themeToggleBtn.addEventListener('click', () => {
      darkIcon?.classList.toggle('hidden');
      lightIcon?.classList.toggle('hidden');
      document.documentElement.classList.toggle('dark');

      if (document.documentElement.classList.contains('dark')) {
        localStorage.setItem('color-theme', 'dark');
      } else {
        localStorage.setItem('color-theme', 'light');
      }
    });
  }

  // === 3. Animasi Scroll (IntersectionObserver) ===
  const animatedElements = document.querySelectorAll('.animasi');
  if (animatedElements.length > 0) {
    const animObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle('aktif', entry.isIntersecting);
      });
    }, { threshold: 0.1 });

    animatedElements.forEach((el) => animObserver.observe(el));
  }

  // === 4. Navbar Active Saat Scroll ===
  const navLinks = document.querySelectorAll('header nav a');
  const sections = document.querySelectorAll('main section[id]');
  if (navLinks.length > 0 && sections.length > 0) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.classList.remove('navbar-aktif');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('navbar-aktif');
            }
          });
        }
      });
    }, { rootMargin: "-50% 0px -50% 0px" });

    sections.forEach((sec) => navObserver.observe(sec));
  }

  // === 5. Journal Slider (Swiper.js) ===
  const journalSliderEl = document.querySelector('.journal-slider');
  if (journalSliderEl && typeof Swiper !== 'undefined') {
    const journalData = [
      { title: "The Art of Minimalism in Web Design", description: "Exploring how less can be more...", link: "artikel-1.html" },
      { title: "Why Typography is the Soul of Design", description: "A deep dive into how fonts shape perception...", link: "artikel-2.html" },
      { title: "My Favorite Tools for Creative Workflow", description: "From Figma to Framer, here are the tools...", link: "artikel-3.html" },
      { title: "A Designer's Guide to User Empathy", description: "Understanding the user is the first step...", link: "artikel-4.html" },
    ];

    const titleEl = document.getElementById('journal-title');
    const excerptEl = document.getElementById('journal-excerpt');
    const readMoreBtn = document.getElementById('journal-readmore');

    const swiper = new Swiper('.journal-slider', {
      effect: 'slide',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      loop: true,
      spaceBetween: 20,
      navigation: { nextEl: '.journal-next', prevEl: '.journal-prev' },
      on: {
        init() {
          if (journalData[0]) {
            titleEl.textContent = journalData[0].title;
            excerptEl.textContent = journalData[0].description;
            readMoreBtn.href = journalData[0].link;
          }
        },
        slideChange() {
          const activeIndex = this.realIndex;
          const data = journalData[activeIndex];
          if (data) {
            titleEl.textContent = data.title;
            excerptEl.textContent = data.description;
            readMoreBtn.href = data.link;
          }
        }
      }
    });
  }

  // --- Accordion FAQ ---
const faqToggles = document.querySelectorAll('.faq-toggle');

faqToggles.forEach((toggle) => {
  toggle.addEventListener('click', () => {
    const icon = toggle.querySelector('.faq-icon');
    const content = toggle.nextElementSibling;

    // Tutup semua terlebih dahulu
    faqToggles.forEach(btn => {
      btn.nextElementSibling.classList.add('hidden');
      btn.querySelector('.faq-icon').classList.remove('rotate-180');
    });

    // Buka elemen yang diklik
    if (content.classList.contains('hidden')) {
      content.classList.remove('hidden');
      icon.classList.add('rotate-180');
    } else {
      content.classList.add('hidden');
    }
  });
});