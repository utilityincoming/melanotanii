import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve('dist');
const site = 'https://melanotanii.com';

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.isFile() && entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&mdash;/g, '—')
    .replace(/&rsquo;/g, '’');
}

function attr(tag, name) {
  const re = new RegExp(`\\b${name}=(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i');
  const m = tag.match(re);
  return m ? decodeEntities(m[1] ?? m[2] ?? m[3] ?? '') : '';
}

const errors = [];
const builtUrls = new Set();

for (const file of walk(distDir)) {
  const rel = path.relative(distDir, file).replace(/\\/g, '/');
  if (rel === '404.html') continue;

  const urlPath =
    rel === 'index.html'
      ? '/'
      : rel.endsWith('/index.html')
        ? '/' + rel.slice(0, -'index.html'.length)
        : '/' + rel;
  const expected = site + urlPath;
  builtUrls.add(expected);

  const html = fs.readFileSync(file, 'utf8');
  const headMatch = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i);
  const head = headMatch ? headMatch[1] : '';

  const titleMatch = head.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? decodeEntities(titleMatch[1]).trim() : '';
  if (!title) errors.push(`${urlPath}: missing <title>`);
  else if (title.length > 70) errors.push(`${urlPath}: <title> ${title.length} chars (>70): ${title}`);
  if (urlPath.startsWith('/articles/') && urlPath !== '/articles/' && title.length > 62) {
    errors.push(`${urlPath}: article <title> ${title.length} chars (>62): ${title}`);
  }

  const metas = head.match(/<meta\b[^>]*>/gi) ?? [];
  const descTag = metas.find((t) => attr(t, 'name').toLowerCase() === 'description');
  const desc = descTag ? attr(descTag, 'content').trim() : '';
  if (desc.length < 100 || desc.length > 160) {
    errors.push(`${urlPath}: description ${desc.length} chars (must be 100-160)`);
  }

  const ogUrlTags = metas.filter((t) => attr(t, 'property').toLowerCase() === 'og:url');
  if (ogUrlTags.length !== 1 || attr(ogUrlTags[0], 'content') !== expected) {
    errors.push(`${urlPath}: og:url mismatch (expected ${expected})`);
  }

  const links = head.match(/<link\b[^>]*>/gi) ?? [];
  const canonicals = links.filter((t) => attr(t, 'rel').toLowerCase() === 'canonical');
  if (canonicals.length !== 1 || attr(canonicals[0], 'href') !== expected) {
    errors.push(`${urlPath}: canonical mismatch (expected ${expected})`);
  }

  const h1Count = (html.match(/<h1\b/gi) ?? []).length;
  if (h1Count !== 1) errors.push(`${urlPath}: h1 count ${h1Count} (expected 1)`);

  const ldScripts = html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi);
  for (const m of ldScripts) {
    try {
      const obj = JSON.parse(m[1]);
      if (obj['@type'] === 'BreadcrumbList') {
        for (const el of obj.itemListElement ?? []) {
          if (!String(el.item ?? '').startsWith('https://')) {
            errors.push(`${urlPath}: non-absolute BreadcrumbList item: ${el.item}`);
          }
        }
      }
    } catch (err) {
      errors.push(`${urlPath}: invalid JSON-LD: ${err.message}`);
    }
  }
}

const smPath = path.join(distDir, 'sitemap-0.xml');
if (!fs.existsSync(smPath)) {
  errors.push('dist/sitemap-0.xml missing');
} else {
  const smXml = fs.readFileSync(smPath, 'utf8');
  const smUrls = new Set([...smXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
  for (const u of builtUrls) {
    if (!smUrls.has(u)) errors.push(`Missing from sitemap-0.xml: ${u}`);
  }
  for (const u of smUrls) {
    if (!builtUrls.has(u)) errors.push(`In sitemap-0.xml but not built: ${u}`);
  }
}

if (errors.length > 0) {
  console.error(`SEO audit failed (${errors.length} issue${errors.length === 1 ? '' : 's'}):`);
  for (const e of errors) console.error(' -', e);
  process.exit(1);
}

console.log(`SEO audit passed: ${builtUrls.size} pages verified (titles, descriptions, canonicals, og:url, h1, JSON-LD, sitemap-0.xml).`);
