// Páginas de zona — brief §5: nunca plantilla intercambiable. Una frase real y específica
// por municipio (distancia/dirección aproximada real desde el taller de Mataró), nunca el
// mismo párrafo con el nombre canviat. Mataró (seu real) lleva contingut més extens.
const ZONES = {
  mataro: {
    isHQ: true,
    ca: {
      metaTitle: 'Lampista a Mataró · Galeano & Linares — Fontaneria i Calefacció des de 1988',
      metaDescription: 'Som de Mataró: taller al Carrer de les Caramelles, actius des de 1988. Fontaneria, calefacció, calderes i reformes amb pressupost clar.',
      title: 'El teu lampista a Mataró',
      intro: 'Mataró no és una zona més del mapa: és on tenim el taller, al Carrer de les Caramelles, i on portem gairebé quaranta anys treballant. Coneixem els edificis del centre, els xalets de l’Eixample i les instal·lacions de tota la vida de barris com Cerdanyola, Rocafonda o el Palau-Escorxador — perquè hi hem treballat, no perquè ho hàgim llegit enlloc.',
      extra: 'Si ens truques des de Mataró, normalment podem passar el mateix dia. És la nostra ciutat.',
    },
    es: {
      metaTitle: 'Fontanero en Mataró · Galeano & Linares — Fontanería y Calefacción desde 1988',
      metaDescription: 'Somos de Mataró: taller en el Carrer de les Caramelles, activos desde 1988. Fontanería, calefacción, calderas y reformas con presupuesto claro.',
      title: 'Tu lampista en Mataró',
      intro: 'Mataró no es una zona más del mapa: es donde tenemos el taller, en el Carrer de les Caramelles, y donde llevamos casi cuarenta años trabajando. Conocemos los edificios del centro, los chalets del Eixample y las instalaciones de toda la vida de barrios como Cerdanyola, Rocafonda o el Palau-Escorxador — porque hemos trabajado en ellos, no porque lo hayamos leído en ningún sitio.',
      extra: 'Si nos llamas desde Mataró, normalmente podemos pasar el mismo día. Es nuestra ciudad.',
    },
  },
  argentona: {
    distanceCa: 'a poc més de 5 minuts en cotxe des del nostre taller, cap a l’interior',
    distanceEs: 'a poco más de 5 minutos en coche desde nuestro taller, hacia el interior',
  },
  'cabrera-de-mar': {
    distanceCa: 'a uns 10 minuts en cotxe des de Mataró, seguint la costa cap al sud',
    distanceEs: 'a unos 10 minutos en coche desde Mataró, siguiendo la costa hacia el sur',
  },
  cabrils: {
    distanceCa: 'a uns 15 minuts en cotxe des del taller, cap a les serres del darrere de Vilassar',
    distanceEs: 'a unos 15 minutos en coche desde el taller, hacia las sierras detrás de Vilassar',
  },
  'vilassar-de-mar': {
    distanceCa: 'a uns 15 minuts en cotxe des de Mataró, per la costa',
    distanceEs: 'a unos 15 minutos en coche desde Mataró, por la costa',
  },
  'vilassar-de-dalt': {
    distanceCa: 'a uns 18 minuts en cotxe des del taller, a l’interior de Vilassar de Mar',
    distanceEs: 'a unos 18 minutos en coche desde el taller, en el interior de Vilassar de Mar',
  },
  'premia-de-mar': {
    distanceCa: 'a uns 20 minuts en cotxe des de Mataró, cap al sud del Maresme',
    distanceEs: 'a unos 20 minutos en coche desde Mataró, hacia el sur del Maresme',
  },
  'premia-de-dalt': {
    distanceCa: 'a uns 20 minuts en cotxe des del taller, tocant a Premià de Mar',
    distanceEs: 'a unos 20 minutos en coche desde el taller, junto a Premià de Mar',
  },
  'el-masnou': {
    distanceCa: 'a uns 25 minuts en cotxe des de Mataró, ja al límit sud del Maresme',
    distanceEs: 'a unos 25 minutos en coche desde Mataró, ya en el límite sur del Maresme',
  },
  'sant-andreu-de-llavaneres': {
    distanceCa: 'a escassos 5 minuts en cotxe des del taller, cap al nord per la costa',
    distanceEs: 'a escasos 5 minutos en coche desde el taller, hacia el norte por la costa',
  },
};

module.exports = { ZONES };
