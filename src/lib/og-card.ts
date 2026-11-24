// Build-time Open Graph card renderer.
//
// Satori and resvg produce interoperable PNGs for social crawlers.
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

// Resolve from the project root (process.cwd() at both dev and build time), so
// the path survives Astro's bundling of this module into dist/.prerender/.
const font = (file: string) => readFileSync(join(process.cwd(), 'src/assets/fonts', file));
const spectralRegular = font('Spectral-Regular.ttf');
const spectralSemiBold = font('Spectral-SemiBold.ttf');

// Brand hex values (satori can't read the CSS custom properties in editorial.css,
// so the strand palette is mirrored here — keep in sync with editorial.css).
const PAPER = '#FBFAF7';
const INK = '#201d29';
const INK_SOFT = '#57525d';
const STRAND_HEX: Record<string, string> = {
  mission: '#414077', // UV violet — the photoprotection goal
  market: '#8e472f', // rust — the gray market
  approval: '#2f6256', // green — the approved spinoffs
};
// The pigment scale, matching --pigment-scale in editorial.css.
const PIGMENT =
  'linear-gradient(90deg, #F3DCC8 0%, #E4B98F 20%, #C08A5A 40%, #8A5A34 60%, #55351D 80%, #241A12 100%)';

export interface OgCardInput {
  title: string;
  threadLabel: string;
  strand: string;
}

// Keep the headline from overrunning the card: smaller type for longer titles.
function titleSize(title: string): number {
  const n = title.length;
  if (n > 86) return 50;
  if (n > 64) return 58;
  if (n > 44) return 66;
  return 74;
}

export async function renderOgCard({ title, threadLabel, strand }: OgCardInput): Promise<Buffer> {
  const accent = STRAND_HEX[strand] ?? STRAND_HEX.mission;

  const tree = {
    type: 'div',
    props: {
      style: {
        display: 'flex',
        flexDirection: 'column',
        width: '1200px',
        height: '630px',
        backgroundColor: PAPER,
        backgroundImage: 'linear-gradient(125deg, #FBFAF7 48%, #ece4da 100%)',
        fontFamily: 'Spectral',
      },
      children: [
        // Pigment-scale signature bar
        { type: 'div', props: { style: { display: 'flex', height: '10px', width: '100%', backgroundImage: PIGMENT } } },
        // Body
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              justifyContent: 'space-between',
              padding: '58px 76px 55px',
              position: 'relative',
            },
            children: [
              // Small registration rings echo the branching diagram on the homepage.
              ...[30, 54, 78].map((size) => ({
                type: 'div',
                props: { style: {
                  position: 'absolute', display: 'flex',
                  top: `${86 - size / 2}px`, right: `${111 - size / 2}px`,
                  width: `${size}px`, height: `${size}px`,
                  border: `1px solid ${accent}`, opacity: 0.48, borderRadius: '50%',
                } },
              })),
              // Top: thread eyebrow + headline
              {
                type: 'div',
                props: {
                  style: { display: 'flex', flexDirection: 'column' },
                  children: [
                    {
                      type: 'div',
                      props: {
                        style: {
                          display: 'flex',
                          fontSize: '22px',
                          fontWeight: 600,
                          letterSpacing: '3px',
                          textTransform: 'uppercase',
                          color: accent,
                        },
                        children: threadLabel,
                      },
                    },
                    {
                      type: 'div',
                      props: {
                        style: {
                          display: 'flex',
                          marginTop: '28px',
                          fontSize: `${titleSize(title)}px`,
                          fontWeight: 600,
                          lineHeight: 1.12,
                          letterSpacing: '-0.5px',
                          color: INK,
                          maxWidth: '1010px',
                        },
                        children: title,
                      },
                    },
                  ],
                },
              },
              // Bottom: strand rule + masthead row
              {
                type: 'div',
                props: {
                  style: { display: 'flex', flexDirection: 'column' },
                  children: [
                    { type: 'div', props: { style: { display: 'flex', height: '2px', width: '100%', backgroundColor: accent, marginBottom: '20px' } } },
                    {
                      type: 'div',
                      props: {
                        style: { display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', width: '100%' },
                        children: [
                          { type: 'div', props: { style: { display: 'flex', fontSize: '34px', fontWeight: 600, color: INK }, children: 'Tan Lines' } },
                          { type: 'div', props: { style: { display: 'flex', fontSize: '22px', fontWeight: 400, color: INK_SOFT }, children: 'melanotanii.com' } },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  } as const;

  const svg = await satori(tree as unknown as Parameters<typeof satori>[0], {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'Spectral', data: spectralRegular, weight: 400, style: 'normal' },
      { name: 'Spectral', data: spectralSemiBold, weight: 600, style: 'normal' },
    ],
  });

  return Buffer.from(new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng());
}
