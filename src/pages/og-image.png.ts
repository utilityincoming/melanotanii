import type { APIRoute } from 'astro';
import { renderOgCard } from '../lib/og-card';

export const GET: APIRoute = async () => {
  const png = await renderOgCard({
    title: 'The melanotan record',
    threadLabel: 'Science, history and regulation',
    strand: 'mission',
  });
  return new Response(png, { headers: { 'Content-Type': 'image/png' } });
};
