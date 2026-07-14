// Iconos SVG inline — trazo simple, coherente con el sistema visual (brief §4). Sin librerías externas.
const ICONS = {
  drop: '<path d="M12 2.5s7 8.2 7 13a7 7 0 1 1-14 0c0-4.8 7-13 7-13Z"/>',
  flame: '<path d="M12 2s3 3.5 3 7c1.2-.6 2-2 2-2s1 2.5 1 5a6 6 0 1 1-12 0c0-1.5.5-2.8 1.3-4 0 1 .7 1.8 1.7 1.8C9.6 6.8 12 5 12 2Z"/>',
  wrench: '<path d="M14.7 6.3a4 4 0 0 0-5.4 4.9L3 17.5 6.5 21l6.3-6.3a4 4 0 0 0 4.9-5.4l-2.8 2.8-2-2 2.8-2.8Z"/>',
  building: '<path d="M4 21V5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v16"/><path d="M13 21v-9a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v9"/><path d="M4 21h16"/><path d="M7 7h1M7 11h1M7 15h1M10 7h1M10 11h1M10 15h1"/>',
  phone: '<path d="M5 4h3l1.5 5-2 1.5a12 12 0 0 0 6 6l1.5-2 5 1.5v3a2 2 0 0 1-2 2c-9 0-16-7-16-16a2 2 0 0 1 2-2Z"/>',
  whatsapp: '<path d="M20 12a8 8 0 1 1-13.7-5.6L5 20l3.8-1.2A8 8 0 0 1 20 12Z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5.5 0 1-.3 1-.8v-.7c0-.3-.2-.5-.5-.6l-1.4-.4c-.3 0-.5 0-.7.2l-.3.4a4 4 0 0 1-2-2l.4-.3c.2-.2.3-.4.2-.7l-.4-1.4c0-.3-.3-.5-.6-.5H9.8c-.5 0-.8.5-.8 1Z" fill="currentColor" stroke="none"/>',
  star: '<path d="M12 3l2.6 5.6 6 .7-4.4 4.2 1.2 6-5.4-3-5.4 3 1.2-6L3.4 9.3l6-.7Z"/>',
  pin: '<path d="M12 21s7-6.5 7-11.5A7 7 0 1 0 5 9.5C5 14.5 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.3"/>',
  check: '<path d="M4 12l5 5L20 6"/>',
  chevron: '<path d="M9 6l6 6-6 6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/>',
};

function icon(name, extraClass) {
  const body = ICONS[name] || '';
  const cls = extraClass ? `icon ${extraClass}` : 'icon';
  return `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${body}</svg>`;
}

module.exports = { icon, ICONS };
