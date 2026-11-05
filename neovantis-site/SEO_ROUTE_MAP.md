# SEO route map

Internal document. Production canonical domain: `https://neovantis.co.za` (confirm before launch). All canonical URLs end with a trailing slash.

## Final URLs

Search themes below are topic guides, not measured keyword-volume claims.

| URL | Search intent / theme | Title | Indexing | In sitemap |
|---|---|---|---|---|
| `/` | Specialist medical device supplier in Durban | Specialist Medical Device Supplier in Durban \| Neovantis | index* | Yes |
| `/about/` | Who Neovantis is, Umhlanga base | About Neovantis \| Specialist Medical Supplier in Umhlanga | index* | Yes |
| `/specialities/` | Overview of portfolio areas | Medical and Surgical Specialities We Supply \| Neovantis | index* | Yes |
| `/specialities/orthopaedics/` | K-wire supply | K-Wire Supply for Orthopaedic and Trauma Teams \| Neovantis | index* | Yes |
| `/specialities/spinal-surgery/` | Spinal fixation supply | Spinal Fixation Supply: Screw and Rod Systems \| Neovantis | index* | Yes |
| `/specialities/neurosurgery/` | Cranial fixation and mesh | Cranial Fixation Plates, Screws and Titanium Mesh \| Neovantis | index* | Yes |
| `/specialities/urology/` | Urology devices and consumables | Urology Devices and Consumables \| Neovantis | index* | Yes |
| `/specialities/pain-management/` | RF ablation equipment and accessories | RF Ablation Equipment and Accessories \| Neovantis | index* | Yes |
| `/specialities/radiation-protection/` | Radiation protection gloves | Radiation Protection Gloves \| Neovantis | index* | Yes |
| `/support/` | What buyers can ask; enquiry checklist | Supply Enquiry Support for Healthcare Buyers \| Neovantis | index* | Yes |
| `/insights/` | Professional guidance hub | Insights for Clinical Teams and Buyers \| Neovantis | **noindex until ≥1 article is approved** | Only when ≥1 approved |
| `/insights/beyond-the-quotation/` | Supplier evaluation beyond price | (article title) | Draft: not built in production | When approved |
| `/insights/preparing-an-rf-enquiry/` | Preparing RF equipment/consumables enquiries | (article title) | Draft: not built in production | When approved |
| `/contact/` | Neovantis in Umhlanga, Durban | Contact Neovantis in Umhlanga, Durban | index* | Yes |
| `/privacy-policy/`, `/terms/`, `/medical-disclaimer/` | Legal | Privacy Policy / Terms of Use / Medical Disclaimer \| Neovantis | index* | Yes |
| `/thank-you/` | Utility | Enquiry received \| Neovantis | Always noindex | No |
| `404` | Utility (real 404 status) | Page not found \| Neovantis | Always noindex, no canonical | No |

\* "index" applies only when the build runs with `SITE_INDEXING=true` (Production context on the approved domain). Every other build is noindex by meta tag **and** `X-Robots-Tag` header.

Each page has a unique title and description, one H1, a self-referencing canonical, and breadcrumb links plus related speciality links. Structured data:

- **Every page:** Organization (`https://neovantis.co.za/#organization`: name, logo, telephone, email, PostalAddress, slogan), WebSite and WebPage.
- **All pages except home, thank-you and 404:** BreadcrumbList.
- **Articles:** Article, with no invented author or date.
- **Never included:** hours, service areas, ratings, reviews, offers, or MedicalBusiness, Hospital or Physician types.

## Legacy redirects (`public/_redirects`)

All are single-hop 301s to a live 200 page (tested). Both slash variants are listed.

| Old URL | New URL | Reason |
|---|---|---|
| `/products` | `/specialities/` | Public catalogue retired |
| `/solutions` | `/specialities/` | Replaced by specialities |
| `/healthcare-professionals` | `/support/` | Professional guidance now in Support |
| `/distributors` (incl. `#partner-form` anchor; the fragment is kept by the browser and ignored) | `/contact/` | Distributor programme not offered publicly |
| `/blog` | `/insights/` | Section renamed |
| `/orthopaedic-trauma` | `/specialities/orthopaedics/` | Draft speciality page replaced |
| `/neuro-plating` | `/specialities/neurosurgery/` | Draft speciality page replaced |
| `/urology-solutions` | `/specialities/urology/` | Draft speciality page replaced |
| `/rf-ablation-pain-management` | `/specialities/pain-management/` | Draft speciality page replaced |
| `/radiation-protection-gloves` | `/specialities/radiation-protection/` | Draft speciality page replaced |
| `/blog/understanding-rf-ablation-pain-management` | `/specialities/pain-management/` | Closest useful equivalent |
| `/blog/rf-ablation-chronic-pain` | `/specialities/pain-management/` | Closest useful equivalent |
| `/blog/minimally-invasive-pain-management` | `/specialities/pain-management/` | Closest useful equivalent |
| `/blog/urology-solutions-modern-clinical-care` | `/specialities/urology/` | Closest useful equivalent |
| `/blog/orthopaedic-trauma-hardware-fracture-treatment` | `/specialities/orthopaedics/` | Closest available orthopaedic page. Review if the wider trauma scope is not confirmed; switch to 404 if the mismatch is unhelpful |

### Deliberate 404s

| Old URL | Treatment | Reason |
|---|---|---|
| `/blog/clinically-trusted-medical-solutions` | 404 (no rule) | Generic claims-led article; no equivalent |
| `/blog/innovations-orthopaedic-implant-technology` | 404 (no rule) | Covers implant ranges outside confirmed scope |
| Any other unknown path | 404 | Netlify serves `404.html` with a real 404 status. The old blanket `/* → /404` rule was removed |

A 410 status can be configured later if wanted. A genuine 404 is sufficient for search engines to drop these URLs.

## Before release

- This map is based on the routes in this repository and the Netlify prototype (`neovantis.netlify.app`). **It does not cover any URLs that exist only on the public custom domain.** Before switching the domain:
  1. Crawl the live `neovantis.co.za` and list every URL that returns 200.
  2. Export Search Console landing pages (Performance → Pages, 16 months) and indexed pages (Indexing → Pages).
  3. Add a redirect for every URL with traffic, links or indexation that has a useful equivalent; let the rest 404.
- After launch, check Search Console for 404s and redirect errors weekly for the first month.
