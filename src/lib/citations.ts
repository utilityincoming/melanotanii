const LINK_RE = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g;
const URL_RE = /https?:\/\/[^\s)>\]"'`]+/g;

export interface Citation {
  label: string;
  url: string;
}

function cleanUrl(url: string): string {
  return url.replace(/[.,;:]+$/, '');
}

function hostLabel(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

/**
 * Citations in a markdown file, in order of first appearance.
 * Labeled markdown links win over a bare URL for the same address.
 * SVG namespace URIs are not citations. New articles contribute automatically.
 */
export function citationsFromMarkdown(body: string | undefined): Citation[] {
  const seen = new Set<string>();
  const out: Citation[] = [];
  const text = body ?? '';
  for (const match of text.matchAll(LINK_RE)) {
    const url = cleanUrl(match[2]);
    if (url.includes('w3.org') || seen.has(url)) continue;
    seen.add(url);
    out.push({ label: match[1].replace(/\s+/g, ' ').trim(), url });
  }
  for (const match of text.match(URL_RE) ?? []) {
    const url = cleanUrl(match);
    if (url.includes('w3.org') || seen.has(url)) continue;
    seen.add(url);
    out.push({ label: hostLabel(url), url });
  }
  return out;
}

export function mergeCitations(...groups: Array<Citation[] | undefined>): Citation[] {
  const seen = new Set<string>();
  const out: Citation[] = [];
  for (const group of groups) {
    for (const citation of group ?? []) {
      if (seen.has(citation.url)) continue;
      seen.add(citation.url);
      out.push(citation);
    }
  }
  return out;
}
