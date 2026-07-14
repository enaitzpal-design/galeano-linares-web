const fs = require('fs');
const path = require('path');

const { TOWNS, SERVICES, SITE } = require('./src/content/shared');
const { renderHome } = require('./src/templates/pages/home');
const { renderService } = require('./src/templates/pages/service');
const { renderZone } = require('./src/templates/pages/zone');
const { renderFaq } = require('./src/templates/pages/faq');
const { renderOpinions } = require('./src/templates/pages/opinions');
const { renderContact } = require('./src/templates/pages/contact');
const { renderLegal, DOCS } = require('./src/templates/pages/legal');
const { pagePath, zonePath, absUrl } = require('./src/lib/urls');

const DIST = path.join(__dirname, 'dist');
const LANGS = ['ca', 'es'];

function rmrf(p) {
  if (fs.existsSync(p)) fs.rmSync(p, { recursive: true, force: true });
}

function writeHtml(outPath, html) {
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, html, 'utf8');
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

const allPages = []; // { path, lang } para sitemap

function record(pth, lang) {
  allPages.push({ path: pth, lang });
}

function build() {
  console.log('-> Limpiando dist/ ...');
  rmrf(DIST);
  fs.mkdirSync(DIST, { recursive: true });

  console.log('-> Copiando assets estáticos ...');
  // main.css y fonts.css se inlinean en el <head> de cada página (ver src/templates/layout.js)
  // para evitar peticiones render-blocking; aquí solo se copian los binarios servidos aparte.
  copyDir(path.join(__dirname, 'src/scripts'), path.join(DIST, 'assets/scripts'));
  copyDir(path.join(__dirname, 'src/assets/images'), path.join(DIST, 'assets/images'));
  copyDir(path.join(__dirname, 'src/assets/fonts'), path.join(DIST, 'assets/fonts'));

  console.log('-> Generando home (ca/es) ...');
  for (const lang of LANGS) {
    const outPath = path.join(DIST, lang === 'es' ? 'es/index.html' : 'index.html');
    writeHtml(outPath, renderHome(lang));
    record(pagePath(lang), lang);
  }

  console.log('-> Generando páginas de servicio ...');
  for (const svc of SERVICES) {
    for (const lang of LANGS) {
      const outPath = path.join(DIST, lang === 'es' ? `es/${svc.slug}/index.html` : `${svc.slug}/index.html`);
      writeHtml(outPath, renderService(lang, svc.slug));
      record(pagePath(lang, svc.slug), lang);
    }
  }

  console.log('-> Generando páginas de zona ...');
  for (const town of TOWNS) {
    for (const lang of LANGS) {
      const outPath = path.join(DIST, lang === 'es' ? `es/zona/${town.slug}/index.html` : `zona/${town.slug}/index.html`);
      writeHtml(outPath, renderZone(lang, town.slug));
      record(zonePath(lang, town.slug), lang);
    }
  }

  console.log('-> Generando FAQ, opinions, contacto ...');
  for (const lang of LANGS) {
    writeHtml(path.join(DIST, lang === 'es' ? 'es/preguntes-frequents/index.html' : 'preguntes-frequents/index.html'), renderFaq(lang));
    record(pagePath(lang, 'preguntes-frequents'), lang);

    writeHtml(path.join(DIST, lang === 'es' ? 'es/opinions/index.html' : 'opinions/index.html'), renderOpinions(lang));
    record(pagePath(lang, 'opinions'), lang);

    writeHtml(path.join(DIST, lang === 'es' ? 'es/contacte/index.html' : 'contacte/index.html'), renderContact(lang));
    record(pagePath(lang, 'contacte'), lang);
  }

  console.log('-> Generando páginas legales ...');
  for (const slug of Object.keys(DOCS)) {
    for (const lang of LANGS) {
      const outPath = path.join(DIST, lang === 'es' ? `es/${slug}/index.html` : `${slug}/index.html`);
      writeHtml(outPath, renderLegal(lang, slug));
      record(pagePath(lang, slug), lang);
    }
  }

  console.log('-> Generando sitemap.xml y robots.txt ...');
  writeSitemap();
  writeRobots();

  console.log(`\nListo. ${allPages.length} páginas generadas en dist/.`);
}

function writeSitemap() {
  const urls = allPages.map((p) => {
    return `  <url>
    <loc>${absUrl(p.path)}</loc>
  </url>`;
  }).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
  fs.writeFileSync(path.join(DIST, 'sitemap.xml'), xml, 'utf8');
}

function writeRobots() {
  const txt = `User-agent: *
Allow: /

Sitemap: ${absUrl('/sitemap.xml')}
`;
  fs.writeFileSync(path.join(DIST, 'robots.txt'), txt, 'utf8');
}

build();
