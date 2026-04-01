/* ================================================================
   IRO Creative Studio — js/projects.js
   ----------------------------------------------------------------
   THIS IS YOUR CMS. Edit this file to add, remove, or reorder
   projects. The work grid on the homepage is auto-built from this.

   HOW TO ADD A NEW PROJECT
   ────────────────────────
   1. Copy one of the objects below and paste it into the array.
   2. Set  size: 'full'   for a hero-width card (one per row).
        or size: 'half'   for a side-by-side card (two per row).
   3. Write the thumb HTML — this is what shows inside the card.
      Copy an existing thumb block and change colours/text.
   4. Create the case study page at  projects/your-slug.html
      (copy projects/_template.html as a starting point).
   5. Push to GitHub → Netlify auto-deploys. Done.

   HOW TO REMOVE A PROJECT
   ────────────────────────
   Delete the object from the array. That's it.

   HOW TO REORDER PROJECTS
   ────────────────────────
   Cut and paste the objects into the order you want.
   Full-width items always take their own row.
   Half-width items are paired automatically (left-right).
   ================================================================ */

const PROJECTS = [

  /* ── 01  KŌJI CAFÉ ───────────────────────────────────────── */
  {
    name:        'Kōji Café',
    description: 'Complete brand identity system for a specialty Japanese-inspired café in Bangalore.',
    tags:        ['Branding', 'Packaging', 'Identity System'],
    link:        'projects/koji-cafe.html',
    size:        'full',   /* 'full' = full-width hero card */
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
    size:        'half',   /* 'half' = pairs with next half card */
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

  /* ── 03  AXION AI ────────────────────────────────────────── */
  {
    name:        'Axion AI',
    description: 'Brand identity, website, and social media for an AI decision intelligence startup.',
    tags:        ['Branding', 'Web', 'Social & Motion'],
    link:        'projects/axion-ai.html',
    size:        'half',
    thumb: `
      <div class="proj-axion">
        <div class="proj-axion-grid"></div>
        <div class="proj-axion-nodes">
          <svg width="100%" height="100%" viewBox="0 0 300 240" fill="none">
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
  },

  /* ─────────────────────────────────────────────────────────
     PASTE NEW PROJECTS ABOVE THIS LINE
     Example starter object (uncomment + fill in):

  {
    name:        'Project Name',
    description: 'One-line description shown on the card.',
    tags:        ['Tag 1', 'Tag 2'],
    link:        'projects/your-slug.html',
    size:        'half',
    thumb: `
      <div class="proj-YOUR_CLASS">
        ...your thumbnail HTML...
      </div>`
  },
     ───────────────────────────────────────────────────────── */

];


/* ================================================================
   RENDER ENGINE — you don't need to edit below this line.
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
      /* Collect up to 2 consecutive half-size projects into one row */
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
