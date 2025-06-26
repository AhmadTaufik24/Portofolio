// ================================
//  Google Translate Toggle Bahasa
// ================================

// Inisialisasi Google Translate
function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'en',
    includedLanguages: 'en,id',
    layout: google.translate.TranslateElement.InlineLayout.SIMPLE
  }, 'google_translate_element');
}

// Fungsi buat set cookie translate
function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}

// Fungsi ambil cookie
function getCookie(name) {
  return document.cookie.split('; ').find(row => row.startsWith(name + '='))?.split('=')[1];
}

// Terapkan bahasa ke halaman
function applyLang(lang) {
  const currentPath = window.location.pathname;
  setCookie('googtrans', `/en/${lang}`, 365);
  setCookie('googtrans', `/en/${lang}`, 365, window.location.hostname);
  localStorage.setItem('prefLang', lang);
  document.documentElement.lang = lang;

  const toggleBtn = document.getElementById('toggle-language');
  if (toggleBtn) {
    toggleBtn.innerText = lang === 'id' ? '🇮🇩 ID' : '🇬🇧 EN';
  }

  // Reload untuk menerapkan perubahan
  setTimeout(() => {
    window.location.reload();
  }, 300);
}

// Toggle Bahasa saat diklik
document.addEventListener('DOMContentLoaded', function () {
  const toggleBtn = document.getElementById('toggle-language');

  // Klik tombol toggle
  if (toggleBtn) {
    toggleBtn.addEventListener('click', function () {
      const currentLang = localStorage.getItem('prefLang') || 'en';
      const nextLang = currentLang === 'en' ? 'id' : 'en';
      applyLang(nextLang);
    });
  }

  // Saat pertama kali load
  const savedLang = localStorage.getItem('prefLang') || 'en';
  applyLang(savedLang);
});