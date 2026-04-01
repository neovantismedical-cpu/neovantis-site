# Neovantis Website

Official website for **Neovantis (Pty) Ltd** — a South African medical technology company specialising in orthopaedic trauma hardware and RF ablation pain treatment solutions.

Built with [Astro](https://astro.build) | Deployed on [Netlify](https://netlify.com)

---

## Project Structure

```
neovantis-site/
├── public/
│   ├── favicon.svg
│   └── images/              ← Drop client-provided images here
│
├── src/
│   ├── components/
│   │   ├── BlogCard.astro
│   │   ├── Footer.astro
│   │   ├── Hero.astro
│   │   ├── Logo.astro
│   │   ├── Navbar.astro
│   │   ├── ProductCard.astro
│   │   └── Section.astro
│   │
│   ├── content/
│   │   └── blog/
│   │       ├── orthopaedic-trauma-hardware-fracture-treatment.md
│   │       ├── rf-ablation-chronic-pain.md
│   │       ├── innovations-orthopaedic-implant-technology.md
│   │       └── minimally-invasive-pain-management.md
│   │
│   ├── layouts/
│   │   └── MainLayout.astro
│   │
│   ├── pages/
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── solutions.astro
│   │   ├── products.astro
│   │   ├── healthcare-professionals.astro
│   │   ├── distributors.astro
│   │   ├── contact.astro
│   │   ├── privacy-policy.astro
│   │   ├── terms.astro
│   │   ├── medical-disclaimer.astro
│   │   └── blog/
│   │       ├── index.astro
│   │       └── [slug].astro
│   │
│   └── styles/
│       └── global.css
│
├── astro.config.mjs
├── netlify.toml
├── package.json
└── README.md
```

---

## Quick Start — Run Locally

### Prerequisites
- Node.js 18+ installed ([nodejs.org](https://nodejs.org))
- npm 9+ (included with Node.js)

### Steps

```bash
# 1. Navigate into the project folder
cd neovantis-site

# 2. Install dependencies
npm install

# 3. Start local dev server
npm run dev
```

The site will be available at **http://localhost:4321**

### Other commands

| Command | Action |
|---|---|
| `npm run dev` | Start local dev server |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview production build locally |

---

## Deployment — GitHub

### First-time setup

```bash
# 1. Initialise a git repository in the project folder
git init

# 2. Stage all files
git add .

# 3. Initial commit
git commit -m "Initial Neovantis website build"

# 4. Create a new repository on GitHub (github.com/new)
#    Name: neovantis-site (or your preferred name)
#    Visibility: Private recommended

# 5. Link your local repo to GitHub
git remote add origin https://github.com/YOUR_USERNAME/neovantis-site.git

# 6. Push to GitHub
git branch -M main
git push -u origin main
```

### Subsequent updates

```bash
git add .
git commit -m "describe your change"
git push
```

---

## Deployment — Netlify

### Option A: Connect via Netlify UI (recommended)

1. Go to [netlify.com](https://netlify.com) and log in or create an account
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub** and authorise Netlify
4. Select the `neovantis-site` repository
5. Netlify will auto-detect the build settings from `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
6. Click **"Deploy site"**

Netlify will build and deploy automatically. Every push to `main` branch triggers a new deployment.

### Option B: Deploy via Netlify CLI

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login
netlify login

# From inside the project folder — build and deploy
npm run build
netlify deploy --prod --dir dist
```

### Setting a Custom Domain

1. In the Netlify dashboard, go to **Site settings → Domain management**
2. Click **"Add custom domain"**
3. Enter `neovantis.co.za` (and `www.neovantis.co.za`)
4. Update your DNS at your domain registrar:
   - **CNAME record:** `www` → your Netlify subdomain (e.g. `neovantis-xyz.netlify.app`)
   - **A record:** `@` → Netlify's load balancer IP (shown in Netlify dashboard)
5. Netlify provisions a free SSL certificate automatically via Let's Encrypt

---

## Netlify Forms Setup

Contact and distributor forms use Netlify Forms. They work automatically on Netlify-hosted deployments — no additional configuration required.

To view form submissions:
1. In Netlify dashboard → **Forms**
2. All submissions from `contact` and `distributor-enquiry` forms appear here
3. Set up email notifications: **Forms → Settings → Form notifications**

---

## Adding or Editing Blog Posts

Blog posts live in `src/content/blog/` as Markdown files.

### Creating a new post

1. Create a new file: `src/content/blog/your-post-slug.md`
2. Add frontmatter at the top:

```markdown
---
slug: "your-post-slug"
title: "Your Article Title"
description: "SEO meta description — 140–160 characters"
date: "2024-04-01"
tag: "Orthopaedics"
author: "Neovantis Clinical Team"
image: "https://picsum.photos/id/XXX/1200/600"
---

## Your Content Here

Write your article content in standard Markdown.
```

3. Add the post slug to the posts array in `src/pages/blog/index.astro` for it to appear in the blog listing.

---

## Adding Real Images

Replace placeholder image URLs with real images:

1. Place images in `public/images/`
2. Reference them as `/images/your-image.jpg` in component props and page files
3. Recommended image sizes:
   - Hero backgrounds: 1920×1080px
   - Product images: 800×600px
   - Blog thumbnails: 800×500px

---

## Updating Company Information

| Item | File |
|---|---|
| Phone / WhatsApp / Email | `src/components/Footer.astro` + `src/pages/contact.astro` |
| Logo SVG | `src/components/Logo.astro` |
| Site URL (for canonical/OG) | `astro.config.mjs` → `site` field |
| Schema markup | `src/layouts/MainLayout.astro` |

---

## Technology Stack

| Layer | Technology |
|---|---|
| Framework | Astro 4.x |
| Styling | Custom CSS (no framework) |
| Fonts | Google Fonts — Barlow Condensed, Barlow, Source Sans 3 |
| Forms | Netlify Forms |
| Hosting | Netlify |
| Content | Markdown files |

---

## Checklist Before Launch

- [ ] Replace all placeholder images with real Neovantis product and team photography
- [ ] Confirm phone, WhatsApp, and email details in Footer and Contact page
- [ ] Update `site` URL in `astro.config.mjs` to the live domain
- [ ] Connect custom domain in Netlify and verify SSL
- [ ] Test all Netlify Forms on the live URL
- [ ] Set up form email notifications in Netlify dashboard
- [ ] Review Medical Disclaimer and Privacy Policy with legal counsel
- [ ] Submit sitemap to Google Search Console: `https://neovantis.co.za/sitemap-index.xml`

---

## Support

For technical issues with this website build, contact your developer.
For Neovantis business enquiries: **info@neovantis.co.za** | **031 463 1188**
