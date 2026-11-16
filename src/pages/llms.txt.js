/**
 * /llms.txt — the machine-readable front door (llmstxt.org proposal).
 * Generated at build time from the same content collection as every page,
 * so it can never drift from the live Record. Full article text is in the
 * RSS feed (/rss.xml), linked below.
 */
import { getCollection } from 'astro:content';
import { publication, tagline, siteUrl, record } from '../data/brand';
import { clusters, clustersByStrand, strandOrder, strands } from '../data/clusters';

export async function GET() {
  const all = (await getCollection('articles', ({ data }) => !data.draft))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  const lines = [];
  lines.push(`# ${publication}`);
  lines.push('');
  lines.push(`> ${tagline.charAt(0).toUpperCase()}${tagline.slice(1)}. ${publication} (${siteUrl}) is an independent publication: history and analysis of Melanotan II and the melanocortin drug class. ${record} is the dated file — timeline, regulatory watch, and articles. No commerce, no medical advice.`);
  lines.push('');
  lines.push('## The Record');
  lines.push('');
  lines.push(`- [Timeline](${siteUrl}/timeline/): one origin, three strands — the mission, the gray market, the approved spinoffs, dated 1960s to now.`);
  lines.push(`- [Regulatory watch](${siteUrl}/regulatory/): every regulator action and upcoming catalyst on the melanocortin class, dated and sourced.`);
  lines.push(`- [All articles](${siteUrl}/articles/): every piece in The Record, grouped by strand.`);
  lines.push(`- [Sources](${siteUrl}/sources/): every external citation behind the articles.`);
  lines.push(`- [Editorial standards](${siteUrl}/standards/): how ${publication} reports, and what it never publishes.`);
  lines.push(`- [RSS (full text)](${siteUrl}/rss.xml): complete body of every article, machine-readable.`);
  lines.push('');

  for (const strand of strandOrder) {
    const meta = strands[strand];
    lines.push(`## ${meta.label}`);
    lines.push('');
    lines.push(`> ${meta.caption}`);
    lines.push('');
    for (const clusterKey of clustersByStrand[strand]) {
      const cluster = clusters[clusterKey];
      const items = all.filter((a) => a.data.cluster === clusterKey);
      if (items.length === 0) continue;
      lines.push(`### ${cluster.label}`);
      lines.push('');
      for (const a of items) {
        const kind = a.data.kind === 'query' ? ' (direct answer)' : '';
        lines.push(`- [${a.data.serpTitle ?? a.data.title}](${siteUrl}/articles/${a.id}/)${kind}: ${a.data.description}`);
      }
      lines.push('');
    }
  }

  lines.push('## Optional');
  lines.push('');
  lines.push(`- [About](${siteUrl}/about/): why ${publication} exists and where it is openly opinionated.`);
  lines.push('');

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
