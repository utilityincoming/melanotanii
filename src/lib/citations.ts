const URL_RE = /https?:\/\/[^\s)>\]"'`]+/g;

export interface Citation {
  label: string;
  url: string;
}

/** External URLs in markdown, in order of first appearance. SVG namespace URIs are not citations. */
export function citationsFromMarkdown(body: string | undefined): Citation[] {
  const seen = new Set<string>();
  const out: Citation[] = [];
  for (const match of body?.match(URL_RE) ?? []) {
    const url = match.replace(/[.,;:]+$/, '');
    if (url.includes('w3.org') || seen.has(url)) continue;
    seen.add(url);
    let label = url;
    try {
      label = new URL(url).hostname.replace(/^www\./, '');
    } catch {
      label = url;
    }
    out.push({ label, url });
  }
  return out;
}
