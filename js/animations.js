/* ============================================================
   IRO Creative Studio — js/animations.js
   ─────────────────────────────────────────────────────────────
   Heavyweight animation layer. Loaded AFTER app.js.
   Handles: Lenis smooth scroll, GSAP hero entrance,
            custom cursor, nav scroll behavior.
   Safe to delete this file to revert to original site behavior.
   ============================================================ */

(function () {

  /* Bail out if user prefers reduced motion */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  /* Wait for GSAP + Lenis to load (CDN scripts in <head>) */
  window.addEventListener('load', initAnimations);

  function initAnimations() {

    if (typeof gsap === 'undefined') {
      console.warn('[IRO] GSAP not loaded — animations skipped.');
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    /* ───────────────────────────────────────────────────────
       1. LENIS SMOOTH SCROLL
       ─────────────────────────────────────────────────────── */
    let lenis = null;
    if (typeof Lenis !== 'undefined') {
      lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        smoothTouch: false,
        touchMultiplier: 2,
      });

      lenis.on('scroll', ScrollTrigger.update);

      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    }


    /* ───────────────────────────────────────────────────────
       2. CUSTOM CURSOR (cream dot, grows on hover targets)
       ─────────────────────────────────────────────────────── */
    const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (isDesktop) {
      const cursor = document.createElement('div');
      cursor.className = 'iro-cursor';
      document.body.appendChild(cursor);
      document.body.classList.add('iro-cursor-on');

      let mouseX = 0, mouseY = 0;
      let curX = 0,   curY = 0;

      window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.classList.add('active');
      });

      window.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
      });

      /* Smooth follow loop — lerp for buttery movement */
      function tick() {
        curX += (mouseX - curX) * 0.18;
        curY += (mouseY - curY) * 0.18;
        cursor.style.transform =
          `translate(${curX}px, ${curY}px) translate(-50%, -50%)`;
        requestAnimationFrame(tick);
      }
      tick();

      /* Grow on interactive targets */
      const hoverSelectors = 'a, button, .work-item, .service-card, .btn, [onclick], input, textarea';
      const attachHover = () => {
        document.querySelectorAll(hoverSelectors).forEach(el => {
          el.addEventListener('mouseenter', () => cursor.classList.add('grow'));
          el.addEventListener('mouseleave', () => cursor.classList.remove('grow'));
        });
      };
      attachHover();

      /* Re-attach after work grid is rendered (projects.js) */
      setTimeout(attachHover, 200);
      setTimeout(attachHover, 800);
    }


    /* ───────────────────────────────────────────────────────
       3. HERO ENTRANCE TIMELINE — punchy 1.2s, 60fps
       ─────────────────────────────────────────────────────── */
    document.body.classList.add('hero-anim-ready');

    const ease = 'power3.out';

    const tl = gsap.timeline({
      defaults: { ease: ease, duration: 0.9 },
      delay: 0.15,
    });

    /* Big background kanji fades in first as a soft backdrop */
    tl.fromTo('.hero-kanji-bg',
      { opacity: 0, scale: 0.92 },
      { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' },
      0
    );

    /* Eyebrow location label */
    tl.fromTo('.hero-location',
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7 },
      0.1
    );

    /* Main headline rises fast */
    tl.fromTo('.hero h1',
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.95 },
      0.2
    );

    /* Divider line + label */
    tl.fromTo('.hero-divider',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7 },
      0.45
    );

    /* Description */
    tl.fromTo('.hero-desc',
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.75 },
      0.55
    );

    /* CTA buttons */
    tl.fromTo('.hero-buttons',
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.75 },
      0.65
    );


    /* ───────────────────────────────────────────────────────
       4. NAV SCROLL BEHAVIOR — hide on scroll down, show on up
       ─────────────────────────────────────────────────────── */
    const nav = document.getElementById('nav');
    if (nav) {
      nav.classList.add('nav-visible');
      let lastScroll = 0;

      const onScroll = () => {
        const y = window.scrollY;

        /* Premium hide-on-scroll-down behavior */
        if (y > 200 && y > lastScroll + 8) {
          nav.classList.add('nav-hidden');
          nav.classList.remove('nav-visible');
        } else if (y < lastScroll - 8 || y < 100) {
          nav.classList.remove('nav-hidden');
          nav.classList.add('nav-visible');
        }
        lastScroll = y;
      };

      /* Use Lenis scroll if available, otherwise window */
      if (lenis) {
        lenis.on('scroll', onScroll);
      } else {
        window.addEventListener('scroll', onScroll, { passive: true });
      }
    }


    /* ───────────────────────────────────────────────────────
       5. ScrollTrigger refresh after fonts load
       ─────────────────────────────────────────────────────── */
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }
  }

})();
