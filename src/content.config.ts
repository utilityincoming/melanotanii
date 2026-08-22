import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
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
