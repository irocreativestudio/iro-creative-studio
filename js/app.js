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

  /* ── 4b. HERO PARALLAX (scroll from hero → services) ── */
  if (!isTouch) {
    const heroVideo   = document.querySelector('.hero-video');
    const heroContent = document.querySelector('.hero-content');
    const heroKanjiEl = document.querySelector('.hero-kanji-bg');
    let parallaxTicking = false;

    const applyParallax = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      // only animate while hero is in view range
      if (y < vh * 1.2) {
        if (heroVideo)   heroVideo.style.transform   = `translate3d(0, ${y * 0.45}px, 0) scale(${1 + y * 0.00015})`;
        if (heroContent) heroContent.style.transform = `translate3d(0, ${y * 0.22}px, 0)`;
        if (heroContent) heroContent.style.opacity   = Math.max(0, 1 - y / (vh * 0.9));
        if (heroKanjiEl) heroKanjiEl.style.transform = `translate3d(0, calc(-50% + ${y * 0.3}px), 0)`;
      }
      parallaxTicking = false;
    };

    window.addEventListener('scroll', () => {
      if (!parallaxTicking) {
        requestAnimationFrame(applyParallax);
        parallaxTicking = true;
      }
    }, { passive: true });
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
    const submitBtn = form.querySelector('.form-submit');
    const requiredFields = form.querySelectorAll('[required]');
    const emailField = form.querySelector('input[type="email"]');
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function triggerShake() {
      submitBtn.classList.remove('shake');
      void submitBtn.offsetWidth;
      submitBtn.classList.add('shake');
      submitBtn.addEventListener('animationend', () => submitBtn.classList.remove('shake'), { once: true });
    }

    // When user starts typing in an errored field, restore it
    requiredFields.forEach(field => {
      field.addEventListener('input', () => {
        const isEmail = field === emailField;
        const valid = isEmail ? emailRe.test(field.value.trim()) : field.value.trim();
        if (valid) field.classList.remove('field-error');
        const anyError = [...requiredFields].some(f => f.classList.contains('field-error'));
        if (!anyError) submitBtn.textContent = 'Send message';
      });
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Validate required fields
      const invalid = [...requiredFields].filter(f => !f.value.trim());
      // Also flag email if format is wrong
      if (emailField && emailField.value.trim() && !emailRe.test(emailField.value.trim())) {
        if (!invalid.includes(emailField)) invalid.push(emailField);
      }
      if (invalid.length) {
        invalid.forEach(f => f.classList.add('field-error'));
        submitBtn.textContent = 'Fill required fields';
        triggerShake();
        return;
      }

      status.textContent = 'Sending…';
      status.style.color = 'var(--cyan)';
      status.style.opacity = '1';

      const data = Object.fromEntries(new FormData(form));
      try {
        await fetch(
          'https://script.google.com/macros/s/AKfycbxVhswNj9rGzObeUggFK0UaguUBMZ9Vlubsu0ItT3MxVEyDc47_BlEuCAhLGo098P4yhw/exec',
          { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }
        );
        status.textContent = "Message sent — we'll be in touch!";
        status.style.color = 'var(--cyan)';
        submitBtn.textContent = 'Send message';
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
  if (hamburger) {
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    hamburger.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  }
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
