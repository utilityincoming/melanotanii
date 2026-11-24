// The five content threads and the three story strands they belong to.
//
// The whole site turns on one thesis — "one origin, three strands" (see the
// timeline). The three strands each have a color, defined in editorial.css:
//   mission  -> --strand-mission (indigo)  the original photoprotection goal
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
    blurb: 'The Arizona lab, the patent trail, and the job the peptide was built to do.',
    strand: 'mission',
    lead: 'where-melanotan-came-from',
  },
  science: {
    label: 'The Science',
    blurb: 'Five receptors, one hormone, and why a tan is the least of what this signal does.',
    strand: 'mission',
    lead: 'one-hormone-five-receptors',
  },
  culture: {
    label: 'The Demand',
    blurb:
      'The want came first: a reward the sun wired in, a century of fashion, then a market.',
    strand: 'market',
    lead: 'how-a-suntan-became-desirable',
  },
  'cautionary-tale': {
    label: 'The Cautionary Tale',
    blurb: 'The vials, the warnings, and the harms that were written down.',
    strand: 'market',
    lead: 'barbie-drug-gray-market',
  },
  'next-agonist': {
    label: 'The Next Agonist',
    blurb: 'The approved drugs, the trials still running, and the sun drug that is not here.',
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

/** Clusters that live inside each strand, in reading order. Filing, not the argument. */
export const clustersByStrand: Record<Strand, Cluster[]> = {
  mission: ['history', 'science'],
  market: ['culture', 'cautionary-tale'],
  approval: ['next-agonist'],
};

export const strands: Record<Strand, StrandMeta> = {
  mission: {
    label: 'The mission',
    caption: 'A drug that protects skin from the sun. Still unproven.',
    colorVar: 'var(--strand-mission)',
  },
  market: {
    label: 'The gray market',
    caption: 'The demand, then the vials that showed up when no drug did.',
    colorVar: 'var(--caution)',
  },
  approval: {
    label: 'The spinoffs',
    caption: 'Approved medicines from the same chemistry. None of them a cosmetic tan.',
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

/** Human label for a strand key. */
export function strandLabel(key: Strand): string {
  return strands[key].label;
}
