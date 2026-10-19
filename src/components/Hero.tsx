import { useRef } from 'react';
import { useHeroScroll } from '../hooks/useHeroScroll';
import { SEQ_FIRST_FRAME, BEATS } from '../lib/assets';

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const stillRef = useRef<HTMLImageElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLElement>(null);
  const heroDataRef = useRef<HTMLElement>(null);
  const beatRefs = useRef<(HTMLDivElement | null)[]>([]);

  useHeroScroll({
    heroRef: heroRef as React.RefObject<HTMLElement | null>,
    videoRef: videoRef as React.RefObject<HTMLVideoElement | null>,
    stillRef: stillRef as React.RefObject<HTMLImageElement | null>,
    wrapRef: wrapRef as React.RefObject<HTMLDivElement | null>,
    progressBarRef: progressBarRef as React.RefObject<HTMLElement | null>,
    beatRefs: beatRefs as React.RefObject<(HTMLDivElement | null)[]>,
    heroDataRef: heroDataRef as React.RefObject<HTMLElement | null>,
  });

  return (
    <section
      className="hero"
      id="cinema"
      data-phase="0"
      ref={(el) => {
        (heroRef as React.MutableRefObject<HTMLElement | null>).current = el;
        (heroDataRef as React.MutableRefObject<HTMLElement | null>).current = el;
      }}
    >
      <div className="stage">
        {/* Orb: still + video */}
        <div className="orb-wrap" ref={wrapRef}>
          <img
            className="orb orb-still"
            ref={stillRef}
            src={SEQ_FIRST_FRAME}
            width={1440}
            height={2560}
            alt="A living sphere of vibrant pink, turquoise and yellow signals"
          />
          <video
            className="orb"
            id="orb"
            ref={videoRef}
            muted
            playsInline
            loop
            autoPlay
            preload="none"
            width={1080}
            height={1920}
            aria-hidden="true"
          />
        </div>

        {/* Gradient overlay */}
        <div className="stage-overlay" aria-hidden="true" />

        {/* Hero grid — opening state */}
        <div className="hero-grid">
          <div className="eyebrow mono">
            <span className="dot" />
            INDEPENDENT CREATIVE STUDIO
            <br />
            EXPERIMENT NO. 001
          </div>
          <div className="eyebrow mono top-right">
            DIGITAL EXPERIENCES
            <br />
            FOR PEOPLE WHO FEEL MORE
          </div>

          <h1 className="headline">
            <span className="h1a">GOOD</span>
            <span className="h1b">
              CHA<em>O</em>S.
            </span>
          </h1>

          <div className="bottom-left">
            <span className="mono">SCROLL TO DISTURB THE SIGNAL ↓</span>
            <strong>
              We make the familiar feel <i>impossible.</i>
            </strong>
          </div>

          <div className="bottom-right mono">
            <span className="scroll-cue">
              SCROLL TO EXPLORE <i>↓</i>
            </span>
          </div>
        </div>

        {/* Scroll beats */}
        {BEATS.map((beat, i) => (
          <div
            key={beat.phase}
            className={`beat beat-${i + 1} ${beat.align === 'right' ? 'beat-right' : ''}`}
            data-start={beat.start}
            data-end={beat.end}
            ref={(el) => { beatRefs.current[i] = el; }}
          >
            <span className="mono">{beat.phase}</span>
            <h2>
              {beat.heading.split('\n').map((line, j) => (
                <span key={j}>
                  {line}
                  {j < beat.heading.split('\n').length - 1 && <br />}
                </span>
              ))}
            </h2>
            <p>{beat.body}</p>
          </div>
        ))}

        {/* Vertical progress bar */}
        <div className="progress">
          <i
            id="progress-bar"
            ref={progressBarRef as React.RefObject<HTMLElement>}
          />
        </div>
      </div>
    </section>
  );
}
