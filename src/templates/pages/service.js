const { SITE, SERVICES } = require('../../content/shared');
const { UI } = require('../../content/ui');
const { HOME } = require('../../content/home');
const { SERVICE_PAGES } = require('../../content/services');
const { FAQ } = require('../../content/faq');
const { renderPage } = require('../layout');
const { pagePath, waLink, telLink } = require('../../lib/urls');
const { icon } = require('../icons');
const { localBusinessSchema, faqSchema, breadcrumbSchema } = require('../../lib/schema');

function renderService(lang, slug) {
  const t = UI[lang];
  const svcMeta = SERVICES.find((s) => s.slug === slug);
  const svc = SERVICE_PAGES[slug][lang];
  const isEs = lang === 'es';
  const displayName = svcMeta.name[lang];
  const steps = HOME[lang].howWeWork.steps;
  const relatedFaqs = svc.faqs.map((id) => FAQ[lang].items.find((f) => f.id === id)).filter(Boolean);
  const otherServices = SERVICES.filter((s) => s.slug !== slug);

  const waMsg = isEs
    ? `Hola, os escribo desde la web por ${displayName}. `
    : `Hola, us escric des de la web per ${displayName}. `;

  const bodyHtml = `
  <nav class="breadcrumb container" aria-label="Breadcrumb">
    <a href="${pagePath(lang)}">${t.nav.home}</a> / ${displayName}
  </nav>
  <section class="page-hero">
    <div class="container">
      <span class="eyebrow">${displayName}</span>
      <h1>${svc.position}</h1>
      <p class="lede">${svc.intro}</p>
      <div class="hero-ctas">
        <a class="btn btn--primary" href="${telLink()}">${icon('phone')}${t.cta.call}</a>
        <a class="btn btn--whatsapp" href="${waLink(waMsg)}">${icon('whatsapp')}${t.cta.whatsapp}</a>
      </div>
    </div>
  </section>

  <section class="section section--alt">
    <div class="container">
      <div class="section-head">
        <h2>${svc.includes.title}</h2>
      </div>
      <ul class="includes-list">
        ${svc.includes.items.map((item) => `<li>${icon('check')}<span>${item}</span></li>`).join('')}
      </ul>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head section-head--center">
        <span class="eyebrow">${HOME[lang].howWeWork.eyebrow}</span>
        <h2>${HOME[lang].howWeWork.title}</h2>
      </div>
      <div class="steps">
        ${steps.map((s) => `
        <div class="step">
          <span class="step-num">${s.n}</span>
          <h3>${s.title}</h3>
          <p>${s.text}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>

  ${relatedFaqs.length ? `
  <section class="section section--alt">
    <div class="container">
      <div class="section-head section-head--center">
        <h2>${svc.faqTitle}</h2>
      </div>
      <div style="max-width:760px;margin:0 auto">
        ${relatedFaqs.map((f) => `
        <details class="faq-item">
          <summary>${f.q}</summary>
          <div class="faq-answer"><p>${f.a}</p></div>
        </details>`).join('')}
      </div>
    </div>
  </section>` : ''}

  <section class="section">
    <div class="container">
      <div class="section-head section-head--center">
        <h2>${isEs ? 'El resto del oficio' : 'La resta de l’ofici'}</h2>
      </div>
      <div class="grid-4">
        ${otherServices.map((s) => `
        <article class="card">
          <div class="icon-wrap">${icon(s.icon)}</div>
          <h3>${s.name[lang]}</h3>
          <p>${s.short[lang]}</p>
          <a class="card-link" href="${pagePath(lang, s.slug)}">${t.cta.viewService} ${icon('chevron')}</a>
        </article>`).join('')}
      </div>
    </div>
  </section>

  <section class="section section--alt">
    <div class="container text-center">
      <h2>${isEs ? '¿Empezamos?' : 'Comencem?'}</h2>
      <div class="hero-ctas" style="justify-content:center">
        <a class="btn btn--primary" href="${telLink()}">${icon('phone')}${t.cta.call}</a>
        <a class="btn btn--whatsapp" href="${waLink(waMsg)}">${icon('whatsapp')}${t.cta.whatsapp}</a>
      </div>
    </div>
  </section>
  `;

  return renderPage({
    lang,
    slugForActive: slug,
    title: svc.metaTitle,
    description: svc.metaDescription,
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
        { name: displayName, path: pagePath(lang, slug) },
      ]),
      ...(relatedFaqs.length ? [faqSchema(relatedFaqs)] : []),
    ],
    bodyHtml,
  });
}

module.exports = { renderService };
