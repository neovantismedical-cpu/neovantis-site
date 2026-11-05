# Neovantis website refresh: handover

Internal document. Branch: `site-refresh-2026` (not pushed, not merged, not deployed).
Prepared 5 November 2026.

## 1. Repository and project

- Git root: `Neovantis Website/` (remote `https://github.com/neovantismedical-cpu/neovantis-site.git`). The Astro app lives in the nested `neovantis-site/` folder. Run every command from `neovantis-site/`.
- Your earlier uncommitted work was committed first as **"Snapshot existing uncommitted website work before refresh"** on the new branch, so nothing was lost. `main` is untouched.
- Astro 4.16.19 from the existing lockfile (`npm ci`). No dependencies were added or upgraded; `package-lock.json` is unchanged.
- **Netlify base directory:** because the app is nested, the Netlify site must have *Base directory = `neovantis-site`*. Please confirm this in Netlify (Site configuration → Build & deploy) before deploying this branch.

## 2. What changed

### Structure

| Area | Files |
|---|---|
| Central business facts, specialities, form options, navigation | `src/config/site.ts` |
| Layout, SEO, JSON-LD, noindex switch, skip link | `src/layouts/BaseLayout.astro`, `src/lib/schema.ts` |
| Header with accessible Specialities menu, footer | `src/components/Header.astro`, `Footer.astro` |
| Reusable blocks | `SpecialityCards`, `SpecialityIcon`, `CtaBand`, `Credentials`, `ArticleCard`, `Breadcrumbs`, `EnquiryForm` |
| Pages | `/`, `/about/`, `/specialities/` + six pages from one template, `/support/`, `/insights/` + articles, `/contact/`, three legal pages, `/thank-you/`, `404` |
| Insights (single source, draft flag) | `src/content/insights/*.md`, `src/content/config.ts`, `src/lib/insights.ts` |
| Sitemap and robots | `src/pages/sitemap.xml.ts`, `src/pages/robots.txt.ts` |
| Redirects | `public/_redirects` |
| Netlify headers / noindex | `netlify.toml`, build hook in `astro.config.mjs` (writes `dist/_headers`) |
| Design system | `src/styles/global.css`; fonts self-hosted in `public/fonts/` |
| Image derivatives | `scripts/optimise-images.mjs` → `public/images/optimised/` |

### Retired material (kept, not built)

All previous pages, blog posts, components, the old layout and stylesheet were moved to `legacy-archive/`, outside `src/`, so they are not built or published but remain available for reference. They also remain in Git history (snapshot commit).

The old site contained claims that this refresh removes from the public build: "MedicalBusiness" schema, WhatsApp number, office hours, "responds within 1 business day", "reliable delivery", "responsive technical support", "clinically trusted", "patient outcomes", wider trauma plating/nailing ranges, distributor partnership offers, "(Pty) Ltd", a placeholder LinkedIn link, and placeholder `picsum.photos` images.

The earlier draft speciality pages (`/orthopaedic-trauma`, `/neuro-plating`, and so on) were retired and their URLs redirect to the new speciality pages.

### Design

- Deep navy header and footer, which let us use the approved white-text logo (`public/images/neovantis-logo.png`, verified: 461×154, transparent) **unaltered**.
- Medical blue `#1f7fb6` kept for accents. Text and button blue is the darker `#17669a` (6.2:1 on white) because `#1f7fb6` is only 4.4:1 and fails AA for body text.
- Barlow (headings, mixed case) and Source Sans 3 (body), self-hosted. This removes the duplicate Google Fonts loading and the third-party font request.
- Editorial homepage: headline, tagline and two buttons on the left; image composition on the right on desktop. No sliders, counters or animation; `prefers-reduced-motion` respected.
- No floating or sticky enquiry button on mobile, so content is never obscured.

### Analytics

No GA4 or GTM existed. Nothing is loaded unless `PUBLIC_GTM_ID` is set at build time. When it is, these events are pushed to `dataLayer` without personal data:

| Event | Parameters |
|---|---|
| `speciality_enquiry_click` | `speciality` (slug) |
| `phone_click`, `email_click` | `location` (footer/page) |
| `enquiry_submitted` | `speciality`, `enquiry_type`; fired **only after** the form receiver accepts the submission |

A thank-you page view alone is not treated as a lead. Before enabling analytics, update the privacy policy and decide on cookie consent (see CONTENT_CONFIRMATIONS.md).

## 3. Images

Your original image files are **all kept unchanged** in `public/images/` (and `../Images/`). Optimised versions were saved as **new files** in `public/images/optimised/` by `npm run images`.

### Reused

| Original file | New file(s) | Used on | Notes |
|---|---|---|---|
| `neovantis-logo.png` | used as-is | Header, footer, structured data | Approved logo, verified |
| `K-Wire & Pin Set.png` | `k-wire-tray-illustration-{640,960,1280}.webp` | Homepage hero, Orthopaedics page | Captioned "Illustrative image" |
| `Thermocouple RF Electrodes.png` | `rf-electrodes-illustration-{480,800}.webp` | Homepage hero, Pain Management page | Captioned "Illustrative image" |
| `RF Procedure Kit.png` | `rf-consumables-illustration-{800,1080}.webp` | Draft article 2 | Draft only |
| `distributors and partners hero.png` | `procurement-meeting-illustration-{800,1200}.webp` (centre crop 16:9) | Draft article 1 | Draft only |
| `neovantis-logo.png` (derived) | `og-neovantis.png` (share image), `icon-32/180/512.png` (favicon) | Site-wide | **Derived from the logo; needs brand approval** |

### Images I was unsure about

- **All product and clinical scenes appear to be AI-generated or composited**, not photographs of Neovantis products. I only used the two that match a confirmed speciality scope, and labelled them as illustrative. Please confirm you hold the rights and are comfortable using them. If not, the pages fall back cleanly to the brand-graphic style used on Spinal, Neurosurgery, Urology and Radiation Protection.
- **`neovantis-clinton-visagie.png` and `neovantis-distributor.png`** show a person, apparently Clinton Visagie. They are not used because the name, title and permission are not confirmed, and the second image appears composited. If you confirm the name, title, photo authenticity and permission, we can add them to the About page.
- **Not used because they imply a wider scope or contain baked-in text:** screw sets, plates, nails, external fixator, `Contact us hero`, `products banner hero`, `our solutions hero`, `orthopaedic-*`, `innovations-*`, `neovantis-blog`, `clinical insights hero`, `precision-pain-management-system`, `RF-ablation-for-pain-management`, `rf generator system`, `neovantis-advanced-implant-design`, `neovantis-minimally-invasive-pain-management`, `neovantis-precision-pain-management`, `neovantis-rf-ablation-technology`, `professional webpage hero`, `neoventis-about-hero`, `neovantis-healthcare-professionals`. The stock-style clinicians could be mistaken for Neovantis staff, the generator screens show invented readouts, and several images show trauma plating outside the confirmed public scope.
- The unused originals still sit in `public/images/`, so they are deployed at their URLs, though nothing links to them. If you prefer, they can be moved to a non-public folder before launch.

## 4. Speciality pages: what I added and why

The supplied H1, two paragraphs and button are used **verbatim** on each page (verified automatically against an independent transcription of the brief). Every button links to `/contact/?speciality=<slug>#enquiry-form` and preselects the speciality.

Underneath, each page has a short, factual "what to include" panel and a shared "Requesting documentation" panel. Nothing adds products, models, dimensions or arrangements.

| Page | Added | Why |
|---|---|---|
| Orthopaedics | Checklist: diameter, length, quantity, packaging or sterility, timing, facility | Build note; helps buyers specify K-wires. No other ortho ranges implied |
| Spinal Surgery | Checklist: system name, screw/rod vs cervical, instruments, planned date, facility; patient-info note | Build note; supports case planning |
| Neurosurgery | Checklist: plates/screws/mesh, instruments or tray, date, facility; "do not send scans" note | Build note: no scans or records through the form; no patient-specific mesh claim |
| Urology | Two separate panels: ward-stock drainage vs theatre access/dilation/retrieval; "no homecare advice" note | Build note: keep routine drainage separate |
| Pain Management | Platform checklist (generator make/model, evaluating vs ordering, electrodes/cannulae, quantities, training/support question); note that we give no treatment settings | Build note: training and support stay as enquiry topics, not promises |
| Radiation Protection | Checklist: setting, sizes, material requirements, documentation, replenishment | Build note: no material mapping, shielding or attenuation claims; no Netcare wording |
| All | "Requesting documentation" panel | Lets procurement and biomedical engineering teams ask without us promising specific documents |

No FAQs were added: the checklists answer the main practical question, and further FAQs would need facts that are not confirmed.

## 5. Insights

- Two complete drafts in `src/content/insights/`, both `status: draft`:
  1. *Beyond the quotation: what matters in medical and surgical supply?* No local text draft of the earlier "value beyond price" piece was found (only social graphics in Downloads), so this is a fresh draft.
  2. *Preparing an RF equipment and consumables enquiry.*
- No author names, credentials or dates are invented ("By the Neovantis team"; `published` stays empty until publication).
- **Production:** drafts are not built, not in the sitemap, and the Insights links are hidden from the navigation, footer and homepage. `/insights/` still exists (so `/blog` has a destination) but shows a short holding message and is **noindex** until at least one article is approved.
- **To review drafts locally:** `npm run dev` (drafts visible with a "Draft for review" banner) or `npm run build:review` (output in `dist-review/`, never deploy).
- **To publish:** change `status: draft` to `status: approved` and set `published: "YYYY-MM-DD"`.

## 6. Contact form

- Netlify Forms, static HTML: `name="enquiry"`, `method="POST"`, `data-netlify="true"`, hidden `form-name`, honeypot `company_website`. No file upload.
- Required: name, email, speciality, enquiry type and message. Optional: organisation, role, region and telephone. Speciality options: the six specialities plus General enquiry. Enquiry types as briefed.
- Prefill accepts only the six slugs or `general` from `?speciality=`; anything else is ignored. No contact details or messages are ever put in URLs.
- With JavaScript, the form shows accessible inline errors and a focused error summary, posts in the background and **only redirects to /thank-you/ after the receiver returns success**. On failure it shows an error with the phone and email alternatives. Without JavaScript, the browser validates natively and Netlify redirects to `/thank-you/` after accepting the post.
- **Not provable locally:** Netlify form detection, spam filtering, storage and email notifications. See the launch checklist.

## 7. What was tested (local, 5 Nov 2026)

All tests ran against the built `dist/` output served by a small local server that mimics Netlify redirects, real 404 status and a form receiver. They are lab results, **not field data**.

| Check | Result |
|---|---|
| `npm ci` with the existing lockfile; `npm run build`; `npm run build:review` | Pass, no warnings |
| Astro type check (`@astrojs/check`, run from a temporary folder, not added to the project) | 0 errors, 0 warnings, 0 hints |
| 44 HTTP checks: every legacy redirect (both slash forms) is a single 301 to a 200, with no chains or loops; retired articles and unknown URLs return a real 404; drafts return 404 in production | All pass |
| Built-output audit: one H1 per page, unique titles, descriptions and canonicals, image alt text and dimensions, JSON-LD parses with no Medical or LocalBusiness types, no broken internal links, form markup present, exact speciality copy | No problems |
| Private or unsupported wording scan (Netcare, NAPPI, tender, prices, WhatsApp, hours, ISO numbers, MRI, patient-specific, delivery, outcomes, competitor or market research terms, and more) | None found. Only match: "not … a guarantee of availability" in the Terms (a disclaimer) |
| Indexing switch: default build is `noindex` (meta tag + `X-Robots-Tag` header, robots.txt without sitemap); `SITE_INDEXING=true` build is `index, follow` with sitemap in robots.txt; thank-you and 404 stay noindex | Pass |
| 58 headless Chrome checks (results in `review-screenshots/browser-test-results.json`) | 58/58 pass |
| · No horizontal overflow on 12 pages at 320, 375, 390, 768, 1024 and 1440 px | Pass |
| · Mobile menu by touch; Specialities submenu (overview + six); Escape closes the submenu, then the menu, returning focus each time | Pass |
| · Desktop: first Tab reaches the skip link; keyboard opens the dropdown with Enter; Tab enters it; Escape closes it and returns focus; it closes when focus leaves; 3 px focus outline | Pass |
| · All six enquiry buttons preselect the correct speciality; unknown and malicious parameters ignored | Pass |
| · Empty submit: 5 errors, focused summary, `aria-invalid`; invalid email message | Pass |
| · Receiver failure (HTTP 500): error shown, stays on page, no success | Pass |
| · Receiver success: redirected to /thank-you/; receiver got all fields, `form-name` and an empty honeypot (dummy data only) | Pass |
| · Analytics events contain only speciality or location, no personal data | Pass |
| · axe-core 4.10 (WCAG 2.0/2.1/2.2 A and AA rules) on 10 pages at 390 and 1440 px | 0 violations |
| Performance (local lab, Chrome, 390 px mobile emulation) | LCP 0.18–0.42 s unthrottled; **1.16–1.31 s** with 4× CPU slowdown and a ~1.6 Mbps / 150 ms network. CLS 0 on all pages |

INP was not measured: it needs real user interaction, so check it in field data (Search Console Core Web Vitals) after launch.

Automated accessibility tools catch only part of WCAG. A manual screen-reader pass (NVDA or VoiceOver) is still recommended before launch.

## 8. Local preview

From `Neovantis Website/neovantis-site/`:

```
npm ci                 # once
npm run dev            # http://localhost:4321  (drafts visible, live reload)
npm run build          # production output in dist/
npm run preview        # serves dist/ at http://localhost:4321
npm run build:review   # review build with drafts in dist-review/ (never deploy)
```

`npm run preview` does not apply Netlify redirects or forms; those were tested with the local Netlify-like server described above. A Netlify **deploy preview** of this branch is the best way to confirm them on Netlify itself (it will be noindex by default).

Screenshots: `review-screenshots/` (homepage at 320, 390, 768, 1024 and 1440 px; speciality, contact, validation, send failure, mobile menu, desktop dropdown, 404 and draft article).

## 9. Indexing switch

- Default: **every build is noindex** (meta robots on every page + `X-Robots-Tag: noindex, nofollow` header written to `dist/_headers`), and robots.txt does not list the sitemap. This covers deploy previews, branch deploys and the current `neovantis.netlify.app` production deploy.
- To enable indexing: in Netlify → Site configuration → Environment variables, add `SITE_INDEXING = true` **scoped to the Production context only**, after the approved custom domain is live, then redeploy.
- Canonicals, sitemap, structured data and share URLs always use `https://neovantis.co.za`. Change `SITE_URL` in `src/config/site.ts` and `site` in `astro.config.mjs` if the final domain differs.
- Additionally, consider enabling Netlify's password protection or setting the `netlify.app` subdomain to redirect to the custom domain once it is live.

## 10. Launch checklist

**Content and facts** (details in CONTENT_CONFIRMATIONS.md)
- [ ] Confirm `info@neovantis.co.za` is monitored and who receives form notifications.
- [ ] Confirm legal entity name, SAHPRA licence category, ISO standard and scope, and B-BBEE certificate validity.
- [ ] Approve the illustrative images, the derived favicon and the share image.
- [ ] Owner or legal review of the Privacy policy, Terms and Medical disclaimer.
- [ ] Approve or edit the two Insights drafts; set `status: approved` and `published`.

**Netlify**
- [ ] Base directory = `neovantis-site`; build command `npm run build`; publish `dist`.
- [ ] Deploy the branch as a deploy preview and re-run redirect and 404 spot checks there.
- [ ] Forms → enable form detection; confirm the `enquiry` form appears after deploy.
- [ ] Submit a test enquiry on the deploy preview; confirm it appears in Netlify Forms and that the email notification reaches the monitored inbox (check spam).
- [ ] Set a form notification email (Forms → Form notifications) to the confirmed address.
- [ ] Confirm the security headers still apply (`X-Frame-Options`, `nosniff`, `Referrer-Policy`, `Permissions-Policy`).

**Domain and SEO**
- [ ] Confirm the final domain. Inventory every URL currently live on **neovantis.co.za** (not just the Netlify prototype): run a crawl of the live domain and export Search Console → Pages and Performance landing pages. Add any missing old URLs to `public/_redirects`.
- [ ] Connect the domain in Netlify, set `SITE_INDEXING=true` for Production only, and redeploy.
- [ ] Verify on the live domain: `index, follow` on pages, no `X-Robots-Tag` header, `robots.txt` lists the sitemap.
- [ ] Search Console: verify the domain property, submit `/sitemap.xml`, use URL Inspection on the homepage and six speciality pages, and watch Pages and Core Web Vitals reports for 4–6 weeks.
- [ ] Google Business Profile (owner action, not changed by us): make the name, address (Suite F1, 250 Umhlanga Rocks Drive, Umhlanga, 4051) and phone (031 463 1188) match the website exactly; set the website link to `https://neovantis.co.za/`; only add hours once confirmed.
- [ ] LinkedIn (owner action): confirm the company page URL, align the address, phone and website link, then add it to `src/config/site.ts` and the footer.

**FAQ and Insights**
- [ ] Review the 10 FAQ answers on `/support/#faq` (see §11) and the items they rely on in CONTENT_CONFIRMATIONS.md (#24–#26).
- [ ] Review the four new Insights drafts and their sources (§11); approve individually by setting `status: approved` and `published`.

**Analytics (optional)**
- [ ] If tracking is wanted: create a GTM container, set `PUBLIC_GTM_ID` in Netlify, map the four events to GA4, mark `enquiry_submitted` as the key event, and update the privacy policy and cookie consent first.

## 11. Update (5 Nov 2026): FAQ and four new Insights drafts

### FAQ

- **Where:** a "Frequently asked questions" section on `/support/#faq`. It's linked from the homepage ("Frequently asked questions →" under the planning steps) and from a jump link at the top of the Support page. Content lives in `src/config/faq.ts`.
- **Ten questions**, covering all eight requested topics plus "Can you guarantee stock or delivery times?" and "Does Neovantis give clinical advice or device settings?"
- **Built with native `<details>`/`<summary>` elements**, so they open and close with a tap, a click, or Enter and Space, and screen readers announce the expanded state. A direct link such as `/support/#faq-rf` opens that question.
- **Answers:** where something depends on the product, the answer says what to provide (system name, platform make and model, pack size and so on) instead of only saying "contact us". There are no promises of stock, lead times, training or support. The patient-information answer says plainly not to send names, scans or images.
- **Structured data:** FAQPage markup added to the Support page.
- **Speciality-specific questions:** none added. Each speciality page already has a "what to include" panel, and the main FAQ covers every speciality-level question I could identify, so a speciality question would only duplicate it.

### Four new Insights drafts (all `status: draft`)

| # | Title | Local URL | Image (original file) |
|---|---|---|---|
| 1 (lead) | What doctors, surgeons and clinical teams are asking of medical device suppliers | `/insights/what-clinical-teams-ask-of-suppliers/` | `neovantis-healthcare-professionals.png` → `optimised/clinical-team-illustration-*.webp` |
| 2 | Before the case: getting the implant, instruments and timing to line up | `/insights/before-the-case/` | `K-Wire & Pin Set.png` (existing optimised copy) |
| 3 | What makes repeat ordering easier for wards, theatres and cath labs? | `/insights/making-repeat-orders-easier/` | None suitable; branded placeholder on the card |
| 4 | What should be in a medical device supplier's document pack? | `/insights/supplier-document-pack/` | `clinical insights hero.png` → left-hand crop `optimised/documents-desk-illustration-*.webp` (excludes the medicines on the right) |

The two earlier drafts are unchanged. A new `order` field lists the lead article first.

**How the new articles avoid repeating the earlier drafts:** "Beyond the quotation" was a general overview. These go deeper into specific situations: role-by-role expectations, planning a case, repeat orders, and the document pack.

**Sources:** every factual claim links to a primary document that I downloaded and read, quoted with clause references where useful. All links were checked and resolve (HTTP 200).

| Source | Used for |
|---|---|
| National Treasury RT2-2025 special conditions (medical equipment; listed for 1 Aug 2026–31 Jul 2030) | Training, maintenance, response times, loan devices, manuals, recalls, product registration clause |
| National Treasury RT252-2025 special conditions (surgical instruments and equipment) | ISO 13485 holder must be the manufacturer; orders and delivery notes; non-conforming deliveries returned |
| Western Cape WCGHCC0001/2025 (prosthetic and orthotic consumables) | ISO 13485 per manufacturer, SAHPRA licence, manufacturer letter, latex-free confirmation, labelling, CSD |
| Western Cape WCGHCC0047/2025 (3D printer for the Orthotic and Prosthetic Centre) | Clinical engineering expectations: manuals, preventive maintenance and calibration procedures, spares, training, named technicians |
| CSSD Forums of South Africa SOPs v3 (2024), SOP 7 and SOP 28 | Loan sets: notice at least a day before, minimum 4 hours before use, tray lists and photos, risks of delay |
| SAHPRA SAHPGL-MD-07 v4 (May 2025), MD08 2025 communication, Medical devices web page | Licence types, device listing, "not yet called up … for product registration", ISO 13485 timing, licence database |

**Research limits:**
- The Limpopo and Eastern Cape implant tenders, which describe consignment stock, could not be opened: the servers refused connections. Because I couldn't verify their wording, consignment terms are **not** cited. The lead article instead shows the questions teams can reasonably ask.
- No equipment findings were found in the OHSC's published 2023/24 highlights, so no hospital-report claims are made.
- The lead article states these limits itself: the examples come from specific documents, are mostly public-sector, and are not national rules.
- No interviews, quotes or survey findings were invented. Questions are labelled "reasonable questions", separate from documented requirements.

### What was tested (5 Nov 2026, local)

- **Builds:** production build passes (17 pages, no articles); review build passes (23 pages, six drafts). Type check: 0 errors.
- **FAQ and Insights:** 58 headless Chrome checks, all passing (results in `review-screenshots/faq-insights-results.json`):
  - the FAQ has 10 questions, collapsed initially, covering all eight topics
  - Enter, Space, Tab and focus outline work; a tap opens a question on mobile; touch targets are 75px tall
  - deep links open the right question; the homepage link lands on the FAQ
  - no horizontal overflow on Support (all questions open), Insights and all six articles at 320, 390, 768 and 1440px
  - Insights lists six drafts with the lead first, each with a draft badge; all card images load
  - each new article has one H1, a draft banner, noindex, 6–10 subheadings, internal links that return 200, linked sources and a unique title
  - axe-core finds 0 violations on Support, Insights, the four new articles and the homepage at 390 and 1440px
  - production check: all six drafts return 404, the sitemap has no Insights URLs, there are no Insights links, the FAQ is present and FAQPage structured data is present
- **Regression:** the earlier 44 HTTP checks, the output audit and 58 browser checks all still pass.
- **Fixed during this round:**
  - Insights list card titles rendered at page-heading size, a bug from the first round.
  - Astro's dev toolbar is now disabled in the preview.
