const { UI } = require('../../content/ui');
const { LEGAL } = require('../../content/legal');
const { renderPage } = require('../layout');
const { pagePath } = require('../../lib/urls');
const { localBusinessSchema, breadcrumbSchema } = require('../../lib/schema');

const DOCS = {
  'avis-legal': 'avisLegal',
  'politica-de-privacitat': 'privacitat',
  'politica-de-cookies': 'cookies',
};

function renderLegal(lang, slug) {
  const t = UI[lang];
  const doc = LEGAL[lang][DOCS[slug]];

  const bodyHtml = `
  <nav class="breadcrumb container" aria-label="Breadcrumb">
    <a href="${pagePath(lang)}">${t.nav.home}</a> / ${doc.title}
  </nav>
  <section class="page-hero">
    <div class="container">
      <h1>${doc.title}</h1>
      <p class="text-soft">${doc.updated}</p>
    </div>
  </section>
  <section class="section">
    <div class="container">
      <div class="legal-content">
        ${doc.sections.map((s) => `
        <h2>${s.h}</h2>
        ${s.p.map((para) => `<p>${para}</p>`).join('')}`).join('')}
      </div>
    </div>
  </section>
  `;

  return renderPage({
    lang,
    slugForActive: slug,
    title: doc.metaTitle,
    description: doc.title,
    canonicalPath: pagePath(lang, slug),
    alternates: [
      { hreflang: 'ca', path: pagePath('ca', slug) },
      { hreflang: 'es', path: pagePath('es', slug) },
      { hreflang: 'x-default', path: pagePath('ca', slug) },
    ],
    jsonLdList: [
      localBusinessSchema(lang),
      breadcrumbSchema([
        { name: t.nav.home, path: pagePath(lang) },
        { name: doc.title, path: pagePath(lang, slug) },
      ]),
    ],
    bodyHtml,
  });
}

module.exports = { renderLegal, DOCS };
