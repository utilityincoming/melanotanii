import type { Strand } from './clusters';

export const strandPaths: Record<Strand, string> = {
  mission: '/strands/mission/',
  market: '/strands/gray-market/',
  approval: '/strands/spinoffs/',
};

export const strandPageCopy: Record<Strand, { title: string; description: string; ogLabel: string }> = {
  mission: {
    title: 'The mission: Melanotan II history — Tan Lines',
    description:
      'The mission strand: how Melanotan II started in Arizona melanoma research, and the receptor science that still defines the unfinished photoprotection goal.',
    ogLabel: 'The mission',
  },
  market: {
    title: 'The gray market: Melanotan II file — Tan Lines',
    description:
      'The gray-market strand: demand for a tan, the unapproved Melanotan II vials that filled the gap, documented harms, and what regulators have actually done.',
    ogLabel: 'The gray market',
  },
  approval: {
    title: 'The spinoffs: approved melanocortin drugs — Tan Lines',
    description:
      'The spinoffs strand: Scenesse, Vyleesi, and the other approved melanocortin drugs drawn from Melanotan chemistry. None of them is a cosmetic tan.',
    ogLabel: 'The spinoffs',
  },
};
