/** Public brand stack. One speaker, one file, one address — never mixed. */
export const publication = 'Tan Lines';
export const tagline = 'the unvarnished history of Melanotan II';
export const record = 'The Record';
export const domain = 'melanotanii.com';
export const siteUrl = 'https://melanotanii.com';

export const knowsAbout = [
  'Melanotan II',
  'Melanotan I',
  'afamelanotide',
  'bremelanotide',
  'melanocortin receptors',
  'alpha-melanocyte-stimulating hormone',
];

function originOf(site: URL | undefined): string {
  return (site?.origin ?? siteUrl).replace(/\/$/, '');
}

/** Publisher node. Same @id on every page so Google has one organization. */
export function organizationLd(site: URL | undefined) {
  const origin = originOf(site);
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsMediaOrganization',
    '@id': `${origin}/#org`,
    name: publication,
    url: `${origin}/`,
    publishingPrinciples: `${origin}/standards/`,
    correctionsPolicy: `${origin}/standards/`,
    knowsAbout,
  };
}

/** Site + the dated file (timeline / regulatory / articles) as a Dataset. */
export function websiteLd(site: URL | undefined) {
  const origin = originOf(site);
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${origin}/#website`,
    name: publication,
    url: `${origin}/`,
    publisher: { '@id': `${origin}/#org` },
    hasPart: {
      '@type': 'Dataset',
      '@id': `${origin}/#record`,
      name: record,
      description:
        'Dated timeline, regulatory watch, and article file on Melanotan II and the melanocortin sun drugs.',
      url: `${origin}/timeline/`,
      creator: { '@id': `${origin}/#org` },
    },
  };
}

export function orgRef(site: URL | undefined) {
  const origin = originOf(site);
  return {
    '@type': 'NewsMediaOrganization',
    '@id': `${origin}/#org`,
    name: publication,
    url: `${origin}/`,
  };
}

export function recordRef(site: URL | undefined) {
  return { '@id': `${originOf(site)}/#record`, name: record };
}
