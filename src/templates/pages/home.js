const { SITE, TOWNS, SERVICES } = require('../../content/shared');
const { UI } = require('../../content/ui');
const { HOME } = require('../../content/home');
const { FAQ } = require('../../content/faq');
const { renderPage } = require('../layout');
const { pagePath, zonePath, waLink, telLink } = require('../../lib/urls');
const { icon, starRating } = require('../icons');
const { heroCollage, avatarInitials } = require('../graphics');
const { localBusinessSchema, faqSchema } = require('../../lib/schema');

function renderHome(lang) {
  const t = UI[lang];
  const h = HOME[lang];
  const faqShort = FAQ[lang].items.slice(0, 4);
  const isEs = lang === 'es';

  const bodyHtml = `
  <section class="hero">
    <canvas class="hero-particles" data-hero-particles aria-hidden="true"></canvas>
    <div class="container">
      <div>
        <span class="eyebrow">${h.hero.eyebrow}</span>
        <h1>${h.hero.h1.replace('Mataró', '<span class="accent-word">Mataró</span>')}</h1>
        <p class="hero-subtitle">${h.hero.subtitle}</p>
        <div class="hero-ctas">
          <a class="btn btn--primary" href="${telLink()}">${icon('phone')}${h.hero.ctaCall}</a>
          <a class="btn btn--whatsapp" href="${waLink(isEs ? 'Hola, os escribo desde la web. ' : 'Hola, us escric des de la web. ')}">${icon('whatsapp')}${h.hero.ctaWhatsapp}</a>
        </div>
      </div>
      <div class="hero-visual">${heroCollage({ rating: SITE.rating, since: SITE.since, founders: SITE.founders, lang })}</div>
    </div>
  </section>

  <section class="trust-strip">
    <div class="container">
      <div class="trust-grid">
        <div class="trust-item"><span class="num" data-counter data-count-to="4.8" data-suffix="★">4,8★</span><span class="label">${SITE.reviewCountDisplay} ${isEs ? 'reseñas de Google' : 'opinions de Google'}</span></div>
        <div class="trust-item"><span class="num" data-counter data-count-to="1988" data-format="plain">1988</span><span class="label">${isEs ? 'Desde' : 'Des de'}</span></div>
        <div class="trust-item"><span class="num" style="font-size:var(--fs-24)">${SITE.founders[0]}<br>${SITE.founders[1]}</span><span class="label">${isEs ? 'Los que cogen el teléfono' : 'Els que agafen el telèfon'}</span></div>
        <div class="trust-item"><span class="num" style="font-size:var(--fs-24)">${t.trustStrip.area}</span><span class="label">${isEs ? 'Zona de servicio' : 'Zona de servei'}</span></div>
      </div>
    </div>
  </section>

  <section class="section section-glow section-glow--tr" id="serveis">
    <div class="container">
      <div class="section-head section-head--center">
        <span class="eyebrow">${h.services.eyebrow}</span>
        <h2>${h.services.title}</h2>
      </div>
      <div class="grid-4" data-reveal-group>
        ${SERVICES.map((s) => `
        <article class="card" data-reveal>
          <div class="icon-wrap">${icon(s.icon)}</div>
          <h3>${s.name[lang]}</h3>
          <p>${s.short[lang]}</p>
          <a class="card-link" href="${pagePath(lang, s.slug)}">${t.cta.viewService} ${icon('chevron')}</a>
        </article>`).join('')}
      </div>
    </div>
  </section>

  <section class="section section--alt">
    <div class="container">
      <div class="section-head section-head--center">
        <span class="eyebrow">${h.reviews.eyebrow}</span>
        <h2>${h.reviews.title}</h2>
      </div>
      <div class="review-card" data-reveal>
        <div class="review-stars">${starRating(parseFloat(SITE.ratingValue))}<span class="review-stars-figure">${SITE.rating} / 5</span></div>
        <p>${h.reviews.text}</p>
        <a class="btn btn--primary" href="${SITE.googleReviewsUrl}" target="_blank" rel="noopener">${h.reviews.cta}</a>
      </div>
    </div>
  </section>

  <section class="section section-glow section-glow--bl">
    <div class="container">
      <div class="section-head section-head--center">
        <span class="eyebrow">${h.howWeWork.eyebrow}</span>
        <h2>${h.howWeWork.title}</h2>
      </div>
      <div class="steps" data-reveal-group>
        ${h.howWeWork.steps.map((s) => `
        <div class="step" data-reveal>
          <span class="step-num">${s.n}</span>
          <h3>${s.title}</h3>
          <p>${s.text}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>

  <section class="section section--alt">
    <div class="container">
      <div class="people-block" data-reveal>
        <div class="avatars">
          <span class="avatar-monogram avatar-monogram--lg">${avatarInitials(SITE.founders[0])}</span>
          <span class="avatar-monogram avatar-monogram--lg">${avatarInitials(SITE.founders[1])}</span>
        </div>
        <div>
          <span class="eyebrow">${h.people.eyebrow}</span>
          <h2>${h.people.title}</h2>
          <p>${h.people.text}</p>
          <p class="people-quote">${h.people.quote}</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section section-glow section-glow--tl" id="zona">
    <div class="container">
      <div class="section-head section-head--center">
        <span class="eyebrow">${h.zone.eyebrow}</span>
        <h2>${h.zone.title}</h2>
        <p class="text-center">${h.zone.text}</p>
      </div>
      <ul class="town-list" style="justify-content:center" data-reveal-group>
        ${TOWNS.map((town) => `<li data-reveal><a class="town-pill" href="${zonePath(lang, town.slug)}">${icon('pin')}${town[lang]}</a></li>`).join('')}
      </ul>
    </div>
  </section>

  <section class="section section--alt section-glow section-glow--tr" id="faq">
    <div class="container">
      <div class="section-head section-head--center">
        <span class="eyebrow">${h.faqShort.eyebrow}</span>
        <h2>${h.faqShort.title}</h2>
      </div>
      <div style="max-width:760px;margin:0 auto">
        ${faqShort.map((f, i) => `
        <details class="faq-item"${i === 0 ? ' open' : ''}>
          <summary>${f.q}</summary>
          <div class="faq-answer"><p>${f.a}</p></div>
        </details>`).join('')}
      </div>
      <p class="text-center" style="margin-top:24px"><a href="${pagePath(lang, 'preguntes-frequents')}">${h.faqShort.linkAll} ${icon('chevron')}</a></p>
    </div>
  </section>

  <section class="section" id="contacte">
    <div class="container">
      <div class="grid-2">
        <div>
          <span class="eyebrow">${h.contactSection.eyebrow}</span>
          <h2>${h.contactSection.title}</h2>
          <p>${h.contactSection.text}</p>
          <p><strong>${icon('phone')} <a href="${telLink()}">${SITE.phoneDisplay}</a></strong></p>
          <p>${icon('pin')} ${SITE.workshopAddress}</p>
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
    slugForActive: '',
    title: h.metaTitle,
    description: h.metaDescription,
    canonicalPath: pagePath(lang),
    alternates: [
      { hreflang: 'ca', path: pagePath('ca') },
      { hreflang: 'es', path: pagePath('es') },
      { hreflang: 'x-default', path: pagePath('ca') },
    ],
    jsonLdList: [localBusinessSchema(lang), faqSchema(faqShort)],
    bodyHtml,
  });
}

module.exports = { renderHome };
