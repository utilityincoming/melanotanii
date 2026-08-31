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
    draft: z.boolean().default(false),
    // Cross-links to our sister science hub, melanocortin.com (rendered after the body).
    seeAlso: z
      .array(z.object({ href: z.string().url(), label: z.string(), note: z.string().optional() }))
      .optional(),
  }),
});

export const collections = { articles };
