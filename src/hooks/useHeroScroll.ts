import { useEffect, useRef, useCallback } from 'react';
import { VIDEO_DESKTOP, VIDEO_PHONE, BEATS } from '../lib/assets';

/** Returns true if this is a phone (coarse pointer, short-side ≤820px). */
export function isPhone(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    matchMedia('(pointer:coarse)').matches &&
    Math.min(screen.width, screen.height) <= 820
  );
}

/** Returns the correct video URL. */
export function videoUrl(): string {
  return isPhone() ? VIDEO_PHONE : VIDEO_DESKTOP;
}

/** Returns true if the user prefers reduced motion. */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export interface UseHeroScrollOptions {
  heroRef: React.RefObject<HTMLElement | null>;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  stillRef: React.RefObject<HTMLImageElement | null>;
  wrapRef: React.RefObject<HTMLDivElement | null>;
  progressBarRef: React.RefObject<HTMLElement | null>;
  beatRefs: React.RefObject<(HTMLDivElement | null)[]>;
  heroDataRef: React.RefObject<HTMLElement | null>;
}

/**
 * useHeroScroll
 * Manages:
 *  - Blob-fetch + playback of the orb video
 *  - Still-image slow rotation while loading
 *  - clip-path circle keeping corners hidden
 *  - Scroll velocity → playbackRate spin
 *  - Scroll progress → beat visibility, progress bar, data-phase
 */
export function useHeroScroll({
  heroRef,
  videoRef,
  stillRef,
  wrapRef,
  progressBarRef,
  beatRefs,
  heroDataRef,
}: UseHeroScrollOptions) {
  const REDUCED = prefersReducedMotion();

  const lastYRef = useRef(typeof window !== 'undefined' ? window.scrollY : 0);
  const velRef = useRef(0);
  const rateRef = useRef(1);
  const angRef = useRef(0);
  const ltRef = useRef(performance.now());
  const spinRafRef = useRef(0);
  const turnRafRef = useRef(0);
  const playingRef = useRef(false);

  const applyClip = useCallback(() => {
    const still = stillRef.current;
    if (!still) return;
    const w = Math.min(still.clientWidth, (still.clientHeight * 1440) / 2560);
    still.style.clipPath = `circle(${(w * 0.44).toFixed(1)}px at 50% 50%)`;
  }, [stillRef]);

  const spinRef = useRef<() => void>(() => {});
  const spinFn = useCallback(() => {
    const video = videoRef.current;
    velRef.current *= 0.9;
    const target = 1 + Math.min(0.8, velRef.current * 0.006);
    rateRef.current += (target - rateRef.current) * 0.12;
    if (video && Math.abs(video.playbackRate - rateRef.current) > 0.01) {
      video.playbackRate = rateRef.current;
    }
    if (velRef.current > 0.5 || Math.abs(rateRef.current - 1) > 0.01) {
      spinRafRef.current = requestAnimationFrame(spinRef.current);
    } else {
      spinRafRef.current = 0;
      if (video) video.playbackRate = 1;
      rateRef.current = 1;
    }
  }, [videoRef]);
  spinRef.current = spinFn;

  const turnRef = useRef<(now: number) => void>(() => {});
  const turnFn = useCallback(
    (now: number) => {
      const still = stillRef.current;
      if (!still) return;
      const dt = Math.min(0.05, (now - ltRef.current) / 1000);
      ltRef.current = now;
      if (!REDUCED) {
        angRef.current = (angRef.current + dt * 7.5 * rateRef.current) % 360;
        still.style.transform = `rotate(${angRef.current.toFixed(2)}deg)`;
      }
      if (!playingRef.current) {
        turnRafRef.current = requestAnimationFrame(turnRef.current);
      }
    },
    [stillRef, REDUCED]
  );
  turnRef.current = turnFn;

  const updateRef = useRef<() => void>(() => {});
  const updateFn = useCallback(() => {
    const hero = heroRef.current;
    const bar = progressBarRef.current;
    const heroEl = heroDataRef.current;
    if (!hero || !bar || !heroEl) return;

    const y = window.scrollY;
    velRef.current += Math.abs(y - lastYRef.current);
    lastYRef.current = y;

    const distance = Math.max(1, hero.offsetHeight - window.innerHeight);
    const p = Math.min(1, Math.max(0, y / distance));

    bar.style.setProperty('--p', String(p));
    heroEl.dataset.phase = p < 0.13 ? '0' : '1';

    const refs = beatRefs.current;
    BEATS.forEach((beat, i) => {
      const el = refs[i];
      if (!el) return;
      const active = p >= beat.start && p < beat.end;
      el.style.opacity = active ? '1' : '0';
      el.style.visibility = active ? 'visible' : 'hidden';
    });

    if (
      !REDUCED &&
      !spinRafRef.current &&
      y < hero.offsetHeight + window.innerHeight
    ) {
      spinRafRef.current = requestAnimationFrame(spinRef.current);
    }
  }, [heroRef, progressBarRef, heroDataRef, beatRefs, REDUCED]);
  updateRef.current = updateFn;

  useEffect(() => {
    const video = videoRef.current;
    const still = stillRef.current;
    const wrap = wrapRef.current;
    if (!video || !still || !wrap) return;

    applyClip();
    const handleResize = () => {
      applyClip();
      updateRef.current();
    };
    window.addEventListener('resize', handleResize);

    turnRafRef.current = requestAnimationFrame(turnRef.current);

    video.addEventListener(
      'playing',
      () => {
        wrap.classList.add('playing');
        playingRef.current = true;
      },
      { once: true }
    );

    const play = () => {
      if (!REDUCED && video.src) {
        video.play().catch(() => {});
      }
    };

    if (REDUCED) {
      video.removeAttribute('autoplay');
    }

    const url = videoUrl();
    let blobUrl = '';
    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.blob();
      })
      .then((blob) => {
        blobUrl = URL.createObjectURL(blob);
        video.src = blobUrl;
      })
      .catch(() => {
        video.src = url;
      })
      .finally(() => {
        video.addEventListener('loadeddata', play, { once: true });
        play();
      });

    if (!REDUCED) {
      const visChange = () => { if (!document.hidden) play(); };
      document.addEventListener('visibilitychange', visChange);
    }

    const scrollHandler = () => updateRef.current();
    window.addEventListener('scroll', scrollHandler, { passive: true });
    updateRef.current();

    return () => {
      window.removeEventListener('scroll', scrollHandler);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(spinRafRef.current);
      cancelAnimationFrame(turnRafRef.current);
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
