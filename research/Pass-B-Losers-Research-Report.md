# Research Report — Pass B: 10 Underperforming Fontanería/Calefacción Businesses in Spain
Conducted 2026-07-13 via FireCrawl scraping + web search. Referenced by [Website-Blueprint-Cabal.md](Website-Blueprint-Cabal.md).

## Method note
All findings come from live web searches and page scrapes conducted 2026-07-13. Every rating, quote and site defect is sourced with a URL. Where a figure could not be independently verified (e.g., a business's own self-reported rating), that is flagged explicitly rather than treated as confirmed.

---

## (a) The 10 businesses + evidence table

| # | Business | City/Region | URL(s) | Rating / Reviews (source) | Core evidence of struggle |
|---|---|---|---|---|---|
| 1 | Repara Home Express SL | Madrid / Valencia (multi-city) | [fontanerosmadrid.madrid](https://fontanerosmadrid.madrid), [arreglofacil.com](https://arreglofacil.com), [fontanerosya.com](https://fontanerosya.com/fontaneros/repara-home-express-s-l/) | 2.8/5 (16 reseñas) — [fontanerosya.com](https://fontanerosya.com/fontaneros/repara-home-express-s-l/) | Two separate OCU public complaints: ["Precios abusivos"](https://www.ocu.org/reclamar/lista-reclamaciones-publicas/precios-abusivos/9f100db573522c23a0) (Oct 2025 — customer quoted a 380€ "desplazamiento" fee, later "discounted" to 190€, after mistakenly clicking a Google Ads listing) and ["Reparación no realizada y sin presupuesto previo"](https://www.ocu.org/reclamar/lista-reclamaciones-publicas/reparaci-C3-B3n-no-realizada-y-sin-/26cc070c2dd0e97e75) (10 Jul 2026 — leak never fixed, technician stopped responding). Runs a network of near-identical city/service doorway sites (also operates cerrajerosbilbaorepara.com for locksmith leads). |
| 2 | Servicio Xpress (network) | Multi-city incl. **Mataró** — direct local competitor to Cabal | [servicioxpress.com/fontanero-mataro](https://servicioxpress.com/fontanero-mataro/) | No independent rating found; self-published testimonials only | Identical template reused for Mataró, Hospitalet de Llobregat, Cádiz, and other cities. Two different phone numbers appear on the same page (copy-paste error typical of doorway-page mills). "Testimonials" use stock avatar images filenamed `user-female.webp`/`user-mal.webp`, generic names, no verifiable link to Google reviews. No team names, no legal identity, no physical address for Mataró. |
| 3 | Servis Instal Company | Multi-city incl. **Mataró** — direct local competitor to Cabal | [servisinstalcompany.com/fontanero-mataro](https://servisinstalcompany.com/fontanero-mataro/) | Self-displayed "5/5 – (2 votos)" | Same doorway-page pattern duplicated for Mataró, Premià de Mar, Sant Vicenç de Montalt, Canet de Mar, Montgat, Cabrera de Mar, Sant Feliu de Llobregat, Vilanova i la Geltrú, Granollers. Thin, unverifiable social proof (2 votes) presented as meaningful. No named staff, no real work photos. |
| 4 | Fontaneros Express 24/7 | Nationwide / Madrid area | [fontanerosexpress247.es](https://fontanerosexpress247.es/) | TrustScore 1.5/5 "Muy malo" — 60 opiniones — [Trustpilot](https://es.trustpilot.com/review/fontanerosexpress247.es) | OCU complaint ["incumplimiento de condiciones, negativa a dar factura..."](https://www.ocu.org/reclamar/lista-reclamaciones-publicas/reparaci-C3-B3n-de-caldera-incumpl/9cc881a68641f03f1e) (Aug 2025) — refusal to issue an invoice after a boiler repair. |
| 5 | Fontaneros 24 Horas Madrid Urgencias | Comunidad de Madrid | [fontaneros24horasmadrid.es](https://www.fontaneros24horasmadrid.es/) | Self-reported "4.7/5, +100 reseñas" (unverifiable — links to a raw Google Maps search, not a checkable profile) | The site's own `/opiniones-clientes/` page returns a 404. No legal company name, no street address, no team names anywhere on the site. |
| 6 | Serviciotecnico.plus network (serviciotecnico.plus / serviciotecnicoficial.com / serviciotecnicoautorizado.net / 1-sat.com) | Nationwide, clone-domain operation | Multiple Trustpilot listings | TrustScore ~1.0–1.2/5 across 218–284 reviews per domain — [Trustpilot](https://es.trustpilot.com/review/www.serviciotecnico.plus) | Flagged on [denuncioestafa.com](https://www.denuncioestafa.com/foro/empresas-y-profesionales-empresas-que-mienten-y-enganan/serviciotecnico-plus-te-sientes-estafado-opiniones/) and an OCU complaint ["Estafa de Manuel Parejo Caballero"](https://www.ocu.org/reclamar/lista-reclamaciones-publicas/estafa-de-manuel-parejo-caball/d7564baec5e0e7f19e). Four near-identical clone domains each racking up 200+ low-scored reviews. |
| 7 | Fontanería Madrid Centro | Madrid | fontaneriamadridcentro.com | TrustScore 2.5/5 "Malo" — 7 opiniones — [Trustpilot](https://es.trustpilot.com/review/fontaneriamadridcentro.com) | Very small review base, "Malo" classification. |
| 8 | Fontaneros.org | Spain (national domain) | fontaneros.org | TrustScore 2.5/5 "Malo" — 7 opiniones — [Trustpilot](https://es.trustpilot.com/review/fontaneros.org) | Identical score/count to #7 — possible shared operator, unverified but flagged. |
| 9 | Tecnirep | Spain | www.tecnirep.es | TrustScore 2.0/5 "Malo" — 15 opiniones — [Trustpilot](https://es.trustpilot.com/review/www.tecnirep.es) | Consistently low score across a real (not tiny) sample. |
| 10 | Fontanero Urgente Bcn | Barcelona (Carrer Roselló, 64) | [Páginas Amarillas listing](https://www.paginasamarillas.es/f/barcelona/fontanero-urgente-bcn_230935272_000000001.html) — no working site | No reviews found | Exists only as a Páginas Amarillas entry. The listing's own "Sitio Web" link points to `fontanerourgentebcn.com`, which fails outright with a DNS resolution error. |

---

## (b) Per-business website breakdown

### 1. Repara Home Express SL
Not fully scraped (satellite sites returned directory data). OCU correspondence confirms a published tariff sheet used defensively in its rebuttal, and a cited court ruling in its own favor. No named owner/team visible in any material reviewed. The Oct 2025 complainant reached the company by mistakenly clicking a Google Ads listing rather than the business she intended to call — implying aggressive paid-search capture of confused searchers. Pricing "transparency" nominally exists (a tariff PDF per their defense) but the real-world complaint shows a bait-and-switch structure (380€ → "discounted" 190€, undisclosed up front).

### 2. Servicio Xpress — fontanero-mataro
- **Hero:** "Fontanero Mataró" + phone CTA (601895629) immediately below headline, then a second, different phone number later on the same page.
- **Trust signals present:** price table (60€–2.000€ ranges), FAQ block, brand-name suppliers listed (Grohe, Roca, Geberit) — more sophisticated than a crude spam page.
- **Trust signals absent:** no named plumbers, no team photo, no verifiable review link, no physical office address for Mataró specifically.
- **Section order:** Hero → services grid → 24h availability blurb → schedule → coverage neighborhoods (Centro, Vía Europa, Cirera, Rocafonda…) → price table → process (3 steps) → brand partners → FAQ → blog teasers → contact form.
- **Pricing:** Yes, unusually — a full price table. Shows local competitors in Mataró are not all low-effort.
- **Tone:** Generic WordPress template reused for Cádiz, Hospitalet, Granollers, and Mataró alike with only the city name swapped — no distinctly local character despite claiming "conocemos el Maresme."

### 3. Servis Instal Company — fontanero-mataro
- **Hero:** "Fontanero Mataró" headline, phone CTA (695629590).
- **Trust signals present:** reasonably detailed service descriptions (fuga sin obras, bajantes sin obra).
- **Trust signals absent:** no team, no photos of actual jobs beyond one generic stock bathroom image, "5/5 (2 votos)" presented as social proof despite being statistically meaningless.
- **Section order:** Hero → services list → economical pricing pitch (no numbers) → 24h pitch → FAQ → city links footer (9 towns, same template) → contact form → rating badge.
- **Pricing:** No — only vague ranges in FAQ text ("25€–50€/hora").
- **Tone:** Low-effort but not aggressive-red; generic corporate teal. Fully anonymous — no human face anywhere.

### 4. Fontaneros Express 24/7
Homepage could not be fully re-scraped this session (Trustpilot blocked scraping), but search-indexed copy confirms "24/7," combined climate/HVAC + plumbing positioning, "más de 7 años de experiencia" claim. Combined with the OCU complaint about refusing to issue an invoice, fits the "cash-in-hand, no paper trail" complaint pattern common to urgencias operators.

### 5. Fontaneros 24 Horas Madrid Urgencias
- **Hero:** "Fontaneros 24 Horas Madrid Urgencias" + immediate WhatsApp/phone CTAs (652 661 846), no scroll needed.
- **Trust signals present:** self-reported "4.7/5, +100 reseñas" badge with 3 embedded testimonials (first-name-only, no technician photos).
- **Trust signals absent:** no legal company name, no street address, no team page; the `/opiniones-clientes/` page — meant to be the strongest trust asset — 404s.
- **Section order:** Hero → services grid (6 tiles) → "¿Por qué elegirnos?" (6 generic bullets) → reviews badge → coverage area teaser → FAQ (10 Q&As) → closing CTA.
- **Pricing:** No — FAQ says "El precio depende... Siempre informamos del coste antes," a promise, not a number.
- **Tone:** Clean, modern, professional-looking WordPress/Elementor build — demonstrates the anonymous-24h-urgencias problem isn't only a design/aesthetic issue; a site can look professional yet still hide who is actually behind it.

### 6. Serviciotecnico.plus network
Not scraped directly (Trustpilot blocked automated access). The pattern of four near-identical clone domains each independently racking up 200+ reviews at ~1.0–1.2/5, plus an active consumer-fraud forum thread and a named OCU complaint, is itself the finding: a documented pattern of look-alike "official service" branding designed to be mistaken for manufacturer-authorized repair.

### 7–9. Fontanería Madrid Centro / Fontaneros.org / Tecnirep
Only Trustpilot summary data retrieved in this pass. All three share the profile: small review count, consistently low score, no way to verify the operator's identity from the domain name alone.

### 10. Fontanero Urgente Bcn
No real website exists. The entire public presence is one Páginas Amarillas page: name, phone, address, a generic category blurb, and a "Sitio Web" link that resolves to nothing. Adjacent listings on the same directory page (Rdh Reparaciones del Hogar, Asistencia Hogar 24h, Yavoi Reparaciones, Fcn Funciona Reparaciones, Servi OK) share the exact same boilerplate description template ("Trabajos rápidos 24h/365d... 35 años son la mejor garantía"), suggesting a directory-listing mill rather than distinct local businesses.

---

## (c) Cross-business synthesis: common failure patterns

| Pattern | Count (of 10) | Detail |
|---|---|---|
| Confirmed low rating (Trustpilot ≤2.8 or directory ≤2.8, real sample) | 6/10 | #1 (2.8), #4 (1.5), #6 (~1.1), #7 (2.5), #8 (2.5), #9 (2.0) |
| Formal consumer-protection complaint on public record (OCU) | 3/10 | #1 (two complaints), #4, #6 — all center on pricing deception or refusal to document the transaction |
| Multi-city "doorway page" network (identical template, town name swapped) | 4/10 confirmed (#1, #2, #3; #5/#10's surrounding cluster suggests wider prevalence) |
| No named team / no real human identity shown anywhere on the site | 5/10 confirmed by direct scrape (#2, #3, #5; inferable for #1, #10) | Not one of the ten shows a named plumber's face or credentials |
| No genuine, verifiable pricing published | 2/3 directly checked (#3, #5) — #2 is the exception with an actual (if generic) price table |
| Broken or dead technical asset (404, DNS failure, stale content) | 2/10 confirmed directly (#5, #10) |
| Unverifiable/self-reported "reviews" with no checkable source | 2/10 directly observed (#2's stock-avatar testimonials, #3's "2 votos") |
| Bare directory-only presence with no functioning website | 1/10 as primary example (#10), but the surrounding Páginas Amarillas cluster suggests this is common at the very bottom of the market |

### What a trust-based family business needs to do differently
1. **Name real people.** Zero of the ten showed a named, photographed plumber/team.
2. **Publish one set of real prices, on one real domain.** #2 shows a price table can be done credibly, but it's undermined by being copy-pasted across a dozen unrelated cities.
3. **Don't operate — or resemble — a doorway-page network.** 3/10 are directly identifiable as multi-city templates, detectable within seconds, correlating with the complaint patterns found in #1.
4. **Keep every link on the site alive.** #5's own reviews page 404s — an avoidable failure undercutting the exact trust signal (100+ reviews) the homepage is trying to establish.
5. **Have an actual functioning website at all.** #10 shows the floor of this market.
6. **Real reviews, linked to a real, checkable source.** Self-hosted "testimonials" with stock avatars or "2 votos" read as fabricated on close inspection.

### Explicit caveats
- No clean example was found among live-scrapable sites of the "aggressive red/yellow alarmist design with dramatic burst-pipe stock photography" sub-pattern originally expected — the sites accessed (#2, #5) were visually competent, if anonymous. This may mean that sub-pattern is more common among smaller/lower-budget operators whose sites are hard to find via search, or less prevalent in the current Spanish market than assumed.
- Ratings/review counts for #1 and #4–#9 are as displayed by third-party sources at time of access (2026-07-13) and are subject to change.
- Trustpilot's own review pages could not be fully rendered directly (bot-verification blocked scraping); TrustScore/review-count figures come from indexed search snippets of those pages, a slightly less direct source than a live page render, though figures were consistent across repeated queries.
