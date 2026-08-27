import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const articles = (await getCollection('articles', ({ data }) => !data.draft))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: 'Tan Lines',
    description:
      'The full Melanotan II story, told straight: the research that created it, the gray market that hijacked it, the approved drugs it spawned, and the photoprotective medicine that could still come.',
    site: context.site,
    items: articles.map((a) => ({
      title: a.data.title,
      description: a.data.description,
      pubDate: a.data.pubDate,
      link: `/articles/${a.id}/`,
      categories: [a.data.cluster],
    })),
    customData: '<language>en-us</language>',
  });
}
