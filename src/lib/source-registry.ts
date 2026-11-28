import overridesFile from '../data/source-overrides.json';
import { citationsFromMarkdown, mergeCitations } from './citations';
import { clusterStrand, type Strand } from '../data/clusters';

export type SourceType = 'paper' | 'regulator' | 'company' | 'foi' | 'other';

export interface SourceOverride {
  title?: string;
  type?: SourceType;
  date?: string;
  pmid?: string;
}

export interface SourceRecord {
  url: string;
  title: string;
  type: SourceType;
  date: string | null;
  year: string | null;
  pmid: string | null;
  articleIds: string[];
  recordIds: string[];
}

interface ArticleInput {
  id: string;
  title: string;
  cluster: string;
  body?: string;
  sources?: { label: string; url: string }[];
}

interface RecordInput {
  id: string;
  title: string;
  sourceUrl: string;
  sourceLabel: string;
  eventDate: Date;
  body?: string;
}

const COMPANY_HOSTS = ['clinuvel.com', 'leo-pharma.com', 'palatin.com', 'mt-pharma.co.jp'];
const REGULATOR_HOSTS = [
  'fda.gov',
  'accessdata.fda.gov',
  'tga.gov.au',
  'ema.europa.eu',
  'gov.uk',
  'health.gov.au',
  'canada.ca',
  'hc-sc.gc.ca',
  'federalregister.gov',
  'legislation.gov.uk',
  'legislation.gov.au',
];
const PAPER_HOSTS = [
  'pubmed.ncbi.nlm.nih.gov',
  'ncbi.nlm.nih.gov',
  'doi.org',
  'jamanetwork.com',
  'nejm.org',
  'thelancet.com',
  'nature.com',
  'science.org',
  'academic.oup.com',
  'onlinelibrary.wiley.com',
  'link.springer.com',
  'sciencedirect.com',
  'mdpi.com',
  'frontiersin.org',
  'bmj.com',
  'actasdermo.org',
];

function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
}

function matches(host: string, list: string[]): boolean {
  return list.some((item) => host === item || host.endsWith(`.${item}`));
}

export function canonicalSourceUrl(url: string): string {
  try {
    const parsed = new URL(url);
    parsed.hash = '';
    if (parsed.pathname.length > 1) parsed.pathname = parsed.pathname.replace(/\/+$/, '');
    return parsed.toString();
  } catch {
    return url;
  }
}

function pmidFrom(url: string): string | null {
  const match = url.match(/pubmed\.ncbi\.nlm\.nih\.gov\/(\d+)/) ?? url.match(/[?&]pmid=(\d+)/i);
  return match?.[1] ?? null;
}

export function inferSourceType(url: string, title: string): SourceType {
  const host = hostOf(url);
  const text = `${url} ${title}`.toLowerCase();
  if (/\bfoi\b|freedom of information/.test(text)) return 'foi';
  if (pmidFrom(url) || matches(host, PAPER_HOSTS)) return 'paper';
  if (matches(host, COMPANY_HOSTS)) return 'company';
  if (matches(host, REGULATOR_HOSTS)) return 'regulator';
  return 'other';
}

function isHostTitle(title: string, url: string): boolean {
  return title === hostOf(url) || title === url;
}

const overrides = overridesFile as Record<string, SourceOverride>;

export interface SourceCatalog {
  sources: SourceRecord[];
  urlsByArticle: Map<string, string[]>;
}

export function buildSourceCatalog(articles: ArticleInput[], records: RecordInput[]): SourceCatalog {
  const byUrl = new Map<string, {
    url: string;
    title: string;
    type: SourceType;
    date: string | null;
    pmid: string | null;
    articleIds: string[];
    recordIds: string[];
  }>();
  const urlsByArticle = new Map<string, string[]>();

  function touch(rawUrl: string, title: string, articleId?: string, recordId?: string, date?: string) {
    const url = canonicalSourceUrl(rawUrl);
    let row = byUrl.get(url);
    if (!row) {
      row = {
        url,
        title,
        type: inferSourceType(url, title),
        date: date ?? null,
        pmid: pmidFrom(url),
        articleIds: [],
        recordIds: [],
      };
      byUrl.set(url, row);
    } else if (isHostTitle(row.title, url) && !isHostTitle(title, url)) {
      row.title = title;
      row.type = inferSourceType(url, title);
    }
    if (date && !row.date) row.date = date;
    if (articleId && !row.articleIds.includes(articleId)) row.articleIds.push(articleId);
    if (recordId && !row.recordIds.includes(recordId)) row.recordIds.push(recordId);
    if (articleId) {
      const list = urlsByArticle.get(articleId) ?? [];
      if (!list.includes(url)) list.push(url);
      urlsByArticle.set(articleId, list);
    }
    return url;
  }

  for (const article of articles) {
    const found = mergeCitations(article.sources, citationsFromMarkdown(article.body));
    for (const citation of found) touch(citation.url, citation.label, article.id);
  }
  for (const record of records) {
    const iso = record.eventDate.toISOString().slice(0, 10);
    touch(record.sourceUrl, record.sourceLabel, undefined, record.id, iso);
    for (const citation of citationsFromMarkdown(record.body)) {
      touch(citation.url, citation.label, undefined, record.id);
    }
  }

  for (const [key, patch] of Object.entries(overrides)) {
    const url = canonicalSourceUrl(key);
    const row = byUrl.get(url);
    if (!row) continue;
    if (patch.title) row.title = patch.title;
    if (patch.type) row.type = patch.type;
    if (patch.date) row.date = patch.date;
    if (patch.pmid) row.pmid = patch.pmid;
  }

  const sources: SourceRecord[] = [...byUrl.values()].map((row) => ({
    ...row,
    year: row.date ? row.date.slice(0, 4) : null,
  }));

  return { sources, urlsByArticle };
}

export function sourcesForArticle(catalog: SourceCatalog, articleId: string): SourceRecord[] {
  const urls = catalog.urlsByArticle.get(articleId) ?? [];
  const byUrl = new Map(catalog.sources.map((source) => [source.url, source]));
  return urls.flatMap((url) => {
    const source = byUrl.get(url);
    return source ? [source] : [];
  });
}

export interface RelatedPick<T> {
  sameStrand: T[];
  crossStrand: T[];
}

export function pickRelated<T extends { id: string; strand: Strand; date: number }>(
  articleId: string,
  strand: Strand,
  catalog: SourceCatalog,
  pool: T[],
): RelatedPick<T> {
  const mine = new Set(catalog.urlsByArticle.get(articleId) ?? []);
  const score = (id: string) => (catalog.urlsByArticle.get(id) ?? []).filter((url) => mine.has(url)).length;
  const others = pool.filter((item) => item.id !== articleId);
  const sameStrand = others
    .filter((item) => item.strand === strand)
    .sort((a, b) => score(b.id) - score(a.id) || b.date - a.date)
    .slice(0, 3);
  const shared = others
    .filter((item) => item.strand !== strand && score(item.id) > 0)
    .sort((a, b) => score(b.id) - score(a.id) || b.date - a.date);
  const crossStrand = shared.slice(0, 2);
  return { sameStrand, crossStrand };
}

export function strandOfCluster(cluster: string): Strand {
  return clusterStrand(cluster);
}
