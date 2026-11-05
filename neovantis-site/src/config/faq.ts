// Support page FAQ. Answers use only confirmed facts; where something depends on the product,
// they say what the buyer should provide. No promises of stock, lead times, training or support.
// `html` answers may contain internal links only.

export interface Faq { id: string; q: string; a: string[]; list?: string[]; after?: string; }

export const faqs: Faq[] = [
  {
    id: 'who-we-supply',
    q: 'Who does Neovantis supply, and which speciality should I select?',
    a: [
      'We supply healthcare professionals and institutions: specialist surgeons and clinicians, theatre and cath lab teams, hospital procurement and institutional buyers, and biomedical engineering teams where equipment is involved. We do not sell to patients or the public.',
      'Choose the speciality that matches the product:',
    ],
    list: [
      'K-wires: <a href="/specialities/orthopaedics/">Orthopaedics</a>',
      'Screw and rod systems, cervical fixation components: <a href="/specialities/spinal-surgery/">Spinal Surgery</a>',
      'Cranial plates, screws, titanium mesh and associated instruments: <a href="/specialities/neurosurgery/">Neurosurgery</a>',
      'Urinary drainage catheters, access sheaths, dilators, retrieval baskets: <a href="/specialities/urology/">Urology</a>',
      'RF ablation equipment, electrodes and cannulae: <a href="/specialities/pain-management/">Interventional Pain Management</a>',
      'Radiation protection gloves: <a href="/specialities/radiation-protection/">Radiation Protection</a>',
    ],
    after: 'If your enquiry covers more than one area, or you are not sure, choose General enquiry.',
  },
  {
    id: 'quote-availability',
    q: 'What should I include when requesting a quote or checking availability?',
    a: ['Include enough for our team to identify the exact item and the timing:'],
    list: [
      'The product, and its specification, size or system name',
      'The pack size and quantity',
      'Whether it is for a specific case or list (give the date) or for stock',
      'Any instruments, trays or accessories you also need',
      'Your organisation and the best person to contact',
    ],
    after: 'Availability depends on the product and the date, so it is confirmed for each enquiry.',
  },
  {
    id: 'documents',
    q: 'How do I request product specifications or technical documents?',
    a: [
      'Select <strong>Technical documentation</strong> as the enquiry type. List the products, the documents you need and what they are for, such as supplier onboarding, product evaluation or a tender submission, and your deadline. Our team will tell you what can be provided for those products.',
      'It helps to separate supplier documents, such as licensing or certification, from product documents, such as product information or instructions for use. Neovantis holds a SAHPRA medical device establishment licence; like any supplier licence, it covers the company’s activities and is not an approval of each individual product.',
    ],
  },
  {
    id: 'compatibility',
    q: 'What information is needed to check whether an implant and instrument set go together?',
    a: ['Compatibility is checked for the specific system, so please provide:'],
    list: [
      'The system name as it appears on your records, tray list or previous order',
      'The components and sizes you need',
      'The instruments or tray you already hold, or need with them',
      'The planned date, if the check is for a case',
    ],
    after: 'Please do not assume that components or instruments from different systems can be combined. Ask, and our team will check against the system you name.',
  },
  {
    id: 'rf',
    q: 'What should I provide when asking about RF equipment or compatible consumables?',
    a: ['Start with the platform, because compatibility depends on the generator:'],
    list: [
      'The make and model of the RF generator you use or are considering',
      'Whether you are evaluating equipment, ordering consumables, or both',
      'The electrodes or cannulae you need, with any specifications you know',
      'Expected quantities',
      'Any training or technical support question you want answered',
    ],
    after: 'We do not provide treatment settings or clinical advice. Training and technical support can be raised as questions; our team will explain what applies to your equipment.',
  },
  {
    id: 'gloves',
    q: 'How do I ask about glove sizes, materials or product information?',
    a: ['Choose <strong>Radiation Protection</strong> and tell us:'],
    list: [
      'The procedural setting, for example interventional cardiology or fluoroscopy',
      'The sizes you need',
      'Any material requirements for your team',
      'Whether you need product information or technical documentation',
      'Expected quantities and how often you replenish',
    ],
    after: 'Our team will send product information on intended use, sizing and materials for the gloves we supply.',
  },
  {
    id: 'repeat-vs-case',
    q: 'How do I handle a repeat stock order versus a case-specific enquiry?',
    a: [
      '<strong>Repeat stock order:</strong> use the product description, specification and pack size from your previous order, add the quantity and delivery point, and include your previous order reference or official order number if you have one.',
      '<strong>Case-specific enquiry:</strong> give the procedure date, the system or product, and the instruments or trays you need for that case.',
      'Where you can, send the two separately and say which is which, so a time-sensitive case request is not mistaken for routine stock.',
    ],
  },
  {
    id: 'patient-information',
    q: 'Can I include patient information or scans when submitting an enquiry?',
    a: [
      '<strong>No.</strong> Please do not include patient names, scans, images or any other patient information in the website form or in enquiry emails. Supply, availability and compatibility questions can be answered without them.',
      'If patient information is sent to us by mistake, let us know and we will not use it.',
    ],
  },
  {
    id: 'stock-and-timing',
    q: 'Can you guarantee stock or delivery times?',
    a: [
      'Availability and timing depend on the product, the quantity and your date, so our team confirms them for each enquiry rather than in advance. Tell us the date you are working towards and whether it is fixed, and we will tell you what can be arranged.',
    ],
  },
  {
    id: 'clinical-advice',
    q: 'Does Neovantis give clinical advice or device settings?',
    a: [
      'No. Neovantis is a supplier. We provide product and supply information. Clinical decisions, treatment settings and technique remain with the treating healthcare professional and the manufacturer’s instructions for use.',
    ],
  },
];

const strip = (s: string) => s.replace(/<[^>]+>/g, '');

/** Plain-text answer for structured data. */
export const faqPlainText = (f: Faq) =>
  [...f.a, ...(f.list ?? []).map((l) => `• ${l}`), ...(f.after ? [f.after] : [])].map(strip).join(' ');
