const { SITE, TOWNS } = require('../content/shared');
const { absUrl } = require('./urls');

// schema.org/LocalBusiness — NAP idéntico en toda la web (brief §9)
function localBusinessSchema(lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Plumber',
    name: 'Galeano & Linares',
    alternateName: 'Galeano & Linares · Fontaneria i Calefacció',
    description: lang === 'es'
      ? 'Fontanería y calefacción en Mataró y el Maresme. Félix Galeano y Ramón Linares, desde 1988.'
      : 'Fontaneria i calefacció a Mataró i el Maresme. Félix Galeano i Ramón Linares, des de 1988.',
    image: absUrl('/assets/images/og-galeano-linares.jpg'),
    url: SITE.domain,
    telephone: SITE.phoneTel,
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Carrer de les Caramelles',
      addressLocality: 'Mataró',
      addressRegion: 'Barcelona',
      addressCountry: 'ES',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 41.5388, longitude: 2.4449 },
    areaServed: TOWNS.map((t) => ({ '@type': 'City', name: t.ca })),
    foundingDate: '1988',
    founders: [
      { '@type': 'Person', name: 'Félix Galeano' },
      { '@type': 'Person', name: 'Ramón Linares' },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: SITE.ratingValue,
      reviewCount: SITE.reviewCount,
      bestRating: '5',
    },
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '07:30', closes: '21:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday'], opens: '07:30', closes: '14:00' },
    ],
    sameAs: [SITE.googleReviewsUrl].filter(Boolean),
  };
}

function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: absUrl(it.path),
    })),
  };
}

function faqSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  };
}

module.exports = { localBusinessSchema, breadcrumbSchema, faqSchema };
