function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'en',
    includedLanguages: 'en,id',
    autoDisplay: false, // disable auto popup
    layout: google.translate.TranslateElement.InlineLayout.SIMPLE
  }, 'google_translate_element');
}

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('toggle-language');
  if (!btn) return;

  function setTransCookie(lang) {
    document.cookie = `googtrans=/en/${lang}; domain=${location.hostname}; path=/; max-age=${365*24*60*60}`;
  }

  function apply(lang) {
    setTransCookie(lang);
    localStorage.setItem('prefLang', lang);
    document.documentElement.lang = lang;
    btn.innerText = lang === 'en' ? '🇬🇧 EN' : '🇮🇩 ID';
  }

  btn.addEventListener('click', () => {
    const cur = localStorage.getItem('prefLang') || 'en';
    const nxt = cur === 'en' ? 'id' : 'en';
    apply(nxt);
  });

  // on load delay untuk override google script
  setTimeout(() => {
    const saved = localStorage.getItem('prefLang') || 'en';
    apply(saved);
  }, 200);
});