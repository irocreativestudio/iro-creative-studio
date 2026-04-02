/* ================================================================
   IRO Creative Studio — js/projects.js
   ================================================================ */

const PROJECTS = [

  /* ── 01  KŌJI CAFÉ ───────────────────────────────────────── */
  {
    name:        'Kōji Café',
    description: 'Complete brand identity system for a specialty Japanese-inspired café in Bangalore.',
    tags:        ['Branding', 'Packaging', 'Identity System'],
    link:        'projects/koji-cafe.html',
    size:        'full',
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

  /* ── 02  VERDANT LABS ────────────────────────────────────── */
  {
    name:        'Verdant Labs',
    description: 'Brand identity for a Bangalore-based clean-tech startup.',
    tags:        ['Branding', 'Identity'],
    link:        'projects/verdant-labs.html',
    size:        'half',
    thumb: `
      <div class="proj-verdant">
        <div class="proj-verdant-grid"></div>
        <div class="proj-verdant-inner">
          <div class="proj-verdant-mark-wrap">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <polygon points="20,3 37,35 3,35" stroke="#7AB38A" stroke-width="1.5" fill="none"/>
              <polygon points="20,11 31,33 9,33" stroke="#7AB38A" stroke-width="0.75" fill="none" opacity="0.4"/>
              <circle cx="20" cy="26" r="2.5" fill="#7AB38A" opacity="0.7"/>
              <circle cx="5"  cy="34" r="1.5" fill="#7AB38A" opacity="0.35"/>
              <circle cx="35" cy="34" r="1.5" fill="#7AB38A" opacity="0.35"/>
            </svg>
          </div>
          <div class="proj-verdant-logo">VERDANT</div>
          <div class="proj-verdant-sub">LABS</div>
          <div class="proj-verdant-tagline">Clean energy.<br>Honest design.</div>
        </div>
        <div class="proj-verdant-circle-deco"></div>
      </div>`
  },

  /* ── 03  PORTO & PIMENTA ─────────────────────────────────── */
  {
    name:        'Porto & Pimenta',
    description: 'Full brand package for a Portuguese-inspired brasserie in Mumbai.',
    tags:        ['Branding', 'Web Design', 'Social Media'],
    link:        'projects/porto-pimenta.html',
    size:        'half',
    thumb: `
      <div class="proj-porto">
        <div class="proj-porto-tile"></div>
        <div class="proj-porto-inner">
          <div class="proj-porto-label">Brand · Web · Social · 2025</div>
          <div class="proj-porto-logo">Porto & Pimenta</div>
          <div class="proj-porto-sub">Brasserie</div>
          <div class="proj-porto-tagline">Seasonal plates.<br>Portuguese soul.</div>
          <div class="proj-porto-swatches">
            <div class="proj-porto-sw" style="background:#5C6B3A"></div>
            <div class="proj-porto-sw" style="background:#C8734A"></div>
            <div class="proj-porto-sw" style="background:#C6A858"></div>
            <div class="proj-porto-sw" style="background:#F0E6D6"></div>
          </div>
        </div>
        <div class="proj-porto-deco">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <circle cx="40" cy="40" r="36" stroke="#C6A858" stroke-width="1"/>
            <circle cx="40" cy="40" r="24" stroke="#C6A858" stroke-width="0.5"/>
            <path d="M40,10 C44,22 44,30 40,40 C36,30 36,22 40,10Z" fill="#C6A858"/>
            <path d="M70,40 C58,44 50,44 40,40 C50,36 58,36 70,40Z" fill="#C6A858"/>
            <path d="M40,70 C36,58 36,50 40,40 C44,50 44,58 40,70Z" fill="#C6A858"/>
            <path d="M10,40 C22,36 30,36 40,40 C30,44 22,44 10,40Z" fill="#C6A858"/>
          </svg>
        </div>
      </div>`
  },

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

  let html = '';
  let i    = 0;

  while (i < PROJECTS.length) {
    const p = PROJECTS[i];

    if (p.size === 'full') {
      html += _buildCard(p, 'work-item-full');
      i++;
    } else {
      const row = [];
      while (i < PROJECTS.length && PROJECTS[i].size === 'half' && row.length < 2) {
        row.push(PROJECTS[i]);
        i++;
      }
      const cards = row.map(p => _buildCard(p, 'work-item-half')).join('');
      html += `<div class="work-half-grid">${cards}</div>`;
    }
  }

  grid.innerHTML = html;
}
