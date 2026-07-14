const { UI } = require('../../content/ui');
const { FAQ } = require('../../content/faq');
const { renderPage } = require('../layout');
const { pagePath, waLink, telLink } = require('../../lib/urls');
const { icon } = require('../icons');
const { localBusinessSchema, faqSchema, breadcrumbSchema } = require('../../lib/schema');

function renderFaq(lang) {
  const t = UI[lang];
  const f = FAQ[lang];
  const isEs = lang === 'es';

  const bodyHtml = `
  <nav class="breadcrumb container" aria-label="Breadcrumb">
    <a href="${pagePath(lang)}">${t.nav.home}</a> / ${f.title}
  </nav>
  <section class="page-hero">
    <div class="container">
      <h1>${f.title}</h1>
      <p class="lede">${f.intro}</p>
    </div>
  </section>
  <section class="section">
    <div class="container">
      <div style="max-width:760px;margin:0 auto">
        ${f.items.map((item, i) => `
        <details class="faq-item"${i === 0 ? ' open' : ''}>
          <summary>${item.q}</summary>
          <div class="faq-answer"><p>${item.a}</p></div>
        </details>`).join('')}
      </div>
    </div>
  </section>
  <section class="section section--alt">
    <div class="container text-center">
      <h2>${isEs ? '¿No has encontrado tu duda?' : 'No has trobat el teu dubte?'}</h2>
      <div class="hero-ctas" style="justify-content:center">
        <a class="btn btn--primary" href="${telLink()}">${icon('phone')}${t.cta.call}</a>
        <a class="btn btn--whatsapp" href="${waLink(isEs ? 'Hola, os escribo desde la web. ' : 'Hola, us escric des de la web. ')}">${icon('whatsapp')}${t.cta.whatsapp}</a>
      </div>
    </div>
  </section>
  `;

  return renderPage({
    lang,
    slugForActive: 'preguntes-frequents',
    title: f.metaTitle,
    description: f.metaDescription,
    canonicalPath: pagePath(lang, 'preguntes-frequents'),
    alternates: [
      { hreflang: 'ca', path: pagePath('ca', 'preguntes-frequents') },
      { hreflang: 'es', path: pagePath('es', 'preguntes-frequents') },
      { hreflang: 'x-default', path: pagePath('ca', 'preguntes-frequents') },
    ],
    jsonLdList: [
      localBusinessSchema(lang),
      faqSchema(f.items),
      breadcrumbSchema([
        { name: t.nav.home, path: pagePath(lang) },
        { name: f.title, path: pagePath(lang, 'preguntes-frequents') },
      ]),
    ],
    bodyHtml,
  });
}

module.exports = { renderFaq };
