// TR/EN for neronalp.github.io. Turkish is written in the page; an element
// with data-en carries its English (HTML allowed). Blocks marked data-lang
// show for one language only. The choice is remembered on this browser;
// first visits follow the browser's language.
(function () {
  var KEY = 'lang';
  var lang = null;
  try { lang = localStorage.getItem(KEY); } catch (e) {}
  if (lang !== 'tr' && lang !== 'en') {
    lang = (navigator.language || 'tr').toLowerCase().indexOf('tr') === 0 ? 'tr' : 'en';
  }

  function apply(l) {
    document.documentElement.lang = l;
    document.querySelectorAll('[data-en]').forEach(function (el) {
      if (el.dataset.tr === undefined) el.dataset.tr = el.innerHTML;
      el.innerHTML = l === 'en' ? el.dataset.en : el.dataset.tr;
    });
    document.querySelectorAll('[data-en-placeholder]').forEach(function (el) {
      if (el.dataset.trPlaceholder === undefined) el.dataset.trPlaceholder = el.placeholder;
      el.placeholder = l === 'en' ? el.dataset.enPlaceholder : el.dataset.trPlaceholder;
    });
    document.querySelectorAll('[data-lang]').forEach(function (el) {
      el.hidden = el.dataset.lang !== l;
    });
    document.querySelectorAll('.lang-toggle').forEach(function (b) {
      b.textContent = l === 'en' ? 'TR' : 'EN';
      b.setAttribute('aria-label', l === 'en' ? 'Türkçe' : 'English');
    });
    try { localStorage.setItem(KEY, l); } catch (e) {}
    window.__lang = l;
  }

  window.toggleLang = function () { apply(window.__lang === 'en' ? 'tr' : 'en'); };
  window.applyLang = function () { apply(window.__lang || lang); };
  document.addEventListener('DOMContentLoaded', function () { apply(lang); });
})();
