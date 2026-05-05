/* ============================================================
   IRO Creative Studio — engines.js
   AI Engines product page interactions.
   ============================================================ */

/* ── Table toggle ── */
let tableOpen = false;
function toggleTable() {
  tableOpen = !tableOpen;
  const extra = document.getElementById('tableExtra');
  const gradient = document.getElementById('tableGradient');
  const btn = document.getElementById('seeMoreBtn');
  const label = document.getElementById('seeMoreLabel');
  const wrap = document.getElementById('tableWrap');
  if (tableOpen) {
    extra.classList.add('open');
    gradient.classList.add('hidden');
    btn.classList.add('open');
    wrap.classList.add('open');
    label.textContent = 'See less';
  } else {
    extra.classList.remove('open');
    gradient.classList.remove('hidden');
    btn.classList.remove('open');
    wrap.classList.remove('open');
    label.textContent = 'See all 20 data points';
  }
}

/* ── Engine interest toggle ── */
function toggleEngine(btn) {
  const card = btn.closest('.engine-card');
  const isActive = card.classList.toggle('selected');
  btn.classList.toggle('active', isActive);

  if (isActive) {
    btn.textContent = '✓ Interested';
    btn.style.background = 'transparent';
    btn.style.color = 'var(--orange)';
  } else {
    btn.textContent = 'Interested';
    btn.style.background = 'var(--orange)';
    btn.style.color = '#fff';
  }
}

/* ── Scroll to waitlist ── */
function scrollToWaitlist(e) {
  e.preventDefault();
  document.getElementById('waitlist').scrollIntoView({ behavior: 'smooth' });
}

/* ── Waitlist form (Google Apps Script Integration) ── */
async function submitWaitlist(e) {
  e.preventDefault();
  
  // Replace this with your existing Google Apps Script URL
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxVhswNj9rGzObeUggFK0UaguUBMZ9Vlubsu0ItT3MxVEyDc47_BlEuCAhLGo098P4yhw/exec';
  
  const form = document.getElementById('waitlistForm');
  const submitBtn = form.querySelector('.form-submit');
  const originalBtnText = submitBtn.textContent;
  
  submitBtn.textContent = 'Submitting...';
  submitBtn.disabled = true;

  // Gather selected engines by checking which cards have the 'selected' class
  const selectedEngineNodes = document.querySelectorAll('.engine-card.selected .card-name');
  const selectedEngines = Array.from(selectedEngineNodes).map(node => node.textContent.replace(/\s+/g, ' ').trim()).join(', ');
  
  const payload = {
    formType: 'waitlist', // This tells the script which sheet to use!
    name: document.getElementById('wl-name').value,
    industry: document.getElementById('wl-industry').value,
    brand: document.getElementById('wl-brand').value,
    email: document.getElementById('wl-email').value,
    selectedEngines: selectedEngines || 'None Selected'
  };

  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      form.style.display = 'none';
      document.getElementById('waitlistSuccess').classList.add('visible');
    } else {
      alert('Something went wrong. Please try again.');
      submitBtn.textContent = originalBtnText;
      submitBtn.disabled = false;
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    if (GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_SCRIPT_URL_HERE') {
      console.log('Demo mode: Form hidden, success shown.');
      form.style.display = 'none';
      document.getElementById('waitlistSuccess').classList.add('visible');
    } else {
      alert('Network error. Please try again.');
      submitBtn.textContent = originalBtnText;
      submitBtn.disabled = false;
    }
  }
}

/* ── Reveal-on-scroll animation ── */
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.engine-card, .mode-card, .table-intro, .waitlist-inner, .hero > div, .footer-cta').forEach(el => {
    el.classList.add('reveal-el');
    observer.observe(el);
  });
});

/* ── Parallax scroll effect ── */
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  
  // Hero background subtle shift
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.style.backgroundPositionY = `${scrolled * 0.4}px`;
  }
});
