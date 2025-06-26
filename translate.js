// =============================
// Google Translate Toggle
// =============================
function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = name + '=' + value + '; expires=' + expires + '; path=/';
}

function getCookie(name) {
  return document.cookie.split('; ').find(row => row.startsWith(name + '='))?.split('=')[1];
}

function applyLang(lang) {
  setCookie('googtrans', `/en/${lang}`, 365);
  localStorage.setItem('prefLang', lang);
  document.documentElement.lang = lang;

  const toggleBtn = document.getElementById('toggle-language');
  if (toggleBtn) {
    toggleBtn.innerText = lang === 'en' ? '🇬🇧 EN' : '🇮🇩 ID';
  }
}

function initLanguageToggle() {
  const savedLang = localStorage.getItem('prefLang') || 'en';
  applyLang(savedLang);

  const toggleBtn = document.getElementById('toggle-language');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = localStorage.getItem('prefLang') || 'en';
      const next = current === 'en' ? 'id' : 'en';
      applyLang(next);

      setTimeout(() => {
        location.reload();
      }, 400);
    });
  }
}

// Init Google Translate API
function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'en',
    includedLanguages: 'en,id',
    layout: google.translate.TranslateElement.InlineLayout.SIMPLE
  }, 'google_translate_element');
}

// Jalankan saat DOM siap
document.addEventListener('DOMContentLoaded', () => {
  initLanguageToggle();
});