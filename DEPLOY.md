# IRO Creative Studio — Deploy Guide

Every time Claude makes code changes, follow these steps to push them live.

---

## One-time setup (do this once)

### 1 — Create a GitHub repo

1. Go to [github.com](https://github.com) and sign in
2. Click **New repository** (the green button, top-right)
3. Name it: `iro-creative-studio`
4. Set visibility to **Private** (or Public — your call)
5. **Do NOT** tick "Add a README" — leave everything unchecked
6. Click **Create repository**

### 2 — Upload your code

GitHub will show you a page with instructions. Use the **"uploading an existing file"** link (it's small text near the top).

Drag and drop the entire folder contents into the upload area:

```
index.html
netlify.toml
css/
js/
projects/
```

> **Tip:** Select all files/folders inside `rohankhati/` and drag them in. Don't drag the `rohankhati` folder itself — drag what's *inside* it.

Click **Commit changes**.

### 3 — Connect Netlify to GitHub

1. Go to [app.netlify.com](https://app.netlify.com) and sign in
2. Click **Add new site → Import an existing project**
3. Choose **GitHub** and authorise Netlify if prompted
4. Select your `iro-creative-studio` repo
5. Build settings — leave everything blank:
   - Build command: *(empty)*
   - Publish directory: `.` (just a dot)
6. Click **Deploy site**

Netlify will assign you a random URL like `rainbow-cake-123.netlify.app`.

### 4 — Connect your custom domain

1. In Netlify: **Site settings → Domain management → Add domain**
2. Type `irocreativestudio.com` and follow the DNS instructions
3. Netlify will also auto-provision an SSL certificate (free)

---

## Every time you update the site

After Claude makes code changes, here's what you do:

1. **Open your GitHub repo** — `github.com/YOUR_USERNAME/iro-creative-studio`
2. **Navigate to the file** that changed (e.g. `js/projects.js`)
3. Click the **pencil icon** (Edit) → paste the new code → **Commit changes**

   — OR —

   Drag and drop new/updated files using **Add file → Upload files**

4. Netlify detects the commit automatically and **redeploys within ~30 seconds**

That's it. No CLI, no build step.

---

## Adding a new project (the repeating workflow)

Each new project requires exactly 3 things:

| File | What to do |
|---|---|
| `js/projects.js` | Add a new object to the `PROJECTS` array |
| `css/style.css` | Add a CSS block for the card thumbnail |
| `projects/your-project.html` | Create the case study page (copy `_template.html`) |

Claude handles all of this. You just copy the new files to GitHub.

---

## Folder structure reference

```
iro-creative-studio/
├── index.html              ← Homepage (rarely touched)
├── netlify.toml            ← Netlify config (never touch)
├── css/
│   └── style.css           ← All styles + card thumbnails
├── js/
│   ├── projects.js         ← YOUR CMS — add projects here
│   └── app.js              ← Site behaviour (rarely touched)
└── projects/
    ├── _template.html      ← Blank template for new projects
    ├── koji-cafe.html      ← Case study
    └── verdant-labs.html   ← Case study
```

---

## Contact form (already set up)

The form submits to Google Apps Script. No changes needed unless you want a different email address receiving the submissions. The script URL is in `js/app.js`.
