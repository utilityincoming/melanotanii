import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const articles = await getCollection('articles', ({ data }) => !data.draft);
  const records = await getCollection('records');
  const items = [
    ...articles.map((a) => ({
      title: a.data.title,
      description: a.data.description,
      pubDate: a.data.updatedDate ?? a.data.pubDate,
      link: `/articles/${a.id}/`,
      // Full markdown body — machines and feed readers get the article, not a teaser.
      content: a.body ?? a.data.description,
      categories: [a.data.cluster],
    })),
    ...records.map((r) => ({
      title: `Record entry: ${r.data.title}`,
      description: `${r.data.when} — ${r.data.authority} (${r.data.jurisdiction.toUpperCase()}).`,
      pubDate: r.data.eventDate,
      link: `/record/${r.id}/`,
      content: r.body ?? `${r.data.when} — ${r.data.authority}.`,
      categories: ['record-entry'],
    })),
  ].sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

  return rss({
    title: 'Tan Lines',
    description:
      'The full Melanotan II story, told straight: the research that created it, the gray market that hijacked it, the approved drugs it spawned, and the photoprotective medicine that could still come.',
    site: context.site,
    items,
    customData: '<language>en-us</language>',
    trailingSlash: true,
  });
}
