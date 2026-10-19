// ─── Media asset registry ────────────────────────────────────────────────────
// All URLs come from the interference.json asset map.
// Do NOT add saturation or contrast filters to these assets.

export const FONTS_URL =
  'https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Space+Grotesk:wght@400;500;600;700&display=swap';

export const VIDEO_DESKTOP =
  'https://media.scrollhaus.ai/sites/interference/assets/orb-1080.mp4';

export const VIDEO_PHONE =
  'https://media.scrollhaus.ai/sites/interference/assets/orb-720.mp4';

export const SEQ_FIRST_FRAME =
  'https://media.scrollhaus.ai/sites/interference/assets/seq/001.webp';

export const SEQ_FRAME_080 =
  'https://media.scrollhaus.ai/sites/interference/assets/seq/080.webp';

export const SEQ_FRAME_235 =
  'https://media.scrollhaus.ai/sites/interference/assets/seq/235.webp';

export const SEQ_FRAME_395 =
  'https://media.scrollhaus.ai/sites/interference/assets/seq/395.webp';

export const POSTER =
  'https://media.scrollhaus.ai/thumbs/interference.19a5c4c7a2b5.webp';

// Design tokens (mirrors CSS custom properties)
export const TOKENS = {
  black: '#070707',
  cream: '#ece9df',
  pink: '#f677a5',
  yellow: '#e9f36b',
  aqua: '#62d7cc',
  pinkDark: '#eb5685',
  dark: '#121212',
} as const;

// Hero scroll beats
export interface Beat {
  phase: string;
  label: string;
  heading: string;
  body: string;
  start: number;
  end: number;
  align: 'left' | 'right';
}

export const BEATS: Beat[] = [
  {
    phase: '01 / INTERRUPT',
    label: '01',
    heading: 'Break the\npattern.',
    body: "Ordinary is easy to recognize. We build the thing you can't quite explain — and can't stop looking at.",
    start: 0.17,
    end: 0.35,
    align: 'left',
  },
  {
    phase: '02 / RECOMPOSE',
    label: '02',
    heading: 'Colour outside\nthe code.',
    body: 'Every pixel has a pulse. Every interaction has a reason to exist.',
    start: 0.36,
    end: 0.55,
    align: 'right',
  },
  {
    phase: '03 / AMPLIFY',
    label: '03',
    heading: 'Make some\nbeautiful noise.',
    body: 'We turn bold ideas into digital worlds that move, react and stay with you.',
    start: 0.56,
    end: 0.76,
    align: 'left',
  },
  {
    phase: '04 / REMEMBER',
    label: '04',
    heading: 'Leave a\nsignal.',
    body: "The best work doesn't just get seen. It gets felt.",
    start: 0.77,
    end: 1.0,
    align: 'right',
  },
];
