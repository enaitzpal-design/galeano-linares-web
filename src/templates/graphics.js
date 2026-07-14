const { icon } = require('./icons');

// Colage de tarjetas para el hero — sin fotos reales todavía (brief §4/§11.5), así que en
// vez de fingir una foto o usar un icono plano se construye un pequeño "mosaico de pruebas"
// con profundidad real (capas, rotación, grano, sombra cálida): datos verdaderos, no una
// imagen inventada. El panel de fondo cicla en solitario entre los cuatro oficios (agua,
// calor, obra, comunitats) — animado, pero siguen siendo gráficos propios, no fotos falsas.
const SLIDE_ICONS = ['drop', 'flame', 'wrench', 'building'];

function heroCollage({ rating, since, founders, lang }) {
  const isEs = lang === 'es';
  const initials = founders.map(avatarInitials);
  const slides = SLIDE_ICONS.map((name, i) => `
      <div class="hero-slide hero-slide--${i + 1}">${icon(name, 'hero-slide-icon')}</div>`).join('');
  return `<div class="hero-collage">
    <div class="hero-collage-backdrop">${slides}
    </div>
    <div class="hero-collage-card hero-collage-card--edge hero-collage-card--rating" data-reveal>
      <strong class="hero-card-figure">${rating}★</strong>
    </div>
    <div class="hero-collage-card hero-collage-card--edge hero-collage-card--since" data-reveal>
      <strong class="hero-card-figure">${since}</strong>
      <span class="hero-card-label">${isEs ? 'Desde' : 'Des de'}</span>
    </div>
    <div class="hero-collage-card hero-collage-card--people" data-reveal>
      <div class="hero-card-avatars">
        <span class="avatar-monogram avatar-monogram--sm">${initials[0]}</span>
        <span class="avatar-monogram avatar-monogram--sm">${initials[1]}</span>
      </div>
      <span class="hero-card-label">${founders[0].split(' ')[0]} ${isEs ? 'y' : 'i'} ${founders[1].split(' ')[0]}</span>
    </div>
  </div>`;
}

function avatarInitials(name) {
  const parts = name.trim().split(/\s+/);
  return (parts[0][0] + (parts[1] ? parts[1][0] : '')).toUpperCase();
}

module.exports = { heroCollage, avatarInitials };
