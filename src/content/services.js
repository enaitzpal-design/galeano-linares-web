// Páginas de servicio — patrón común (brief §7). Comunidades de vecinos con más profundidad
// y registro más formal.
const SERVICE_PAGES = {
  fontaneria: {
    icon: 'drop',
    ca: {
      metaTitle: 'Fontaneria a Mataró · Galeano & Linares — fuites, aixetes i desguassos',
      metaDescription: 'Fuites, aixetes, desguassos i embussos a Mataró i el Maresme. Localitzem l’avaria sense picar de més i et diem el preu abans de començar.',
      position: 'Fuites, aixetes, desguassos i embussos. Ho mirem abans de destrossar res.',
      intro: 'Una fuita no avisa i sol arribar en mal moment. El primer que fem sempre és intentar localitzar-la amb el mínim destrossa possible, abans de plantejar cap obra. Si finalment cal obrir, t’ho expliquem i et diem el preu abans de tocar res.',
      includes: {
        title: 'Què inclou',
        items: [
          'Localització i reparació de fuites, amb el mínim destrossa possible',
          'Aixetes, mescladors i sifons: canvi i reparació',
          'Desguassos i embussos de cuina, bany i baixants',
          'Canvis de canonada (plom o ferro per coure o multicapa)',
          'Grups de pressió, cisternes i clau de pas',
          'Avaries de tota la vida: si no ho havies vist mai, segur que nosaltres sí',
        ],
      },
      faqTitle: 'Sobre fuites i embussos',
      faqs: ['fuga', 'precio'],
    },
    es: {
      metaTitle: 'Fontanería en Mataró · Galeano & Linares — fugas, grifos y desagües',
      metaDescription: 'Fugas, grifos, desagües y atascos en Mataró y el Maresme. Localizamos la avería sin picar de más y te decimos el precio antes de empezar.',
      position: 'Fugas, grifos, desagües y atascos. Lo miramos antes de destrozar nada.',
      intro: 'Una fuga no avisa y suele llegar en mal momento. Lo primero que hacemos siempre es intentar localizarla con el mínimo destrozo posible, antes de plantear ninguna obra. Si finalmente hay que abrir, te lo explicamos y te decimos el precio antes de tocar nada.',
      includes: {
        title: 'Qué incluye',
        items: [
          'Localización y reparación de fugas, con el mínimo destrozo posible',
          'Grifos, mezcladores y sifones: cambio y reparación',
          'Desagües y atascos de cocina, baño y bajantes',
          'Cambios de tubería (plomo o hierro por cobre o multicapa)',
          'Grupos de presión, cisternas y llave de paso',
          'Averías de toda la vida: si no lo habías visto nunca, seguro que nosotros sí',
        ],
      },
      faqTitle: 'Sobre fugas y atascos',
      faqs: ['fuga', 'precio'],
    },
  },
  'calefaccio-calderes': {
    icon: 'flame',
    ca: {
      metaTitle: 'Calefacció i calderes a Mataró · Galeano & Linares',
      metaDescription: 'Calderes de totes les marques, radiadors i aigua calenta a Mataró i el Maresme. Posada a punt abans de l’hivern, avaries resoltes amb pressupost clar.',
      position: 'Calderes, radiadors i aigua calenta. Posada a punt abans que arribi el fred.',
      intro: 'Quan la caldera falla a l’hivern no hi ha temps a perdre. Treballem amb les marques habituals i, si tens dubtes sobre la teva, ens ho dius per telèfon i t’ho confirmem abans d’anar-hi.',
      includes: {
        title: 'Què inclou',
        items: [
          'Reparació i manteniment de calderes de totes les marques habituals',
          'Posada a punt abans de l’hivern',
          'Radiadors: purgat, canvi i noves instal·lacions',
          'Termos elèctrics i acumuladors d’aigua calenta',
          'Petites instal·lacions i canvis de calefacció',
          'Diagnòstic clar: si la caldera es pot arreglar o toca canviar-la, t’ho diem sense embuts',
        ],
      },
      faqTitle: 'Sobre calderes i calefacció',
      faqs: ['marca-caldera', 'venis-hoy'],
    },
    es: {
      metaTitle: 'Calefacción y calderas en Mataró · Galeano & Linares',
      metaDescription: 'Calderas de todas las marcas, radiadores y agua caliente en Mataró y el Maresme. Puesta a punto antes del invierno, averías resueltas con presupuesto claro.',
      position: 'Calderas, radiadores y agua caliente. Puesta a punto antes de que llegue el frío.',
      intro: 'Cuando la caldera falla en invierno no hay tiempo que perder. Trabajamos con las marcas habituales y, si tienes dudas sobre la tuya, nos lo dices por teléfono y te lo confirmamos antes de ir.',
      includes: {
        title: 'Qué incluye',
        items: [
          'Reparación y mantenimiento de calderas de todas las marcas habituales',
          'Puesta a punto antes del invierno',
          'Radiadores: purgado, cambio y nuevas instalaciones',
          'Termos eléctricos y acumuladores de agua caliente',
          'Pequeñas instalaciones y cambios de calefacción',
          'Diagnóstico claro: si la caldera se puede arreglar o toca cambiarla, te lo decimos sin rodeos',
        ],
      },
      faqTitle: 'Sobre calderas y calefacción',
      faqs: ['marca-caldera', 'venis-hoy'],
    },
  },
  'reformes-instalacions': {
    icon: 'wrench',
    ca: {
      metaTitle: 'Reformes i instal·lacions a Mataró · Galeano & Linares',
      metaDescription: 'Reformes de bany i cuina, instal·lacions noves i canvis de canonada a Mataró i el Maresme. Pressupost clar abans de començar l’obra.',
      position: 'Reformes de bany i cuina, instal·lacions noves i canvis de canonada.',
      intro: 'Una reforma de bany o cuina implica decisions: on va cada canonada, quin material, quin ordre de feina. Ho planifiquem amb tu abans de començar i et donem un pressupost clar de tota l’obra, no per peces soltes.',
      includes: {
        title: 'Què inclou',
        items: [
          'Reforma integral de bany i cuina (part de fontaneria i calefacció)',
          'Instal·lacions noves d’aigua i calefacció',
          'Canvis complets de canonada antiga (plom, ferro) per coure o multicapa',
          'Instal·lació de plats de dutxa, banyeres i sanitaris',
          'Coordinació amb altres oficis de l’obra si cal',
          'Pressupost tancat abans de començar, sense sorpreses a mitja obra',
        ],
      },
      faqTitle: 'Sobre reformes',
      faqs: ['precio', 'garantia'],
    },
    es: {
      metaTitle: 'Reformas e instalaciones en Mataró · Galeano & Linares',
      metaDescription: 'Reformas de baño y cocina, instalaciones nuevas y cambios de tubería en Mataró y el Maresme. Presupuesto claro antes de empezar la obra.',
      position: 'Reformas de baño y cocina, instalaciones nuevas y cambios de tubería.',
      intro: 'Una reforma de baño o cocina implica decisiones: por dónde va cada tubería, qué material, en qué orden se hace el trabajo. Lo planificamos contigo antes de empezar y te damos un presupuesto claro de toda la obra, no por piezas sueltas.',
      includes: {
        title: 'Qué incluye',
        items: [
          'Reforma integral de baño y cocina (parte de fontanería y calefacción)',
          'Instalaciones nuevas de agua y calefacción',
          'Cambios completos de tubería antigua (plomo, hierro) por cobre o multicapa',
          'Instalación de platos de ducha, bañeras y sanitarios',
          'Coordinación con otros oficios de la obra si hace falta',
          'Presupuesto cerrado antes de empezar, sin sorpresas a media obra',
        ],
      },
      faqTitle: 'Sobre reformas',
      faqs: ['precio', 'garantia'],
    },
  },
  comunitats: {
    icon: 'building',
    ca: {
      metaTitle: 'Comunitats de veïns a Mataró · Galeano & Linares',
      metaDescription: 'Manteniment de fontaneria i calefacció per a comunitats de veïns i administradors de finques a Mataró i el Maresme. Dècades de tracte directe.',
      position: 'Manteniment de fontaneria i calefacció per a comunitats de veïns i administradors de finques.',
      intro: 'Des de fa dècades treballem amb comunitats de veïns i administradors de finques de Mataró i el Maresme. És una part important de la nostra feina de sempre: avaries recurrents, manteniment programat i un interlocutor directe que coneix l’edifici, no un tècnic diferent cada vegada.',
      includes: {
        title: 'Què oferim a comunitats i administradors',
        items: [
          'Manteniment preventiu de les instal·lacions comunitàries d’aigua i calefacció',
          'Resposta ràpida a avaries recurrents (fuites en baixants, calderes centralitzades, grups de pressió)',
          'Un mateix contacte directe per a tota la finca, sense canvis de tècnic',
          'Pressupostos clars per a la junta, abans d’intervenir',
          'Factura i justificant per a cada actuació, tal com necessita l’administració de la finca',
          'Dècades de tracte amb finques de Mataró: coneixem els edificis antics del barri i les seves instal·lacions',
        ],
      },
      faqTitle: 'Per a administradors i comunitats',
      faqs: ['garantia', 'venis-hoy'],
    },
    es: {
      metaTitle: 'Comunidades de vecinos en Mataró · Galeano & Linares',
      metaDescription: 'Mantenimiento de fontanería y calefacción para comunidades de vecinos y administradores de fincas en Mataró y el Maresme. Décadas de trato directo.',
      position: 'Mantenimiento de fontanería y calefacción para comunidades de vecinos y administradores de fincas.',
      intro: 'Desde hace décadas trabajamos con comunidades de vecinos y administradores de fincas de Mataró y el Maresme. Es una parte importante de nuestro oficio de siempre: averías recurrentes, mantenimiento programado y un interlocutor directo que conoce el edificio, no un técnico distinto cada vez.',
      includes: {
        title: 'Qué ofrecemos a comunidades y administradores',
        items: [
          'Mantenimiento preventivo de las instalaciones comunitarias de agua y calefacción',
          'Respuesta rápida a averías recurrentes (fugas en bajantes, calderas centralizadas, grupos de presión)',
          'Un mismo contacto directo para toda la finca, sin cambios de técnico',
          'Presupuestos claros para la junta, antes de intervenir',
          'Factura y justificante para cada actuación, tal como necesita la administración de la finca',
          'Décadas de trato con fincas de Mataró: conocemos los edificios antiguos del barrio y sus instalaciones',
        ],
      },
      faqTitle: 'Para administradores y comunidades',
      faqs: ['garantia', 'venis-hoy'],
    },
  },
};

module.exports = { SERVICE_PAGES };
