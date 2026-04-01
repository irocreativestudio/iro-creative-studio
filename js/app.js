/* ================================================================
   IRO Creative Studio — js/app.js
   All site behaviour: nav, animations, form, scroll reveal.
   You don't normally need to edit this file.
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. RENDER WORK GRID (from projects.js data) ── */
  renderWorkGrid();

  /* ── 2. SCROLL REVEAL ── */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ── 3. NAV SCROLL SHRINK ── */
  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    });
  }

  /* ── 4. CURSOR GLOW + KANJI PROXIMITY LIGHT ── */
  const hero      = document.getElementById('hero');
  const kanjiBg   = document.querySelector('.hero-kanji-bg');

  if (hero && kanjiBg) {
    // Create the floating glow orb
    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);

    let mouseX = -999, mouseY = -999;
    let glowX  = -999, glowY  = -999;
    let isInHero = false;

    hero.addEventListener('mouseenter', () => {
      isInHero = true;
      glow.classList.add('visible');
    });
    hero.addEventListener('mouseleave', () => {
      isInHero = false;
      glow.classList.remove('visible');
      kanjiBg.style.setProperty('--glow-x', '-999px');
      kanjiBg.style.setProperty('--glow-y', '-999px');
    });

    hero.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Smooth animation loop with parallax offset
    function animateGlow() {
      if (isInHero) {
        // Smooth lerp for the floating glow orb
        glowX += (mouseX - glowX) * 0.12;
        glowY += (mouseY - glowY) * 0.12;
        glow.style.left = glowX + 'px';
        glow.style.top  = glowY + 'px';

        // Parallax: light behind kanji moves slower (depth illusion)
        const kanjiRect = kanjiBg.getBoundingClientRect();
        const parallaxFactor = 0.7; // slower = feels deeper behind
        const localX = (glowX - kanjiRect.left) * parallaxFactor + (kanjiRect.width * (1 - parallaxFactor) / 2);
        const localY = (glowY - kanjiRect.top)  * parallaxFactor + (kanjiRect.height * (1 - parallaxFactor) / 2);

        kanjiBg.style.setProperty('--glow-x', localX + 'px');
        kanjiBg.style.setProperty('--glow-y', localY + 'px');
      }
      requestAnimationFrame(animateGlow);
    }
    animateGlow();
  }

  /* ── 5. IRO ↔ 色 MORPH ANIMATION ── */
  const morph = document.getElementById('heroMorph');
  if (morph) {
    let showKanji = false;
    setInterval(() => {
      showKanji = !showKanji;
      morph.classList.toggle('show-kanji', showKanji);
    }, 3000);
  }

  /* ── 6. CONTACT FORM (Google Apps Script) ── */
  const form   = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (form && status) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      status.textContent = 'Sending…';
      status.style.color = 'var(--cyan)';
      status.style.opacity = '1';

      const data = Object.fromEntries(new FormData(form));
      try {
        await fetch(
          'https://script.google.com/macros/s/AKfycbxkppCDv_ANycIuw7uy2ji_lt570G8KOT4sX9oJbXgfgypsRrHfZCURTvgTj1i0gaTOCA/exec',
          { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }
        );
        status.textContent = "Message sent — we'll be in touch!";
        status.style.color = 'var(--cyan)';
        form.reset();
        setTimeout(() => { status.style.opacity = '0'; }, 5000);
      } catch (err) {
        status.textContent = 'Something went wrong. Try emailing us directly.';
        status.style.color = 'var(--coral)';
      }
    });
  }

});

/* ── MOBILE NAV (called inline from HTML) ── */
function toggleMobileNav() {
  document.getElementById('mobileNav').classList.toggle('open');
}
