// Per-article Open Graph image: /og/<article-id>.png, generated at build.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { clusterLabel, clusterStrand } from '../../data/clusters';
import { renderOgCard } from '../../lib/og-card';

export async function getStaticPaths() {
  const articles = await getCollection('articles', ({ data }) => !data.draft);
  return articles.map((a) => ({
    params: { id: a.id },
    props: {
      title: a.data.title,
      threadLabel: clusterLabel(a.data.cluster),
      strand: clusterStrand(a.data.cluster),
    },
  }));
}

export const GET: APIRoute = async ({ props }) => {
  const png = await renderOgCard(props as Parameters<typeof renderOgCard>[0]);
  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
