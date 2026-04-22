/* ================================================================
   IRO Creative Studio — js/animations.js
   ─────────────────────────────────────────────────────────────────
   Heavyweight animation engine. Loads AFTER app.js.
   Uses: GSAP 3.12 + ScrollTrigger + Lenis (loaded via CDN in HTML)

   STEP 1 — Lenis, Cursor, Hero entrance, Nav
   STEP 2 — Marquee infinite loop (GSAP-driven)
   ================================================================ */

(function () {
  'use strict';

  if (typeof gsap === 'undefined') {
    console.warn('[IRO] GSAP not loaded — animations skipped.');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  document.documentElement.classList.add('js-loaded');
  document.body.classList.add('js-loaded');

  const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;


  /* ════════════════════════════════════════════════════════════
     1. LENIS SMOOTH SCROLL
     ════════════════════════════════════════════════════════════ */
  let lenis = null;
  if (typeof Lenis !== 'undefined' && !reducedMotion) {
    lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const id = a.getAttribute('href');
        if (id && id.length > 1) {
          const target = document.querySelector(id);
          if (target) {
            e.preventDefault();
            lenis.scrollTo(target, { offset: -20, duration: 1.4 });
          }
        }
      });
    });
  }




  /* ════════════════════════════════════════════════════════════
     3. WORD-SPLIT UTILITY
     ════════════════════════════════════════════════════════════ */
  function splitWords(el) {
    if (!el || el.dataset.split === 'done') return [];

    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
    const textNodes = [];
    let node;
    while ((node = walker.nextNode())) textNodes.push(node);

    textNodes.forEach((textNode) => {
      const parent = textNode.parentNode;
      if (!parent) return;
      const text = textNode.textContent;
      if (!text.trim()) return;

      const frag = document.createDocumentFragment();
      const parts = text.split(/(\s+)/);
      parts.forEach((part) => {
        if (/^\s+$/.test(part)) {
          frag.appendChild(document.createTextNode(part));
        } else if (part.length) {
          const wrap = document.createElement('span');
          wrap.className = 'split-word';
          const inner = document.createElement('span');
          inner.className = 'split-word-inner';
          inner.textContent = part;
          wrap.appendChild(inner);
          frag.appendChild(wrap);
        }
      });
      parent.replaceChild(frag, textNode);
    });

    el.dataset.split = 'done';
    return el.querySelectorAll('.split-word-inner');
  }


  /* ════════════════════════════════════════════════════════════
     4. HERO ENTRANCE TIMELINE — punchy, ~1.2s core
     ════════════════════════════════════════════════════════════ */
  function initHero() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const headline = hero.querySelector('h1');
    const location = hero.querySelector('.hero-location');
    const divider  = hero.querySelector('.hero-divider');
    const desc     = hero.querySelector('.hero-desc');
    const buttons  = hero.querySelector('.hero-buttons');
    const kanjiBg  = hero.querySelector('.hero-kanji-bg');

    let words = [];
    if (headline) {
      const morph = headline.querySelector('.hero-morph');
      let morphPlaceholder = null;
      if (morph) {
        morphPlaceholder = document.createComment('morph');
        morph.parentNode.replaceChild(morphPlaceholder, morph);
      }
      words = Array.from(splitWords(headline));
      if (morph && morphPlaceholder) {
        morphPlaceholder.parentNode.replaceChild(morph, morphPlaceholder);
      }
    }

    gsap.set([location, divider, desc, buttons].filter(Boolean), { y: 18 });

    const tl = gsap.timeline({
      defaults: { ease: 'expo.out' },
      delay: 0.2,
    });

    if (kanjiBg) {
      gsap.set(kanjiBg, { yPercent: -50 });
      tl.to(kanjiBg, { opacity: 1, scale: 1, yPercent: -50, duration: 1.8, ease: 'expo.out' }, 0);
    }
    if (location) {
      tl.to(location, { opacity: 1, y: 0, duration: 0.7 }, 0);
    }
    if (words.length) {
      tl.to(words, { y: '0%', duration: 1.0, stagger: 0.05, ease: 'expo.out' }, 0.1);
    }

    const morph = hero.querySelector('.hero-morph');
    if (morph) {
      gsap.set(morph, { opacity: 0, y: 20 });
      tl.to(morph, { opacity: 1, y: 0, duration: 0.9 }, 0.25);
    }

    if (divider) tl.to(divider, { opacity: 1, y: 0, duration: 0.7 }, 0.55);
    if (desc)    tl.to(desc,    { opacity: 1, y: 0, duration: 0.7 }, 0.65);
    if (buttons) tl.to(buttons, { opacity: 1, y: 0, duration: 0.7 }, 0.78);

    return tl;
  }


  /* ════════════════════════════════════════════════════════════
     5. NAV ENTRANCE + SCROLL BEHAVIOUR
     ════════════════════════════════════════════════════════════ */
  function initNav() {
    const nav = document.getElementById('nav');
    if (!nav) return;

    setTimeout(() => nav.classList.add('nav-ready'), 100);

    const handleScroll = () => {
      const y = lenis ? lenis.scroll : window.scrollY;
      nav.classList.toggle('scrolled', y > 60);
    };

    if (lenis) {
      lenis.on('scroll', handleScroll);
    } else {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }
  }


  /* ════════════════════════════════════════════════════════════
     6. MARQUEE — GSAP infinite loop with hover slow-down
     ════════════════════════════════════════════════════════════ */
  function initMarquee() {
    const marquee = document.querySelector('.iro-marquee');
    if (!marquee) return;

    const track = marquee.querySelector('.iro-marquee-track');
    if (!track) return;

    // Duplicate the items so we can loop seamlessly.
    // We need at least 2x the viewport width.
    const originalHTML = track.innerHTML;
    track.innerHTML = originalHTML + originalHTML;

    // Wait one frame for layout
    requestAnimationFrame(() => {
      const trackWidth = track.scrollWidth;
      const halfWidth = trackWidth / 2; // since we duplicated

      // Speed: pixels per second (slower = more elegant)
      const speed = 60;
      const duration = halfWidth / speed;

      const tween = gsap.to(track, {
        x: -halfWidth,
        duration: duration,
        ease: 'none',
        repeat: -1,
      });

      // Hover slows down (doesn't stop) — feels alive
      let targetSpeed = 1;
      marquee.addEventListener('mouseenter', () => { targetSpeed = 0.25; });
      marquee.addEventListener('mouseleave', () => { targetSpeed = 1; });

      // Smooth lerp toward target speed
      gsap.ticker.add(() => {
        const current = tween.timeScale();
        const next = current + (targetSpeed - current) * 0.06;
        tween.timeScale(next);
      });
    });
  }


  /* ════════════════════════════════════════════════════════════
     INIT
     ════════════════════════════════════════════════════════════ */
  function init() {
    initHero();
    initNav();
    initMarquee();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
