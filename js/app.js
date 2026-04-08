/* ================================================================
   IRO Creative Studio — js/app.js
   All site behaviour: nav, animations, form, scroll reveal.
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

  /* ── 4. TORCH EFFECT on hero kanji (desktop only) ── */
  const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
  const heroSection = document.querySelector('.hero');
  const heroKanji  = document.querySelector('.hero-kanji-bg');
  if (!isTouch && heroSection && heroKanji) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroKanji.getBoundingClientRect();
      heroKanji.style.setProperty('--torch-x', (e.clientX - rect.left) + 'px');
      heroKanji.style.setProperty('--torch-y', (e.clientY - rect.top)  + 'px');
    });
    heroSection.addEventListener('mouseleave', () => {
      heroKanji.style.setProperty('--torch-x', '-600px');
      heroKanji.style.setProperty('--torch-y', '-600px');
    });
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

  /* ── 5. CONTACT FORM (Google Apps Script) ── */
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
  const mobileNav = document.getElementById('mobileNav');
  const hamburger = document.getElementById('hamburger');
  const isOpen = mobileNav.classList.toggle('open');
  if (hamburger) hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}

/* ── COPY EMAIL (called inline from HTML) ── */
function copyEmail() {
  navigator.clipboard.writeText('irocreativestudio@gmail.com').then(() => {
    const tooltip = document.getElementById('copyTooltip');
    if (tooltip) {
      tooltip.classList.add('show');
      setTimeout(() => { tooltip.classList.remove('show'); }, 1500);
    }
  });
}
