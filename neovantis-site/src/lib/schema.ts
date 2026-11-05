import { SITE_URL, business } from '../config/site';

// Truthful Organization markup: no hours, service areas, ratings, reviews or offers.
export function organizationSchema() {
  return {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: business.name,
    url: `${SITE_URL}/`,
    logo: { '@type': 'ImageObject', url: `${SITE_URL}${business.logo}`, width: 461, height: 154 },
    slogan: business.tagline,
    description: business.description,
    telephone: business.phone.e164,
    email: business.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.line1,
      addressLocality: business.address.locality,
      addressRegion: business.address.region,
      postalCode: business.address.postalCode,
      addressCountry: business.address.countryCode,
    },
  };
}

export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: business.name,
    publisher: { '@id': `${SITE_URL}/#organization` },
    inLanguage: 'en-ZA',
  };
}

export function breadcrumbSchema(crumbs: { name: string; href: string }[], canonical: string) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${canonical}#breadcrumb`,
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: new URL(c.href, SITE_URL).href,
    })),
  };
}
