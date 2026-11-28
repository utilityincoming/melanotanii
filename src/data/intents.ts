/** Canonical high-intent pages. Each article in this list shows the others. */
export const intents = [
  {
    id: 'is-melanotan-legal',
    href: '/articles/is-melanotan-legal/',
    label: 'Is Melanotan legal?',
  },
  {
    id: 'pt-141-vs-melanotan-ii',
    href: '/articles/pt-141-vs-melanotan-ii/',
    label: 'PT-141 vs Melanotan II',
  },
  {
    id: 'the-mole-problem',
    href: '/articles/the-mole-problem/',
    label: 'Mole cases',
  },
  {
    id: 'the-enforcement-map',
    href: '/articles/the-enforcement-map/',
    label: 'Enforcement by country',
  },
  {
    id: 'where-melanotan-came-from',
    href: '/articles/where-melanotan-came-from/',
    label: 'History',
  },
  {
    id: 'regulatory',
    href: '/regulatory/',
    label: 'Regulatory tracker',
  },
] as const;

export function otherIntents(id: string) {
  return intents.filter((item) => item.id !== id);
}
