// Per-article Open Graph image: /og/<article-id>.png, generated at build.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { clusterLabel, clusterStrand } from '../../data/clusters';
import { renderOgCard } from '../../lib/og-card';

const pageCards = [
  { id: 'page-countries', title: 'The record by country', threadLabel: 'The Record', strand: 'market' },
  { id: 'page-mole-cases', title: 'Mole cases', threadLabel: 'The cautionary tale', strand: 'market' },
  { id: 'page-history', title: 'The history, in order', threadLabel: 'The mission', strand: 'mission' },
];

const strandCards = [
  { id: 'strand-mission', title: 'The mission', threadLabel: 'The mission', strand: 'mission' },
  { id: 'strand-market', title: 'The gray market', threadLabel: 'The gray market', strand: 'market' },
  { id: 'strand-approval', title: 'The spinoffs', threadLabel: 'The spinoffs', strand: 'approval' },
];

export async function getStaticPaths() {
  const articles = await getCollection('articles', ({ data }) => !data.draft);
  const records = await getCollection('records', ({ data }) => !data.draft);
  return [
    ...articles.map((a) => ({
      params: { id: a.id },
      props: {
        title: a.data.title,
        threadLabel: clusterLabel(a.data.cluster),
        strand: clusterStrand(a.data.cluster),
      },
    })),
    ...records.map((entry) => ({
      params: { id: `record-${entry.id}` },
      props: {
        title: entry.data.title,
        threadLabel: entry.data.status === 'filed' ? 'The Record' : 'Scheduled',
        strand: 'mission',
      },
    })),
    ...strandCards.map((card) => ({ params: { id: card.id }, props: card })),
    ...pageCards.map((card) => ({ params: { id: card.id }, props: card })),
  ];
}

export const GET: APIRoute = async ({ props }) => {
  const png = await renderOgCard(props as Parameters<typeof renderOgCard>[0]);
  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
