const { SITE } = require('../../content/shared');
const { UI } = require('../../content/ui');
const { OPINIONS } = require('../../content/opinions');
const { renderPage } = require('../layout');
const { pagePath, telLink } = require('../../lib/urls');
const { starRating } = require('../icons');
const { localBusinessSchema, breadcrumbSchema } = require('../../lib/schema');

function renderOpinions(lang) {
  const t = UI[lang];
  const o = OPINIONS[lang];

  const bodyHtml = `
  <nav class="breadcrumb container" aria-label="Breadcrumb">
    <a href="${pagePath(lang)}">${t.nav.home}</a> / ${o.title}
  </nav>
  <section class="page-hero text-center">
    <div class="container">
      <h1>${o.title}</h1>
      <p class="lede" style="margin-inline:auto">${o.intro}</p>
    </div>
  </section>
  <section class="section">
    <div class="container">
      <div class="review-card" data-reveal>
        <div class="review-stars">${starRating(parseFloat(SITE.ratingValue))}<span class="review-stars-figure">${SITE.rating} / 5</span></div>
        <p>${SITE.reviewCount} ${lang === 'es' ? 'reseñas verificables en Google Business' : 'opinions verificables a Google Business'}</p>
        <a class="btn btn--primary" href="${SITE.googleReviewsUrl}" target="_blank" rel="noopener">${o.ctaBig}</a>
      </div>
    </div>
  </section>
  <section class="section section--alt">
    <div class="container">
      <div class="section-head section-head--center">
        <p style="max-width:640px;margin:0 auto;font-style:italic">${o.honestyNote}</p>
      </div>
    </div>
  </section>
  `;

  return renderPage({
    lang,
    slugForActive: 'opinions',
    title: o.metaTitle,
    description: o.metaDescription,
    canonicalPath: pagePath(lang, 'opinions'),
    alternates: [
      { hreflang: 'ca', path: pagePath('ca', 'opinions') },
      { hreflang: 'es', path: pagePath('es', 'opinions') },
      { hreflang: 'x-default', path: pagePath('ca', 'opinions') },
    ],
    jsonLdList: [
      localBusinessSchema(lang),
      breadcrumbSchema([
        { name: t.nav.home, path: pagePath(lang) },
        { name: o.title, path: pagePath(lang, 'opinions') },
      ]),
    ],
    bodyHtml,
  });
}

module.exports = { renderOpinions };
