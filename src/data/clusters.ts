// The five content threads and the three story strands they belong to.
//
// The whole site turns on one thesis — "one origin, three strands" (see the
// timeline). The three strands each have a color, defined once in Base.astro:
//   mission  -> --strand-mission (UV violet)  the original photoprotection goal
//   market   -> --caution        (rust)       the gray market that filled the void
//   approval -> --approved        (green)      the approved drugs spun off from it
// This module is the single source of truth that lets the homepage, the article
// template, and the article index share the same labels, order, and colors.

export type Cluster =
  | 'history'
  | 'science'
  | 'culture'
  | 'cautionary-tale'
  | 'next-agonist';

export type Strand = 'mission' | 'market' | 'approval';

export interface ClusterMeta {
  label: string;
  blurb: string;
  strand: Strand;
  /** The gateway article for this thread, surfaced first on the homepage. */
  lead: string;
}

// Narrative reading order: origin -> mechanism -> demand -> consequence -> future.
export const clusterOrder: Cluster[] = [
  'history',
  'science',
  'culture',
  'cautionary-tale',
  'next-agonist',
];

export const clusters: Record<Cluster, ClusterMeta> = {
  history: {
    label: 'The History',
    blurb: 'Where Melanotan II came from, and what it was actually meant to do.',
    strand: 'mission',
    lead: 'where-melanotan-came-from',
  },
  science: {
    label: 'The Science',
    blurb: 'Melanocortin receptors, α-MSH, and how the tanning signal really works.',
    strand: 'mission',
    lead: 'one-hormone-five-receptors',
  },
  culture: {
    label: 'The Demand',
    blurb:
      'Why anyone wanted it in the first place — the reward loop the sun wired in, a century of fashion, and the market that desire built.',
    strand: 'market',
    lead: 'how-a-suntan-became-desirable',
  },
  'cautionary-tale': {
    label: 'The Cautionary Tale',
    blurb: 'How a lab compound became a gray-market phenomenon, and what it cost.',
    strand: 'market',
    lead: 'barbie-drug-gray-market',
  },
  'next-agonist': {
    label: 'The Next Agonist',
    blurb: 'What it would take for a safe photoprotective drug to reach everyone.',
    strand: 'approval',
    lead: 'middle-ground-agonist-already-exists',
  },
};

export interface StrandMeta {
  /** Short label for the hero figure and legend. */
  label: string;
  /** One-line caption framing this strand of the story. */
  caption: string;
  /** CSS custom-property reference for the strand's color. */
  colorVar: string;
}

export const strandOrder: Strand[] = ['mission', 'market', 'approval'];

export const strands: Record<Strand, StrandMeta> = {
  mission: {
    label: 'The mission',
    caption: 'Lasting protection from the sun — still unproven, still open.',
    colorVar: 'var(--strand-mission)',
  },
  market: {
    label: 'The gray market',
    caption: 'The vials that filled the vacuum when no approved drug came.',
    colorVar: 'var(--caution)',
  },
  approval: {
    label: 'The spinoffs',
    caption: 'Two approved medicines drawn from its side effects — neither a tan.',
    colorVar: 'var(--approved)',
  },
};

/** Human label for a cluster key, with a safe fallback for unknown keys. */
export function clusterLabel(key: string): string {
  return (clusters as Record<string, ClusterMeta>)[key]?.label ?? key.replace(/-/g, ' ');
}

/** Strand a cluster belongs to, defaulting to the mission strand. */
export function clusterStrand(key: string): Strand {
  return (clusters as Record<string, ClusterMeta>)[key]?.strand ?? 'mission';
}

/** CSS color-var reference for a cluster's strand. */
export function clusterColorVar(key: string): string {
  return strands[clusterStrand(key)].colorVar;
}
