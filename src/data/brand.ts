/** Public brand stack. One speaker, one file, one address — never mixed. */
export const publication = 'Tan Lines';
export const tagline = 'the unvarnished history of Melanotan II';
export const record = 'The Record';
export const domain = 'melanotanii.com';
export const siteUrl = 'https://melanotanii.com';

/**
 * One-paragraph account of who writes this, for the article author block.
 * Must stay consistent with /standards/: single masthead, no borrowed
 * credentials, independent of the industry covered.
 */
export const authorBlurb =
  'Tan Lines is written and edited under a single masthead, not individual bylines, ' +
  'and claims no medical or clinical credentials. Every article is built from primary ' +
  'sources — peer-reviewed literature, patent filings, regulatory records and ' +
  'companies’ own disclosures — dated, and corrected in the open when it is wrong. ' +
  'The publication is independent of every manufacturer, vendor and clinic it covers, ' +
  'sells nothing, and publishes no sourcing, dosing or usage guidance. Nothing here is ' +
  'medical advice.';

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

/**
 * Author-of-record node for Article JSON-LD. Same @id as the publisher so the
 * graph has one organization; carries the credentials signals (description,
 * knowsAbout, sameAs → about/standards) that a Person byline would otherwise
 * supply. Also usable as `reviewedBy`, since the standard is the reviewer.
 */
export function authorLd(site: URL | undefined) {
  const origin = originOf(site);
  return {
    '@type': 'NewsMediaOrganization',
    '@id': `${origin}/#org`,
    name: publication,
    url: `${origin}/`,
    description: authorBlurb,
    knowsAbout,
    sameAs: [`${origin}/about/`, `${origin}/standards/`],
    publishingPrinciples: `${origin}/standards/`,
    correctionsPolicy: `${origin}/standards/#corrections`,
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
