/* ================================================================
   IRO Creative Studio — js/projects.js
   ================================================================ */

const PROJECTS = [

  /* ── 01  PICCIO'S PIZZAS ──────────────────────────────────── */
  {
    name:        'Piccio\'s Pizzas',
    description: 'Heritage brand identity for a century-old Italian-American pizzeria in New York City.',
    tags:        ['Branding', 'Logo System', 'Signage'],
    link:        'projects/piccios-pizzas.html',
    size:        'full',
    thumb: `
      <div class="proj-piccios">
        <div class="proj-piccios-deco"></div>
        <img class="proj-piccios-cheese" src="assets/images/piccio/cheese-icon.png" alt="">
        <div class="proj-piccios-inner">
          <div class="proj-piccios-label">Brand Identity · 2025</div>
          <div class="proj-piccios-logo">Piccio's <em>Pizzas</em></div>
          <div class="proj-piccios-sub">Esd 1915 · NYC</div>
          <div class="proj-piccios-tagline">A slice of legacy, redefined.</div>
          <div class="proj-piccios-swatches">
            <div class="proj-piccios-sw" style="background:#C5282F"></div>
            <div class="proj-piccios-sw" style="background:#F5A623"></div>
            <div class="proj-piccios-sw" style="background:#FDF6ED"></div>
            <div class="proj-piccios-sw" style="background:#2B1810"></div>
          </div>
        </div>
      </div>`
  },

  /* ── 02  KŌJI CAFÉ ───────────────────────────────────────── */
  {
    name:        'Kōji Café',
    description: 'Complete brand identity system for a specialty Japanese-inspired café in Bangalore.',
    tags:        ['Branding', 'Packaging', 'Identity System'],
    link:        'projects/koji-cafe.html',
    size:        'half',
    thumb: `
      <div class="proj-koji">
        <div class="proj-koji-kanji">麹</div>
        <div class="proj-koji-inner">
          <div class="proj-koji-label">Brand Identity · 2024</div>
          <div class="proj-koji-logo">KŌJI</div>
          <div class="proj-koji-cafe">CAFÉ</div>
          <div class="proj-koji-rule"></div>
          <div class="proj-koji-swatches">
            <div class="proj-koji-swatch" style="background:#C85C3A"></div>
            <div class="proj-koji-swatch" style="background:#6B7C4E"></div>
            <div class="proj-koji-swatch" style="background:#D4A27A"></div>
            <div class="proj-koji-swatch" style="background:#F5ECD7"></div>
          </div>
        </div>
      </div>`
  },

  /* ── 03  AXION AI ────────────────────────────────────────── */
  {
    name:        'Axion AI',
    description: 'Full brand package for an AI/ML decision intelligence startup.',
    tags:        ['Branding', 'Web', 'Social & Motion'],
    link:        'projects/axion-ai.html',
    size:        'half',
    thumb: `
      <div class="proj-axion">
        <div class="proj-axion-grid"></div>
        <div class="proj-axion-nodes">
          <svg width="100%" height="100%" viewBox="0 0 300 260" fill="none">
            <line x1="220" y1="60" x2="260" y2="140" stroke="#6366F1" stroke-width="0.5" opacity="0.15"/>
            <line x1="260" y1="140" x2="200" y2="180" stroke="#6366F1" stroke-width="0.5" opacity="0.1"/>
            <line x1="220" y1="60" x2="200" y2="180" stroke="#6366F1" stroke-width="0.5" opacity="0.08"/>
            <circle cx="220" cy="60"  r="2" fill="#6366F1" opacity="0.3"/>
            <circle cx="260" cy="140" r="2" fill="#6366F1" opacity="0.25"/>
            <circle cx="200" cy="180" r="2" fill="#6366F1" opacity="0.2"/>
          </svg>
        </div>
        <div class="proj-axion-inner">
          <div class="proj-axion-mark-wrap">
            <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="18" stroke="#6366F1" stroke-width="1.2" opacity="0.7"/>
              <circle cx="24" cy="14" r="2.5" fill="#6366F1" opacity="0.8"/>
              <circle cx="33" cy="29" r="2.5" fill="#6366F1" opacity="0.8"/>
              <circle cx="15" cy="29" r="2.5" fill="#6366F1" opacity="0.8"/>
              <circle cx="24" cy="24" r="1.5" fill="#6366F1"/>
              <line x1="24" y1="16" x2="24" y2="22.5" stroke="#6366F1" stroke-width="0.6" opacity="0.4"/>
              <line x1="25.5" y1="25" x2="31" y2="28" stroke="#6366F1" stroke-width="0.6" opacity="0.4"/>
              <line x1="22.5" y1="25" x2="17" y2="28" stroke="#6366F1" stroke-width="0.6" opacity="0.4"/>
            </svg>
          </div>
          <div class="proj-axion-logo">AXION</div>
          <div class="proj-axion-sub">AI</div>
          <div class="proj-axion-tagline">Decisions at the<br>speed of data.</div>
        </div>
      </div>`
  }

];


/* ================================================================
   RENDER ENGINE
   ================================================================ */

function _buildCard(project, sizeClass) {
  const clickAttr  = project.link ? `onclick="location.href='${project.link}'"` : '';
  const cursorStyle = project.link ? 'cursor:pointer;' : '';
  const tags        = project.tags.map(t => `<span class="work-tag">${t}</span>`).join('');
  return `
    <div class="work-item ${sizeClass} reveal" ${clickAttr} style="${cursorStyle}">
      ${project.thumb || ''}
      <div class="work-item-overlay">
        <h3>${project.name}</h3>
        <p>${project.description}</p>
        ${tags}
      </div>
    </div>`;
}

function renderWorkGrid() {
  const grid = document.getElementById('workGrid');
  if (!grid) return;

  const html = PROJECTS.map((p, idx) => {
    const sizeClass = idx === 0 ? 'work-item-full' : 'work-item-half';
    return _buildCard(p, sizeClass);
  }).join('');

  grid.innerHTML = html;
}
