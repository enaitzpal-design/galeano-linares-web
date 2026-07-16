// Colage de tarjetas para el hero: el panel de fondo cicla en solitario entre cuatro fotos
// reales de oficio (agua, calor, obra, comunitats) que aportó el cliente — recortadas a
// cuadrado y comprimidas (scripts/process-hero-photos.js). Encima, un par de tarjetas con
// datos verdaderos (valoración, año, las personas) en vez de texto sobre la foto.
const SLIDE_PHOTOS = [
  { file: 'hero-agua.jpg', alt: 'Canonades i vàlvules de fontaneria' },
  { file: 'hero-calor.jpg', alt: 'Radiador de calefacció' },
  { file: 'hero-obra.jpg', alt: 'Eines de lampista per a reformes' },
  { file: 'hero-comunitats.jpg', alt: 'Instal·lacions d’un edifici de comunitat de veïns' },
];

function heroCollage({ rating, since, founders, lang }) {
  const isEs = lang === 'es';
  const initials = founders.map(avatarInitials);
  const slides = SLIDE_PHOTOS.map((p, i) => `
      <div class="hero-slide hero-slide--${i + 1}"><img src="/assets/images/hero/${p.file}" alt="${p.alt}" loading="${i === 0 ? 'eager' : 'lazy'}" width="960" height="960"></div>`).join('');
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
