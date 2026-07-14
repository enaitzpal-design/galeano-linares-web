const { SITE } = require('../../content/shared');
const { UI } = require('../../content/ui');
const { CONTACT } = require('../../content/contact');
const { renderPage } = require('../layout');
const { pagePath, waLink, telLink } = require('../../lib/urls');
const { icon } = require('../icons');
const { localBusinessSchema, breadcrumbSchema } = require('../../lib/schema');

function renderContact(lang) {
  const t = UI[lang];
  const c = CONTACT[lang];
  const isEs = lang === 'es';

  const bodyHtml = `
  <nav class="breadcrumb container" aria-label="Breadcrumb">
    <a href="${pagePath(lang)}">${t.nav.home}</a> / ${c.title}
  </nav>
  <section class="page-hero">
    <div class="container">
      <h1>${c.title}</h1>
      <p class="lede">${c.intro}</p>
    </div>
  </section>
  <section class="section">
    <div class="container">
      <div class="grid-2">
        <div>
          <h3>${isEs ? 'Directo' : 'Directe'}</h3>
          <p><strong>${icon('phone')} <a href="${telLink()}">${SITE.phoneDisplay}</a></strong></p>
          <p><a class="btn btn--whatsapp" href="${waLink(isEs ? 'Hola, os escribo desde la web. ' : 'Hola, us escric des de la web. ')}">${icon('whatsapp')}${t.cta.whatsapp}</a></p>
          <h3 style="margin-top:32px">${t.footer.addressTitle}</h3>
          <p>${icon('pin')} ${SITE.workshopAddress}</p>
          <h3 style="margin-top:32px">${t.footer.hoursTitle}</h3>
          <ul style="list-style:none;padding:0">${t.footer.hours.map((h) => `<li>${icon('clock')} ${h}</li>`).join('')}</ul>
        </div>
        <form class="form-card" data-wa-form data-wa-lang="${lang}">
          <div class="form-row">
            <label for="name">${t.form.name}</label>
            <input id="name" name="name" type="text" required autocomplete="name">
          </div>
          <div class="form-row">
            <label for="phone">${t.form.phone}</label>
            <input id="phone" name="phone" type="tel" required autocomplete="tel">
          </div>
          <div class="form-row">
            <label for="message">${t.form.message}</label>
            <textarea id="message" name="message" placeholder="${t.form.messagePlaceholder}" required></textarea>
          </div>
          <div class="form-honeypot" aria-hidden="true">
            <label for="company">Company</label>
            <input id="company" name="company" type="text" tabindex="-1" autocomplete="off">
          </div>
          <button class="btn btn--whatsapp btn--block" type="submit">${icon('whatsapp')}${t.form.submit}</button>
          <p class="form-note">${t.form.privacy} <a href="${pagePath(lang, 'politica-de-privacitat')}">${t.form.privacyLink}</a>.</p>
        </form>
      </div>
    </div>
  </section>
  `;

  return renderPage({
    lang,
    slugForActive: 'contacte',
    title: c.metaTitle,
    description: c.metaDescription,
    canonicalPath: pagePath(lang, 'contacte'),
    alternates: [
      { hreflang: 'ca', path: pagePath('ca', 'contacte') },
      { hreflang: 'es', path: pagePath('es', 'contacte') },
      { hreflang: 'x-default', path: pagePath('ca', 'contacte') },
    ],
    jsonLdList: [
      localBusinessSchema(lang),
      breadcrumbSchema([
        { name: t.nav.home, path: pagePath(lang) },
        { name: c.title, path: pagePath(lang, 'contacte') },
      ]),
    ],
    bodyHtml,
  });
}

module.exports = { renderContact };
