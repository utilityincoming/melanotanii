import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    // Optional query-shaped SERP title. The H1 keeps the magazine line;
    // <title> uses this when present so search and answer engines get the query.
    serpTitle: z.string().max(70).optional(),
    description: z.string().max(160),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    cluster: z.enum(['history', 'cautionary-tale', 'science', 'culture', 'next-agonist']),
    // Query pages answer one searcher question. Essays keep the economics
    // and history. Default essay so existing files stay essays.
    kind: z.enum(['query', 'essay']).default('essay'),
    draft: z.boolean().default(false),
    // Direct-answer Q&A for the queries this article captures. Rendered as a
    // visible FAQ block and emitted as FAQPage JSON-LD (AEO / AI Overviews).
    // Answers must obey the non-negotiables: no dosing, no sourcing, harms plain.
    faq: z.array(z.object({ q: z.string(), a: z.string() })).min(2).optional(),
  }).refine(
    (data) => data.kind !== 'query' || (data.faq !== undefined && data.faq.length >= 2),
    { message: 'Query pages require an faq with at least two questions.', path: ['faq'] },
  ),
});

// The Record's dated corpus: short wire-service entries — regulator actions,
// court findings, enforcement numbers, company disclosures — each anchored to
// one primary source. Entries are not essays: they carry no argument, only a
// date, an authority, and what the document says. Filed entries record what
// happened; scheduled entries record what is on a calendar, and move to filed
// (with a date) when the event lands.
const records = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/records' }),
  schema: z.object({
    title: z.string(),
    // Human date phrasing ("by end of February 2027"); eventDate drives sorting.
    when: z.string(),
    eventDate: z.coerce.date(),
    status: z.enum(['filed', 'scheduled']).default('filed'),
    authority: z.string(),
    jurisdiction: z.enum(['au', 'us', 'uk', 'eu', 'ca', 'global']),
    sourceUrl: z.string().url(),
    sourceLabel: z.string(),
    // Optional cross-links into the article file (article collection ids).
    related: z.array(z.string()).optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { articles, records };
