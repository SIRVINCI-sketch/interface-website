/**
 * NoiseOverlay
 * Renders a fixed SVG fractal noise overlay — identical to the reference's
 * body::before noise filter, but as a React component to avoid lightningcss
 * issues with percent-encoded data URIs in minified builds.
 */
export default function NoiseOverlay() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 30,
        pointerEvents: 'none',
        opacity: 0.08,
      }}
    >
      <svg
        viewBox="0 0 180 180"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      >
        <filter id="noise-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves={3}
            stitchTiles="stitch"
          />
        </filter>
        <rect
          width="100%"
          height="100%"
          filter="url(#noise-filter)"
          opacity="0.15"
        />
      </svg>
    </div>
  );
}
