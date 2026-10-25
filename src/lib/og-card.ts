// Build-time Open Graph card renderer.
//
// Each article gets a distinct 1200x630 social/SERP card instead of the one
// shared og-image.png: the pigment-scale signature across the top, the thread
// label in its strand colour, the headline in Spectral, and the masthead line.
// Rendered with satori (-> SVG) + resvg (-> PNG) at build; no runtime cost.
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

// Resolve from the project root (process.cwd() at both dev and build time), so
// the path survives Astro's bundling of this module into dist/.prerender/.
const font = (file: string) => readFileSync(join(process.cwd(), 'src/assets/fonts', file));
const spectralRegular = font('Spectral-Regular.ttf');
const spectralSemiBold = font('Spectral-SemiBold.ttf');

// Brand hex values (satori can't read the CSS custom properties in Base.astro,
// so the strand palette is mirrored here — keep in sync with Base.astro).
const PAPER = '#FBFAF7';
const INK = '#17130E';
const INK_SOFT = '#5A4F44';
const STRAND_HEX: Record<string, string> = {
  mission: '#503296', // UV violet — the photoprotection goal
  market: '#A6431F', // rust — the gray market
  approval: '#2F6A52', // green — the approved spinoffs
};
// The pigment scale, matching --pigment-scale in Base.astro.
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
        fontFamily: 'Spectral',
      },
      children: [
        // Pigment-scale signature bar
        { type: 'div', props: { style: { display: 'flex', height: '16px', width: '100%', backgroundImage: PIGMENT } } },
        // Body
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              justifyContent: 'space-between',
              padding: '76px 84px 64px',
            },
            children: [
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
                          fontSize: '26px',
                          fontWeight: 600,
                          letterSpacing: '4px',
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
                          maxWidth: '1000px',
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
                    { type: 'div', props: { style: { display: 'flex', height: '3px', width: '120px', backgroundColor: accent, marginBottom: '20px' } } },
                    {
                      type: 'div',
                      props: {
                        style: { display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', width: '100%' },
                        children: [
                          { type: 'div', props: { style: { display: 'flex', fontSize: '30px', fontWeight: 600, color: INK }, children: 'Tan Lines' } },
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
