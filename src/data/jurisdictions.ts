export const jurisdictions = {
  au: 'Australia',
  us: 'United States',
  uk: 'United Kingdom',
  eu: 'European Union',
  ca: 'Canada',
  global: 'Global',
} as const;

export type Jurisdiction = keyof typeof jurisdictions;

export function jurisdictionLabel(key: string): string {
  return (jurisdictions as Record<string, string>)[key] ?? key;
}
