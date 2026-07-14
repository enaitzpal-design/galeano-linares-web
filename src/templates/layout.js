const fs = require('fs');
const path = require('path');
const { SITE, TOWNS, SERVICES } = require('../content/shared');
const { UI } = require('../content/ui');
const { pagePath, zonePath, absUrl, waLink, telLink } = require('../lib/urls');
const { localBusinessSchema } = require('../lib/schema');
const { icon } = require('./icons');

// CSS inlineada en cada página: evita 2 peticiones render-blocking (Google Fonts + main.css)
// que Lighthouse señaló como el mayor coste de LCP (~750ms). Las fuentes en sí se auto-alojan
// como woff2 (font-display:swap) y solo se descargan cuando el navegador las necesita.
const FONTS_CSS = fs.readFileSync(path.join(__dirname, '../styles/fonts.css'), 'utf8');
const MAIN_CSS = fs.readFileSync(path.join(__dirname, '../styles/main.css'), 'utf8');
const CRITICAL_CSS = FONTS_CSS + '\n' + MAIN_CSS;

// Monograma "G·L" — las iniciales de los dos apellidos, no un icono de oficio. Sirve tanto
// de marca de agua compacta (mobile, favicon) como de firma visual repetida en tarjetas.
function logoSvg() {
  return `<svg class="logo-mark" viewBox="0 0 40 40" aria-hidden="true" focusable="false">
    <circle cx="20" cy="20" r="19" fill="var(--terracota-oscuro)"/>
    <text x="20" y="27" text-anchor="middle" font-family="'Bricolage Grotesque', sans-serif" font-weight="800" font-size="16" fill="var(--crema)">G·L</text>
  </svg>`;
}

function headHtml({ lang, title, description, canonicalPath, alternates, jsonLdList, ogImage }) {
  const other = UI[lang].otherLang;
  const altLinks = alternates.map(
    (a) => `<link rel="alternate" hreflang="${a.hreflang}" href="${absUrl(a.path)}">`
  ).join('\n    ');
  const ldJson = (jsonLdList || []).map((obj) => `<script type="application/ld+json">${JSON.stringify(obj)}</script>`).join('\n    ');
  const ogImg = ogImage || '/assets/images/og-galeano-linares.jpg';
  return `<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
    <title>${title}</title>
    <meta name="description" content="${description}">
    <link rel="canonical" href="${absUrl(canonicalPath)}">
    ${altLinks}
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Galeano & Linares — Fontaneria i Calefacció a Mataró">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:url" content="${absUrl(canonicalPath)}">
    <meta property="og:image" content="${absUrl(ogImg)}">
    <meta property="og:locale" content="${lang === 'es' ? 'es_ES' : 'ca_ES'}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="theme-color" content="#FAF6EE">
    <link rel="icon" href="/assets/images/favicon.svg" type="image/svg+xml">
    <link rel="apple-touch-icon" href="/assets/images/apple-touch-icon.png">
    <style>${CRITICAL_CSS}</style>
    ${ldJson}`;
}

// Nav de escritorio: compacta a propósito (6 puntos, no 9) — los 4 servicios, con nombres
// descriptivos ahora más largos que el antiguo "Cabal Agua" etc., no caben junto al resto
// sin desbordar; "Serveis" enlaza al grid de la home y cada servicio se enlaza además desde
// esa sección, las tarjetas de zona y el footer.
function navHtml(lang, slugForActive) {
  const t = UI[lang].nav;
  const items = [
    { href: pagePath(lang), label: t.home, key: '' },
    { href: `${pagePath(lang)}#serveis`, label: t.services, key: 'serveis' },
    { href: `${pagePath(lang)}#zona`, label: t.zona, key: 'zona' },
    { href: pagePath(lang, 'opinions'), label: t.opinions, key: 'opinions' },
    { href: pagePath(lang, 'preguntes-frequents'), label: t.faq, key: 'preguntes-frequents' },
    { href: pagePath(lang, 'contacte'), label: t.contact, key: 'contacte' },
  ];
  return items.map((it) => `<a href="${it.href}"${it.key === slugForActive ? ' aria-current="page"' : ''}>${it.label}</a>`).join('\n      ');
}

// El menú móvil sí lista los 4 servicios (hay espacio de sobra a pantalla completa) para
// que se puedan explorar directamente sin pasar antes por la home.
function mobileNavLinksHtml(lang, slugForActive) {
  const t = UI[lang].nav;
  const top = [
    { href: pagePath(lang), label: t.home, key: '' },
  ];
  const services = SERVICES.map((s) => ({ href: pagePath(lang, s.slug), label: s.name[lang], key: s.slug }));
  const rest = [
    { href: `${pagePath(lang)}#zona`, label: t.zona, key: 'zona' },
    { href: pagePath(lang, 'opinions'), label: t.opinions, key: 'opinions' },
    { href: pagePath(lang, 'preguntes-frequents'), label: t.faq, key: 'preguntes-frequents' },
    { href: pagePath(lang, 'contacte'), label: t.contact, key: 'contacte' },
  ];
  return [...top, ...services, ...rest]
    .map((it) => `<a href="${it.href}"${it.key === slugForActive ? ' aria-current="page"' : ''}>${it.label}</a>`)
    .join('\n      ');
}

function headerHtml(lang, slugForActive, otherLangPath) {
  const t = UI[lang];
  const other = t.otherLang;
  const otherPath = otherLangPath || pagePath(other.code);
  return `<header class="site-header">
    <div class="container">
      <a href="${pagePath(lang)}" class="logo" aria-label="Galeano & Linares — Inici">
        ${logoSvg()}
        <span class="logo-word">Galeano <span>&amp;</span> Linares</span>
      </a>
      <nav class="main-nav" aria-label="Navegació principal">
        ${navHtml(lang, slugForActive)}
      </nav>
      <div class="header-actions">
        <a class="lang-switch" href="${otherPath}" hreflang="${other.code}">${other.label}</a>
        <a class="btn btn--primary header-cta" href="${telLink()}">${icon('phone')}${t.cta.callShort}</a>
        <button class="nav-toggle" aria-label="Obrir menú" aria-expanded="false" data-menu-toggle>
          ${icon('menu', 'icon-menu')}
          ${icon('close', 'icon-close')}
        </button>
      </div>
    </div>
  </header>`;
}

// Fuera del <header>: el header tiene backdrop-filter, que crearía un containing block
// para un descendiente position:fixed y le rompería el alto (bug detectado en QA visual).
function mobileNavHtml(lang, slugForActive) {
  const t = UI[lang];
  return `<div class="mobile-nav" data-mobile-nav>
    ${mobileNavLinksHtml(lang, slugForActive)}
    <a class="btn btn--primary btn--block" href="${telLink()}">${icon('phone')}${t.cta.call}</a>
    <a class="btn btn--whatsapp btn--block" style="margin-top:12px" href="${waLink(lang === 'es' ? 'Hola, os escribo desde la web. ' : 'Hola, us escric des de la web. ')}">${icon('whatsapp')}${t.cta.whatsapp}</a>
  </div>`;
}

function footerHtml(lang, otherLangPath) {
  const t = UI[lang];
  const yr = new Date().getFullYear();
  const otherPath = otherLangPath || pagePath(UI[lang].otherLang.code);
  return `<footer class="site-footer" id="contacte-footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <div class="logo" style="margin-bottom:12px">
            ${logoSvg()}
            <span class="logo-word" style="color:#fff">Galeano <span>&amp;</span> Linares</span>
          </div>
          <p>${t.footer.madeWith}</p>
          <p class="mono-figure mono-figure--on-dark">${SITE.rating}★ · ${SITE.reviewCount} ${lang === 'es' ? 'reseñas' : 'opinions'}</p>
        </div>
        <div>
          <h3>${t.nav.services}</h3>
          <ul>${SERVICES.map((s) => `<li><a href="${pagePath(lang, s.slug)}">${s.name[lang]}</a></li>`).join('')}</ul>
        </div>
        <div>
          <h3>${t.footer.contactTitle}</h3>
          <ul>
            <li>${SITE.workshopAddress}</li>
            <li><a href="${telLink()}">${SITE.phoneDisplay}</a></li>
            <li><a href="${waLink(lang === 'es' ? 'Hola, os escribo desde la web. ' : 'Hola, us escric des de la web. ')}">WhatsApp</a></li>
          </ul>
          <h3 style="margin-top:20px">${t.footer.hoursTitle}</h3>
          <ul>${t.footer.hours.map((h) => `<li>${h}</li>`).join('')}</ul>
        </div>
        <div>
          <h3>${t.footer.legalTitle}</h3>
          <ul>
            <li><a href="${pagePath(lang, 'avis-legal')}">${t.footer.legalLinks.avisLegal}</a></li>
            <li><a href="${pagePath(lang, 'politica-de-privacitat')}">${t.footer.legalLinks.privacitat}</a></li>
            <li><a href="${pagePath(lang, 'politica-de-cookies')}">${t.footer.legalLinks.cookies}</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-trust">
        <span>${t.trustStrip.rating}</span>
        <span>${t.trustStrip.since}</span>
        <span>${t.trustStrip.founders}</span>
        <span>${t.trustStrip.area}</span>
      </div>
      <div class="footer-bottom">
        <span>© ${yr} Galeano &amp; Linares — Félix Galeano i Ramón Linares. ${t.footer.rights}</span>
        <a href="${otherPath}">${t.footer.langSwitch}</a>
      </div>
    </div>
  </footer>`;
}

function mobileBarHtml(lang) {
  const t = UI[lang];
  return `<div class="mobile-bar" role="navigation" aria-label="${lang === 'es' ? 'Contacto rápido' : 'Contacte ràpid'}">
    <a class="bar-call" href="${telLink()}">${icon('phone')}${t.cta.callShort}</a>
    <a class="bar-wa" href="${waLink(lang === 'es' ? 'Hola, os escribo desde la web. ' : 'Hola, us escric des de la web. ')}">${icon('whatsapp')}${t.cta.waShort}</a>
  </div>`;
}

function cookieBannerHtml(lang) {
  const isEs = lang === 'es';
  return `<div class="cookie-banner" data-cookie-banner>
    <p>${isEs ? 'Usamos únicamente cookies técnicas necesarias para el funcionamiento del sitio.' : 'Utilitzem únicament cookies tècniques necessàries per al funcionament del lloc.'} <a href="${pagePath(lang, 'politica-de-cookies')}">${isEs ? 'Política de cookies' : 'Política de cookies'}</a></p>
    <div class="cookie-actions">
      <button class="btn btn--primary" data-cookie-accept>${isEs ? 'Entendido' : 'Entesos'}</button>
    </div>
  </div>`;
}

function renderPage({ lang, slugForActive, title, description, canonicalPath, alternates, bodyHtml, jsonLdList, ogImage }) {
  const otherLang = UI[lang].otherLang.code;
  const otherAlt = (alternates || []).find((a) => a.hreflang === otherLang);
  const otherLangPath = otherAlt ? otherAlt.path : undefined;
  return `<!doctype html>
<html lang="${lang}">
<head>
${headHtml({ lang, title, description, canonicalPath, alternates, jsonLdList, ogImage })}
</head>
<body>
  <div class="cursor-glow" data-cursor-glow aria-hidden="true"></div>
  <a class="skip-link" href="#main">${UI[lang].skipToContent}</a>
  ${headerHtml(lang, slugForActive, otherLangPath)}
  ${mobileNavHtml(lang, slugForActive)}
  <main id="main">
    ${bodyHtml}
  </main>
  ${footerHtml(lang, otherLangPath)}
  ${mobileBarHtml(lang)}
  ${cookieBannerHtml(lang)}
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" defer></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" defer></script>
  <script src="/assets/scripts/main.js" defer></script>
</body>
</html>`;
}

module.exports = { renderPage, localBusinessSchemaForLang: localBusinessSchema };
