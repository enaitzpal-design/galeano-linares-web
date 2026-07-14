// Datos duros de la empresa — usar siempre exactamente estos valores (brief §0)
const SITE = {
  domain: 'https://www.galeanolinares.cat', // provisional — compra de dominio pendiente, brief §11.1
  name: 'Galeano & Linares',
  shortName: 'G&L', // uso compacto: mobile, favicon, monograma
  legalTagline: 'Galeano & Linares · Fontaneria i Calefacció a Mataró',
  phoneDisplay: '685 51 85 36',
  phoneTel: '+34685518536',
  phoneWa: '34685518536',
  workshopAddress: 'Carrer de les Caramelles, Mataró (Maresme, Barcelona)',
  since: 1988,
  rating: '4,8',
  ratingValue: '4.8',
  reviewCount: 157,
  founders: ['Félix Galeano', 'Ramón Linares'],
  googleReviewsUrl: 'https://www.google.com/search?q=Galeano+%26+Linares+Fontaneria+Matar%C3%B3+opinions',
  instagram: '', // pendiente — handle de redes por decidir, brief §11.2
};

// Municipios del Maresme (brief §0 / §5)
const TOWNS = [
  { slug: 'mataro', ca: 'Mataró', es: 'Mataró', isHQ: true },
  { slug: 'argentona', ca: 'Argentona', es: 'Argentona' },
  { slug: 'cabrera-de-mar', ca: 'Cabrera de Mar', es: 'Cabrera de Mar' },
  { slug: 'cabrils', ca: 'Cabrils', es: 'Cabrils' },
  { slug: 'vilassar-de-mar', ca: 'Vilassar de Mar', es: 'Vilassar de Mar' },
  { slug: 'vilassar-de-dalt', ca: 'Vilassar de Dalt', es: 'Vilassar de Dalt' },
  { slug: 'premia-de-mar', ca: 'Premià de Mar', es: 'Premià de Mar' },
  { slug: 'premia-de-dalt', ca: 'Premià de Dalt', es: 'Premià de Dalt' },
  { slug: 'el-masnou', ca: 'El Masnou', es: 'El Masnou' },
  { slug: 'sant-andreu-de-llavaneres', ca: 'Sant Andreu de Llavaneres', es: 'Sant Andreu de Llavaneres' },
];

// Los 4 servicios — nombres descriptivos, sin prefijo de marca (brief §2.1, cerrado)
const SERVICES = [
  {
    slug: 'fontaneria',
    name: { ca: 'Fontaneria', es: 'Fontanería' },
    icon: 'drop',
    short: { ca: 'Fuites, aixetes, desguassos i embussos. Localitzem l’avaria sense picar de més.', es: 'Fugas, grifos, desagües y atascos. Localizamos la avería sin picar de más.' },
  },
  {
    slug: 'calefaccio-calderes',
    name: { ca: 'Calefacció i Calderes', es: 'Calefacción y Calderas' },
    icon: 'flame',
    short: { ca: 'Calderes de totes les marques, radiadors, aigua calenta. Posada a punt abans de l’hivern.', es: 'Calderas de todas las marcas, radiadores, agua caliente. Puesta a punto antes del invierno.' },
  },
  {
    slug: 'reformes-instalacions',
    name: { ca: 'Reformes i Instal·lacions', es: 'Reformas e Instalaciones' },
    icon: 'wrench',
    short: { ca: 'Reformes de bany i cuina, instal·lacions noves, canvis de canonada.', es: 'Reformas de baño y cocina, instalaciones nuevas, cambios de tubería.' },
  },
  {
    slug: 'comunitats',
    name: { ca: 'Comunitats de Veïns', es: 'Comunidades de Vecinos' },
    icon: 'building',
    short: { ca: 'Manteniment per a finques i administradors. Avaries recurrents resoltes ràpid.', es: 'Mantenimiento para fincas y administradores. Averías recurrentes resueltas rápido.' },
  },
];

module.exports = { SITE, TOWNS, SERVICES };
