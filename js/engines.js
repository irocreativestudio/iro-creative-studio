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
  if (tableOpen) {
    extra.classList.add('open');
    gradient.classList.add('hidden');
    btn.classList.add('open');
    label.textContent = 'See less';
  } else {
    extra.classList.remove('open');
    gradient.classList.remove('hidden');
    btn.classList.remove('open');
    label.textContent = 'See all 20 data points';
  }
}

/* ── Engine cart ── */
const selected = {}; // { id: { name, featured } }

function toggleEngine(id, name, featured) {
  const card = document.getElementById('card-' + id);
  const btn = card.querySelector('.card-btn');

  if (selected[id]) {
    delete selected[id];
    card.classList.remove('selected');
    btn.classList.remove('active');
    btn.style.background = 'var(--orange)';
    btn.style.color = '#fff';
    btn.textContent = 'Add to Cart';
  } else {
    selected[id] = { name, featured };
    card.classList.add('selected');
    btn.classList.add('active');
    btn.style.background = 'transparent';
    btn.style.color = 'var(--orange)';
    btn.textContent = '✓ Added';
  }

  updateStickyBar();
}

function updateStickyBar() {
  const bar = document.getElementById('stickyBar');
  const count = document.getElementById('stickyCount');
  const chips = document.getElementById('stickyChips');
  const ids = Object.keys(selected);

  if (ids.length === 0) {
    bar.classList.remove('visible');
    return;
  }

  bar.classList.add('visible');
  count.textContent = ids.length + ' engine' + (ids.length > 1 ? 's' : '') + ' selected';
  chips.innerHTML = ids.map(id => {
    const e = selected[id];
    return `<span class="sticky-chip${e.featured ? ' feat' : ''}">${e.name}</span>`;
  }).join('');
}

/* ── Sticky CTA scroll ── */
function scrollToWaitlist(e) {
  e.preventDefault();
  document.getElementById('waitlist').scrollIntoView({ behavior: 'smooth' });
}

/* ── Waitlist form ── */
function submitWaitlist(e) {
  e.preventDefault();
  document.getElementById('waitlistForm').style.display = 'none';
  document.getElementById('waitlistSuccess').classList.add('visible');
}
