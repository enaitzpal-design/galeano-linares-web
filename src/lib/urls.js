const { SITE } = require('../content/shared');

// Esquema de URLs: ca es la raíz por defecto, es vive bajo /es/ (brief §2.3 / §5)
function pagePath(lang, slug) {
  const clean = slug ? `${slug}/` : '';
  return lang === 'es' ? `/es/${clean}` : `/${clean}`;
}

function zonePath(lang, townSlug) {
  return lang === 'es' ? `/es/zona/${townSlug}/` : `/zona/${townSlug}/`;
}

function absUrl(path) {
  return `${SITE.domain}${path}`;
}

function waLink(message) {
  return `https://wa.me/${SITE.phoneWa}?text=${encodeURIComponent(message)}`;
}

function telLink() {
  return `tel:${SITE.phoneTel}`;
}

module.exports = { pagePath, zonePath, absUrl, waLink, telLink };
