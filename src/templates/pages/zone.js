const { SITE, TOWNS, SERVICES } = require('../../content/shared');
const { UI } = require('../../content/ui');
const { ZONES } = require('../../content/zones');
const { renderPage } = require('../layout');
const { pagePath, zonePath, waLink, telLink } = require('../../lib/urls');
const { icon } = require('../icons');
const { localBusinessSchema, breadcrumbSchema } = require('../../lib/schema');

function renderZone(lang, townSlug) {
  const t = UI[lang];
  const town = TOWNS.find((tw) => tw.slug === townSlug);
  const zone = ZONES[townSlug];
  const isEs = lang === 'es';
  const townName = town[lang];
  const otherTowns = TOWNS.filter((tw) => tw.slug !== townSlug);

  const title = zone.isHQ
    ? zone[lang].title
    : (isEs ? `Fontanero en ${townName} · Galeano & Linares (Mataró)` : `Lampista a ${townName} · Galeano & Linares (Mataró)`);
  const metaTitle = zone.isHQ
    ? zone[lang].metaTitle
    : (isEs
      ? `Fontanería y calefacción en ${townName} · Galeano & Linares Mataró`
      : `Fontaneria i calefacció a ${townName} · Galeano & Linares Mataró`);
  const metaDescription = zone.isHQ
    ? zone[lang].metaDescription
    : (isEs
      ? `Galeano & Linares atiende ${townName} desde su taller en Mataró: fontanería, calderas, calefacción y reformas con presupuesto claro antes de empezar.`
      : `Galeano & Linares atén ${townName} des del seu taller a Mataró: fontaneria, calderes, calefacció i reformes amb pressupost clar abans de començar.`);

  const intro = zone.isHQ
    ? zone[lang].intro
    : (isEs
      ? `${townName} está ${zone.distanceEs}. Desde nuestro taller en el Carrer de les Caramelles de Mataró, atendemos ${townName} con el mismo trato directo, el mismo teléfono y el mismo presupuesto claro que en Mataró: nada de tarifas distintas por código postal.`
      : `${townName} és ${zone.distanceCa}. Des del nostre taller al Carrer de les Caramelles de Mataró, atenem ${townName} amb el mateix tracte directe, el mateix telèfon i el mateix pressupost clar que a Mataró: res de tarifes diferents per codi postal.`);

  const waMsg = isEs
    ? `Hola, os escribo desde la web, estoy en ${townName}. `
    : `Hola, us escric des de la web, sóc a ${townName}. `;

  const bodyHtml = `
  <nav class="breadcrumb container" aria-label="Breadcrumb">
    <a href="${pagePath(lang)}">${t.nav.home}</a> / ${t.nav.zona} / ${townName}
  </nav>
  <section class="page-hero">
    <div class="container">
      <span class="eyebrow">${t.trustStrip.rating}</span>
      <h1>${title.replace(townName, `<span class="accent-word">${townName}</span>`)}</h1>
      <p class="lede">${intro}</p>
      ${zone.isHQ && zone[lang].extra ? `<p class="lede">${zone[lang].extra}</p>` : ''}
      <div class="hero-ctas">
        <a class="btn btn--primary" href="${telLink()}">${icon('phone')}${t.cta.call}</a>
        <a class="btn btn--whatsapp" href="${waLink(waMsg)}">${icon('whatsapp')}${t.cta.whatsapp}</a>
      </div>
    </div>
  </section>

  <section class="section section--alt">
    <div class="container">
      <div class="section-head section-head--center">
        <h2>${isEs ? 'El oficio completo' : 'L’ofici sencer'}</h2>
      </div>
      <div class="grid-4">
        ${SERVICES.map((s) => `
        <article class="card">
          <div class="icon-wrap">${icon(s.icon)}</div>
          <h3>${s.name[lang]}</h3>
          <p>${s.short[lang]}</p>
          <a class="card-link" href="${pagePath(lang, s.slug)}">${t.cta.viewService} ${icon('chevron')}</a>
        </article>`).join('')}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-head section-head--center">
        <h2>${isEs ? 'También en el resto del Maresme' : 'També a la resta del Maresme'}</h2>
      </div>
      <ul class="town-list" style="justify-content:center">
        ${otherTowns.map((tw) => `<li><a class="town-pill" href="${zonePath(lang, tw.slug)}">${icon('pin')}${tw[lang]}</a></li>`).join('')}
      </ul>
    </div>
  </section>

  <section class="section section--alt">
    <div class="container text-center">
      <h2>${isEs ? `¿Tienes una avería en ${townName}?` : `Tens una avaria a ${townName}?`}</h2>
      <div class="hero-ctas" style="justify-content:center">
        <a class="btn btn--primary" href="${telLink()}">${icon('phone')}${t.cta.call}</a>
        <a class="btn btn--whatsapp" href="${waLink(waMsg)}">${icon('whatsapp')}${t.cta.whatsapp}</a>
      </div>
    </div>
  </section>
  `;

  return renderPage({
    lang,
    slugForActive: 'zona',
    title: metaTitle,
    description: metaDescription,
    canonicalPath: zonePath(lang, townSlug),
    alternates: [
      { hreflang: 'ca', path: zonePath('ca', townSlug) },
      { hreflang: 'es', path: zonePath('es', townSlug) },
      { hreflang: 'x-default', path: zonePath('ca', townSlug) },
    ],
    jsonLdList: [
      localBusinessSchema(lang),
      breadcrumbSchema([
        { name: t.nav.home, path: pagePath(lang) },
        { name: townName, path: zonePath(lang, townSlug) },
      ]),
    ],
    bodyHtml,
  });
}

module.exports = { renderZone };
