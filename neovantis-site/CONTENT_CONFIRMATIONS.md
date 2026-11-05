# Content confirmations

Internal document: do not publish. Facts that still need confirmation, the pages they affect, and how each is handled in the meantime. Ordered by priority.

| # | Item to confirm | Affected pages | Handling meanwhile |
|---|---|---|---|
| 1 | **Monitored email and routing.** Is `info@neovantis.co.za` monitored, and who receives Netlify form notifications? | Contact, footer, every CTA band, form, privacy policy, structured data | Kept provisionally everywhere from `src/config/site.ts`. No orders or speciality addresses added |
| 2 | **Contact details.** Address and telephone as briefed. Opening hours and WhatsApp (old site: 074 563 0777, Mon–Fri 08:00–17:00, Sat by appointment). Map pin | Contact, footer, structured data | Address and phone published as briefed. Hours, WhatsApp and map omitted. Old WhatsApp and hours removed |
| 3 | **Scope of service and support.** Do you offer theatre attendance, case support, delivery, loans or backup equipment, servicing or training? What is your response time? | Support, Pain Management, homepage steps | Written as enquiry topics only ("raise as a question; our team will confirm what applies"). No promises of availability, delivery, timing or support |
| 4 | **Current RF platform(s)** supplied, and whether training or technical support is formally offered | Pain Management, RF article draft | No generator named. Training and support are enquiry topics only. No settings or clinical advice |
| 5 | **Wider trauma scope** (plates, screws, nails, external fixation, joint replacement) | Orthopaedics | Public scope limited to K-wires as briefed. Trauma-plate images not used |
| 6 | **Patient-specific cranial mesh** service | Neurosurgery | Not mentioned. Page says not to send scans or patient information |
| 7 | **Glove materials**, model-to-material mapping, documentation available | Radiation Protection | Materials referred to only as a topic to ask about. No mappings, shielding or attenuation claims. No Netcare wording |
| 8 | **ISO certification**: standard (e.g. ISO 13485 or ISO 9001), scope, certifying body, validity | Credentials (Home, About) | Shown as "ISO certified … Ask our team for the certificate and its scope." No standard number or badge |
| 9 | **SAHPRA licence**: category (e.g. distributor or wholesaler) and licence number | Credentials, Medical disclaimer | "Holds a medical device establishment licence from SAHPRA … not an approval of individual products" |
| 10 | **B-BBEE**: certificate or affidavit and its validity date | Credentials | "Level 1 B-BBEE status". No logo |
| 11 | **SAMED**: membership category; permission to use the SAMED logo | Credentials | Text only ("member of SAMED"). No logo |
| 12 | **"Procurement teams can ask our team for supporting documents"**: is this acceptable as a standing statement? | Credentials heading | Published. Remove if documents will not be shared on request |
| 13 | **Image permissions** for all reused images, and approval of the derived favicon and share image | Home hero, Orthopaedics, Pain Management, draft articles, favicon, social share | Used with an "Illustrative image" caption. See WEBSITE_HANDOVER.md §3 |
| 14 | **Team photos and names** (e.g. `neovantis-clinton-visagie.png`): verified name, title, permission and photo authenticity | About | No people shown, no names published |
| 15 | **Legal entity name** (old site used "Neovantis (Pty) Ltd"), registration number and information officer | Privacy, Terms, footer copyright | "Neovantis" used throughout |
| 16 | **Privacy policy facts**: Netlify as host and form processor; email provider for notifications; the promise to delete any patient information received; no analytics at present | Privacy policy | Drafted on actual fields and processors. No retention period or data-location promise beyond "may be processed outside South Africa". **Owner or legal review required** |
| 17 | **Terms and Medical disclaimer** | Legal pages | Drafted. **Owner or legal review required** |
| 18 | **LinkedIn company URL** | Footer | Omitted. Old placeholder link removed |
| 19 | **Final production domain** (`https://neovantis.co.za`) | Canonicals, sitemap, structured data, share URLs | Configured as `SITE_URL`; indexing stays off until `SITE_INDEXING=true` |
| 20 | **Analytics**: is GA4 or GTM wanted? Cookie consent approach | Site-wide, Privacy policy | None installed. Hook ready (`PUBLIC_GTM_ID`) |
| 21 | **Insights drafts**: approval, any edits, publication date | Insights | Draft flag: excluded from production, navigation and sitemap |
| 22 | **"We welcome enquiries from across South Africa"**: acceptable as wording? (Does not claim coverage or delivery) | Contact, About | Published as an invitation only |
| 23 | **Region field** includes "Outside South Africa": do you accept such enquiries? | Form | Included as an optional option. Remove if not wanted |

## Kept private (never published)

- Market and competitor research, competitor names and comparisons
- Netcare wording and any ranking or tender claims
- Product codes, model numbers, NAPPI codes, price lists, sourcing information and private catalogues
- Unverified glove material mappings and shielding or attenuation comparisons
