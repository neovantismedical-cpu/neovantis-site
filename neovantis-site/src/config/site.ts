// Central business configuration. Update facts here only; every page reads from this file.
// Items marked CONFIRM are tracked in CONTENT_CONFIRMATIONS.md.

export const SITE_URL = 'https://neovantis.co.za'; // CONFIRM: final production domain before launch

// Build-time environment (Node). Read without requiring @types/node.
const env = (globalThis as { process?: { env: Record<string, string | undefined> } }).process?.env ?? {};

/**
 * Indexing switch. Pages are noindex unless the build runs with SITE_INDEXING=true.
 * Set SITE_INDEXING=true only in the Netlify *production* context once the approved
 * custom domain is live. Previews, branch deploys and local builds stay noindex.
 */
export const INDEXING_ENABLED = env.SITE_INDEXING === 'true';

/** Draft insights are shown in `astro dev` or when a review build sets SHOW_DRAFTS=true. */
export const SHOW_DRAFTS = import.meta.env.DEV || env.SHOW_DRAFTS === 'true';

/** Optional analytics. No ID is set in the repository; nothing loads unless PUBLIC_GTM_ID is provided. */
export const GTM_ID = import.meta.env.PUBLIC_GTM_ID || '';

export const business = {
  name: 'Neovantis',
  tagline: 'Improving Lives Together',
  description:
    'Neovantis is a South African supplier of specialist medical devices, surgical implants, instruments and equipment for healthcare professionals and institutions.',
  address: {
    line1: 'Suite F1, 250 Umhlanga Rocks Drive',
    locality: 'Umhlanga',
    postalCode: '4051',
    region: 'KwaZulu-Natal',
    country: 'South Africa',
    countryCode: 'ZA',
  },
  phone: { display: '031 463 1188', href: 'tel:+27314631188', e164: '+27314631188' },
  email: 'info@neovantis.co.za', // CONFIRM: monitored inbox and routing before launch
  logo: { src: '/images/neovantis-logo-dark-tm.png', width: 1000, height: 312 },
  logoOnDark: { src: '/images/neovantis-logo-white-tm.png', width: 1000, height: 313 },
  // Official company profiles, confirmed by Neovantis. Used in the footer and in Organization sameAs.
  social: [
    { name: 'LinkedIn', icon: 'linkedin', href: 'https://za.linkedin.com/company/neovantis' },
    { name: 'YouTube', icon: 'youtube', href: 'https://www.youtube.com/@Neovantis' },
    { name: 'Instagram', icon: 'instagram', href: 'https://www.instagram.com/neovantis/' },
  ],
} as const;

/** Image or icon shown at the top of a credential card */
export type CredentialMedia =
  | { kind: 'image'; src: string; width: number; height: number; alt: string; bordered?: boolean; href?: string }
  | { kind: 'icon'; name: 'document-check' | 'certificate' };

export const credentials: readonly { title: string; text: string; media?: CredentialMedia }[] = [
  {
    title: 'SAMED member',
    text: 'Neovantis is a member of SAMED, the South African Medical Technology Industry Association.',
    media: { kind: 'image', src: '/images/optimised/samed-member-logo.webp', width: 337, height: 112, alt: 'SAMED logo' },
  },
  {
    title: 'SAHPRA licensed',
    text: 'Neovantis holds a medical device establishment licence from SAHPRA.',
    media: { kind: 'image', src: '/images/optimised/sahpra-logo.webp', width: 284, height: 112, alt: 'SAHPRA logo' },
  },
  {
    title: 'Level 1 B-BBEE',
    text: 'Neovantis has Level 1 Broad-Based Black Economic Empowerment (B-BBEE) status.',
    media: { kind: 'image', src: '/images/south-africa-flag.jpg', width: 142, height: 94, alt: 'South African flag', bordered: true },
  },
  {
    title: 'ISO certified',
    text: 'Neovantis holds ISO certification. Ask our team for the certificate and its scope.',
    // Badge links to the certificate scope note on the About page.
    media: {
      kind: 'image',
      src: '/images/optimised/iso-13485-badge.webp',
      width: 284,
      height: 112,
      alt: 'ISO 13485:2016 certified: read the certification scope',
      href: '/about/#iso-13485',
    },
  },
];

export type SpecialitySlug =
  | 'orthopaedics'
  | 'spinal-surgery'
  | 'neurosurgery'
  | 'urology'
  | 'pain-management'
  | 'radiation-protection';

export interface Speciality {
  slug: SpecialitySlug;
  /** Name used in navigation, cards and the enquiry form */
  name: string;
  /** Short line for homepage and overview cards */
  card: string;
  h1: string;
  /** Hero paragraphs: the first is styled as the lead */
  intro: [string] | [string, string];
  button: string;
  /** Optional explainer shown directly below the hero, above the range section */
  explainer?: {
    heading: string;
    text: string[];
    /** H3 sub-sections; a paragraph may open with a bold lead-in */
    subsections?: { heading: string; paras: { lead?: string; text: string }[] }[];
    /** Optional brand-guide artwork: a faint background sketch and overlapping circular images */
    art?: {
      background: { src: string; srcset: string };
      circles: { src: string; srcset: string; alt: string }[];
    };
  };
  /** Optional second hero link, shown beside the main button */
  secondaryLink?: { label: string; href: string };
  metaTitle: string;
  metaDescription: string;
  image?: { src: string; srcset: string; width: number; height: number; alt: string; caption?: string };
  /** What Neovantis supplies, optionally split into named parts of the range. Categories only: no codes, sizes or model lists. */
  range: { heading?: string; items: { name: string; text: string }[] }[];
  /**
   * Optional replacement for the "What Neovantis supplies" section: an H2 with intro copy,
   * paragraphs that open with a bold lead-in, and an enquiry button. Used by Orthopaedics.
   * Categories only: no sizes, product codes, NAPPI codes or catalogue tables.
   */
  options?: {
    heading: string;
    text: string[];
    paras?: { lead: string; text: string }[];
    /** Set false to leave out the enquiry button below this section */
    button?: boolean;
    /** Further blocks, each with its own descriptive H2 */
    blocks?: { heading: string; text: string[] }[];
  };
  /**
   * Optional single enquiry section (replaces the guide and enquiry cards): an H2, paragraphs with
   * bold lead-ins, an optional note, the documentation line and the enquiry button.
   */
  enquiry?: { heading: string; paras: { lead: string; text: string }[]; note?: string };
  /** Optional heading for the range section (default "What Neovantis supplies") */
  rangeHeading?: string;
  /** "Related reading" links to Insights articles */
  related?: { label: string; href: string }[];
  /** The practical distinction worth understanding before enquiring (omit when another section covers it) */
  guide?: { heading: string; text: string[]; points?: { name: string; text: string }[]; close?: string };
  /** Enquiry cards; an empty list hides the "Preparing your enquiry" section */
  sections: { heading: string; intro?: string; items?: string[]; note?: string }[];
}

export const specialities: Speciality[] = [
  {
    slug: 'orthopaedics',
    name: 'Orthopaedics',
    card: 'Kirschner wires (K-wires) for orthopaedic and trauma teams.',
    range: [
      { items: [{ name: 'Kirschner wires (K-wires)', text: 'Wires for orthopaedic and trauma teams, told apart by their diameter, length and packaging.' }] },
    ],
    // Supply and enquiry details in one place. Exact size combinations, product codes, NAPPI codes,
    // pricing and catalogue files stay off the site and are handled by direct enquiry.
    options: {
      heading: 'Kirschner wires in orthopaedic practice',
      text: [
        'Kirschner wires, also called K-wires, are used in selected orthopaedic fracture fixation procedures. Neovantis supplies K-wires in a range of diameters and lengths, which can be requested by size and quantity.',
      ],
      blocks: [
        {
          heading: 'Planning a theatre list',
          text: [
            'If your list calls for several sizes, give each diameter and length combination its own line in your enquiry. Include the quantity for each size, any sterile packaging requirement and the date the wires are needed. Our team can then check availability against the full list.',
          ],
        },
        {
          heading: 'Replenishing stock or requesting a quote',
          text: [
            'For a repeat order, include the product reference from the existing pack label or a previous order. If you only have the dimensions, send those and we can check the relevant options. If your purchasing team needs product specifications or supporting documents with the quote, include that request upfront.',
          ],
        },
      ],
    },
    related: [
      { label: 'Before the case: getting the implant, instruments and timing to line up', href: '/insights/before-the-case/' },
      { label: 'What makes repeat ordering easier for wards, theatres and cath labs?', href: '/insights/making-repeat-orders-easier/' },
    ],
    h1: 'Kirschner wires for orthopaedics and trauma',
    intro: [
      'Orthopaedic and trauma teams need to specify the fixation items required for each theatre list. Neovantis supplies Kirschner wires (K-wires) in a range of diameters and lengths, including individual sterile wires on request. Teams can enquire by size, quantity and packaging requirement for a planned case or stock replenishment.',
    ],
    button: 'Enquire about K-wires',
    metaTitle: 'Kirschner Wires (K-Wires) South Africa | Neovantis',
    metaDescription:
      'Neovantis supplies Kirschner wires for orthopaedic and trauma teams. Based in Umhlanga, Durban. Enquire about K-wire sizes, quantities and quotes.',
    image: {
      src: '/images/optimised/k-wire-tray-illustration-960.webp',
      srcset:
        '/images/optimised/k-wire-tray-illustration-640.webp 640w, /images/optimised/k-wire-tray-illustration-960.webp 960w, /images/optimised/k-wire-tray-illustration-1280.webp 1280w',
      width: 960,
      height: 640,
      alt: 'Kirschner wires of different diameters in a perforated instrument tray, with loose wires and two hand instruments on a blue drape',
      caption: 'Kirschner wires in an instrument tray',
    },
    // Enquiry details live in the supply section above, so no separate enquiry cards.
    sections: [],
  },
  {
    slug: 'spinal-surgery',
    name: 'Spinal Surgery',
    card: 'Spinal fixation screws and rods, cervical and occipital components, laminar plates, iliac screws and spinal cages.',
    // Implant families only: model numbers, dimensions, product codes, pricing and compatibility details stay off the site.
    rangeHeading: 'Spinal implant and fixation range',
    range: [
      {
        items: [
          { name: 'Screws, rods, hooks and connectors', text: 'Spinal fixation screws and rods, with hooks and connectors.' },
          { name: 'Cervical and occipital fixation', text: 'Posterior cervical and occipital components, and anterior cervical plates and screws.' },
          { name: 'Laminar plates and iliac screws', text: 'Laminar plates and iliac screws. Ask our team which components suit the system you’re using.' },
          { name: 'Spinal cages', text: 'Mesh, titanium, PEEK and expandable cages. Contact our team for product information and availability.' },
        ],
      },
    ],
    guide: {
      heading: 'Why the system name matters',
      text: [
        'If you’re enquiring about an existing system, share the manufacturer and system name if known. If you’re exploring the Neovantis range, start with the implant family you’re looking for. For a planned case, list the implants and instruments separately so our team can check the relevant product information and availability for your date.',
      ],
    },
    h1: 'Spinal fixation systems',
    intro: [
      'Neovantis’ spinal portfolio brings together screw and rod systems, cervical fixation components, spinal cages and associated instruments. When planning a procedure, teams can discuss the implant families and instrumentation needed together, so the relevant product information and availability can be checked for their theatre date.',
    ],
    button: 'Discuss spinal fixation requirements',
    image: {
      src: '/images/optimised/spinal-screws-rods-960.webp',
      srcset:
        '/images/optimised/spinal-screws-rods-640.webp 640w, /images/optimised/spinal-screws-rods-960.webp 960w, /images/optimised/spinal-screws-rods-1280.webp 1280w',
      width: 960,
      height: 640,
      alt: 'Spinal fixation screws and rods',
    },
    metaTitle: 'Spinal Fixation Systems South Africa | Neovantis',
    metaDescription:
      'Neovantis supplies spinal fixation screws and rods, cervical and occipital components, laminar plates, iliac screws and spinal cages. Enquire about implants.',
    related: [
      { label: 'Before the case: getting the implant, instruments and timing to line up', href: '/insights/before-the-case/' },
    ],
    sections: [
      {
        heading: 'What to include when planning a case',
        items: [
          'The system you’re looking for, if you have one in mind',
          'The components you need: screws and rods, hooks and connectors, cervical or occipital components, laminar plates, iliac screws, cages or a combination',
          'The instruments you need alongside the implants',
          'Your planned procedure date',
          'Your facility or organisation name',
        ],
        note: 'Please do not include patient names, scans or other patient information in your enquiry.',
      },
    ],
  },
  {
    slug: 'neurosurgery',
    name: 'Neurosurgery',
    card: 'Cranial plates, screws, titanium mesh and associated instruments.',
    // Component families only: dimensions, product codes, pricing and exact tray configurations stay off the site.
    rangeHeading: 'Cranial plating and reconstruction range',
    range: [
      {
        items: [
          { name: 'Cranial plates', text: 'Interlink, temporal, mastoid and drainage plates.' },
          { name: 'Cranial screws', text: 'Screws for use with the cranial plating range. Ask our team to confirm the screw for your selected plate or mesh.' },
          { name: 'Titanium mesh', text: 'Titanium mesh for cranial reconstruction.' },
          { name: 'Instruments and trays', text: 'Associated instruments and trays. Ask which instruments and trays can be supplied with your selected components.' },
        ],
      },
    ],
    guide: {
      heading: 'What should you confirm before a cranial fixation case?',
      text: [
        'Confirm the plate or mesh, the matching screws and the instruments needed for your planned date. If your theatre team needs a tray or instrument set, ask what it contains and which items need to be requested separately.',
      ],
    },
    h1: 'Cranial fixation plates, screws and titanium mesh',
    intro: [
      'The cranial range covers fixation plates, screws, titanium mesh and associated instruments. Neurosurgical teams can enquire about these components together when preparing a case, including the instruments or tray required alongside the selected plates or mesh.',
    ],
    button: 'Enquire about cranial fixation',
    image: {
      src: '/images/optimised/cranial-fixation-set-960.webp',
      srcset:
        '/images/optimised/cranial-fixation-set-640.webp 640w, /images/optimised/cranial-fixation-set-960.webp 960w, /images/optimised/cranial-fixation-set-1280.webp 1280w',
      width: 960,
      height: 640,
      alt: 'Titanium cranial mesh, cranial plates and screws on a stainless steel tray',
    },
    metaTitle: 'Cranial Plating & Titanium Mesh South Africa | Neovantis',
    metaDescription:
      'Neovantis supplies interlink, temporal, mastoid and drainage cranial plates, screws, titanium mesh and associated instruments and trays for neurosurgical teams.',
    related: [
      { label: 'Before the case: getting the implant, instruments and timing to line up', href: '/insights/before-the-case/' },
    ],
    sections: [
      {
        heading: 'What to include in a cranial fixation enquiry',
        items: [
          'The components you need: plates, screws, titanium mesh or a combination',
          'The instruments or tray you need with them',
          'Your planned procedure date',
          'Your facility or organisation name',
        ],
        note: 'Please do not send scans, images or other patient information through this website. Our team will advise you on next steps after your enquiry.',
      },
    ],
  },
  {
    slug: 'urology',
    name: 'Urology',
    card: 'Urinary catheters, ureteral stents, guidewires, access sheaths, dilators, retrieval baskets and irrigation devices.',
    // Product families only: exact sizes, pack quantities, model numbers, product codes, pricing and catalogue PDFs stay off the site.
    rangeHeading: 'Urology and endourology product range',
    range: [
      {
        items: [
          { name: 'Urinary catheters', text: 'Nelaton, intermittent and hydrophilic intermittent catheters, and latex and silicone Foley catheters.' },
          { name: 'Ureteral stents and drainage', text: 'Double-J ureteral stents and stent sets, ureteral catheters and nephrostomy sets.' },
          { name: 'Access, guidewires and dilation', text: 'Nitinol and PTFE guidewires, ureteral access sheaths, Y-type access sheaths, and urethral and ureteral dilators.' },
          { name: 'Retrieval and irrigation', text: 'Retrieval baskets, bulb irrigators and evacuator bottles.' },
        ],
      },
    ],
    // One combined enquiry section replaces the old guide and the two enquiry cards.
    enquiry: {
      heading: 'What should you include in a urology supply enquiry?',
      paras: [
        { lead: 'Replenishing ward stock?', text: 'Share the product type, required quantity and the reference from the packaging or your last order, if available.' },
        { lead: 'Preparing a theatre list?', text: 'List the devices and quantities you need, your facility and the required date. If you’re requesting a set, ask which components are included.' },
      ],
      note: 'This website handles professional supply enquiries only. It does not provide catheter care or homecare advice.',
    },
    h1: 'Urology supplies for drainage and endourology',
    intro: [
      'Neovantis supplies products for urinary drainage and endourology, from catheters and ureteral stents to access, dilation and stone retrieval devices. Urology and purchasing teams can enquire by product family for a planned theatre list or routine stock replenishment.',
    ],
    button: 'Enquire about urology products',
    image: {
      src: '/images/optimised/urology-catheter-stent-960.webp',
      srcset:
        '/images/optimised/urology-catheter-stent-640.webp 640w, /images/optimised/urology-catheter-stent-960.webp 960w, /images/optimised/urology-catheter-stent-1280.webp 1280w',
      width: 960,
      height: 640,
      alt: 'A Foley catheter, a double-J ureteral stent and a guidewire on a stainless steel tray',
    },
    metaTitle: 'Urology & Endourology Supplies South Africa | Neovantis',
    metaDescription:
      'Neovantis supplies urinary catheters, Double-J ureteral stents, guidewires, access sheaths, dilators and retrieval baskets for urology teams in South Africa.',
    related: [
      { label: 'What makes repeat ordering easier for wards, theatres and cath labs?', href: '/insights/making-repeat-orders-easier/' },
    ],
    sections: [],
  },
  {
    slug: 'pain-management',
    name: 'Interventional Pain Management',
    card: 'RF generators, electrodes, cannulae and grounding pads.',
    range: [
      {
        heading: 'RF generator',
        items: [{ name: 'RF generator', text: 'The generator platform, usually a longer-term decision for a department.' }],
      },
      {
        heading: 'Electrodes, cannulae and grounding pads',
        items: [
          { name: 'Electrodes', text: 'Reusable and disposable electrodes.' },
          { name: 'Cannulae', text: 'Straight and curved cannulae.' },
          { name: 'Grounding pads', text: 'Grounding pads for RF procedures.' },
        ],
      },
    ],
    guide: {
      heading: 'Why the generator model matters',
      text: [
        'Equipment and accessories need to be considered together. An electrode or cannula that looks suitable may not work with a particular generator, so the make and model is the first detail to establish, not the last.',
        'That applies whether you’re replenishing accessories for an existing generator or evaluating a different one, where the accessories for that platform are part of the decision. Whether a given accessory suits a specific model is a technical question, answered for that equipment rather than from a general description.',
      ],
    },
    h1: 'Radiofrequency equipment and accessories',
    intro: [
      'Selecting radiofrequency equipment also means considering the electrodes and cannulae used with the generator. Neovantis supplies RF ablation equipment and accessories for interventional pain teams. Teams can share their existing platform or planned equipment requirements to request product information and check accessory compatibility.',
      'If you’re evaluating a generator or ordering consumables, tell us which platform you use or are considering. Contact us to check compatibility, request product information or enquire about technical support.',
    ],
    button: 'Discuss RF equipment and accessories',
    secondaryLink: { label: 'Ask about RF product training', href: '/contact/?speciality=pain-management&type=rf-training#enquiry-form' },
    explainer: {
      heading: 'Radiofrequency in interventional pain management',
      text: [
        'Radiofrequency (RF) procedures use energy delivered through an electrode to act on a specific nerve or neural structure. The clinical objective determines the approach. Conventional thermal RF creates a controlled lesion to interrupt pain signalling. Pulsed RF delivers energy in short bursts to limit heat build-up and is used with the aim of modulating nerve activity.',
      ],
      subsections: [
        {
          heading: 'How this applies in practice',
          paras: [
            {
              lead: 'Facet joint denervation.',
              text: 'In the assessment of suspected lumbar facet-mediated pain, a diagnostic medial branch block temporarily interrupts signalling from the nerves that supply the facet joint. The response helps the clinician assess whether those nerves are contributing to the pain and informs whether conventional thermal denervation is considered.',
            },
            {
              lead: 'Dorsal root ganglion RF.',
              text: 'Pulsed RF at the dorsal root ganglion has been studied in radicular pain. Here, the aim is to modulate signalling at the ganglion. The evidence for each application is specific to the pain indication and the RF technique studied.',
            },
          ],
        },
        {
          heading: 'From clinical approach to equipment selection',
          paras: [
            {
              text: 'When evaluating equipment, start with the approaches your team uses and ask our team which electrodes, cannulae and grounding pads are specified for the generator.',
            },
          ],
        },
      ],
      // Artwork from the Neovantis brand guide, arranged like the overlapping circles on its final graphics slide.
      art: {
        background: {
          src: '/images/optimised/brand-spine-sketch-1600.webp',
          srcset: '/images/optimised/brand-spine-sketch-900.webp 900w, /images/optimised/brand-spine-sketch-1600.webp 1600w',
        },
        circles: [
          {
            src: '/images/optimised/circle-rf-treatment-560.webp',
            srcset: '/images/optimised/circle-rf-treatment-320.webp 320w, /images/optimised/circle-rf-treatment-560.webp 560w',
            alt: 'A clinician in gloves positioning radiofrequency needles with connected leads in a patient’s lower back',
          },
          {
            src: '/images/optimised/circle-clinician-spine-model-560.webp',
            srcset: '/images/optimised/circle-clinician-spine-model-320.webp 320w, /images/optimised/circle-clinician-spine-model-560.webp 560w',
            alt: 'A clinician pointing to an anatomical model of the spine',
          },
          {
            src: '/images/optimised/circle-back-anatomy-sketch-460.webp',
            srcset: '/images/optimised/circle-back-anatomy-sketch-320.webp 320w, /images/optimised/circle-back-anatomy-sketch-460.webp 460w',
            alt: 'An anatomical drawing of the back muscles and spine',
          },
        ],
      },
    },
    metaTitle: 'RF Generator, Electrodes & Cannulae South Africa | Neovantis',
    metaDescription:
      'RF generators, reusable and disposable electrodes, straight and curved cannulae and grounding pads for interventional pain management teams.',
    image: {
      src: '/images/optimised/rf-electrodes-illustration-800.webp',
      srcset: '/images/optimised/rf-electrodes-illustration-480.webp 480w, /images/optimised/rf-electrodes-illustration-800.webp 800w',
      width: 800,
      height: 800,
      alt: 'Radiofrequency ablation electrodes and cannulae on a blue sterile drape, with an RF generator in the background',
      caption: 'Radiofrequency ablation electrodes and cannulae',
    },
    sections: [
      {
        heading: 'Platform details to include',
        intro: 'Compatibility depends on the specific generator and accessory, so our team will need:',
        items: [
          'The make and model of the RF generator you use or are considering',
          'Whether you’re evaluating equipment, ordering consumables or both',
          'The electrodes, cannulae or grounding pads you need, with any specifications you already know',
          'Expected quantities',
          'Any training or technical support question you’d like to raise',
        ],
        note: 'Neovantis does not provide treatment settings or clinical advice. Training and technical support can be raised as enquiry topics; our team will explain what applies to your equipment.',
      },
    ],
  },
  {
    slug: 'radiation-protection',
    name: 'Radiation Protection',
    card: 'Radiation protection gloves for teams working with fluoroscopy.',
    range: [
      { items: [{ name: 'Radiation protection gloves', text: 'Gloves for clinical teams working in settings such as interventional cardiology and fluoroscopy.' }] },
    ],
    // A short question and answer replaces the one-card range section. Exact attenuation figures,
    // model codes, pricing and catalogue PDFs stay off the site and are handled by direct enquiry.
    options: {
      heading: 'What are radiation-attenuating gloves used for?',
      text: [
        'Radiation-attenuating gloves are designed to reduce exposure of the hands to scattered X-rays during image-guided procedures. Keep hands outside the primary X-ray beam and follow your facility’s radiation safety procedures.',
      ],
      button: false,
    },
    guide: {
      heading: 'What to check before ordering radiation protection gloves',
      text: [],
      points: [
        { name: 'Fit and material', text: 'Include the sizes your team needs and any material requirements your facility has. Our team will confirm what the selected glove offers.' },
        { name: 'Attenuation data', text: 'Ask for the test data for the specific glove being evaluated, including the X-ray energy and test conditions, so your radiation safety team can review it.' },
        { name: 'Packaging and repeat orders', text: 'Confirm how the selected glove is packaged. For a repeat order, share the product reference from your last order or pack label.' },
      ],
    },
    h1: 'Radiation protection gloves',
    intro: [
      'For teams working with fluoroscopy, glove selection involves fit, material and the attenuation data for the specific product. Neovantis supplies sterile, single-use radiation-attenuating gloves, including latex and latex-free options. Clinical and purchasing teams can request the product documentation needed to evaluate the available options.',
    ],
    button: 'Request glove information',
    image: {
      src: '/images/optimised/radiation-protection-gloves-960.webp',
      srcset:
        '/images/optimised/radiation-protection-gloves-640.webp 640w, /images/optimised/radiation-protection-gloves-960.webp 960w, /images/optimised/radiation-protection-gloves-1280.webp 1280w',
      width: 960,
      height: 640,
      alt: 'A clinician in navy scrubs, a surgical cap and a face mask putting on dark gloves',
    },
    metaTitle: 'Radiation Protection Gloves South Africa | Neovantis',
    metaDescription:
      'Neovantis supplies radiation protection gloves for cath labs, interventional radiology and fluoroscopy teams. Enquire about product information and supply.',
    related: [
      { label: 'What makes repeat ordering easier for wards, theatres and cath labs?', href: '/insights/making-repeat-orders-easier/' },
    ],
    // Sizes and material sit in the checks above, so this list covers quantities, dates and documentation.
    sections: [
      {
        heading: 'Requesting product information',
        intro: 'To help us send the right information, tell us:',
        items: [
          'The procedural setting, for example a cath lab, interventional radiology or fluoroscopy',
          'Expected quantities and how often you would like to replenish',
          'The date you need the gloves',
          'Whether you need technical documentation or attenuation test data for evaluation or procurement',
        ],
      },
    ],
  },
];

/** Home page, Portfolio overview and menu order: lead areas first, then the wider portfolio. */
export const leadPortfolio: SpecialitySlug[] = ['orthopaedics', 'spinal-surgery', 'neurosurgery'];
export const widerPortfolio: SpecialitySlug[] = ['urology', 'pain-management', 'radiation-protection'];

export const specialityBySlug = (slug: string) => specialities.find((s) => s.slug === slug);

/** Values offered in the enquiry form. The first six match speciality slugs for URL prefill. */
export const formSpecialities = [
  ...specialities.map((s) => ({ value: s.name, slug: s.slug as string })),
  { value: 'General enquiry', slug: 'general' },
];

// Option values are submitted as-is; keep existing values unchanged so reports and handling stay consistent.
export const enquiryTypes = [
  'Plan a case',
  'Request a meeting',
  'Product information',
  'Supply or quotation',
  'Reorder products',
  'Technical documentation',
  'Equipment or support question',
  'RF product training',
  'Other',
];

/** Allowlisted ?type= values that preselect an enquiry type on the Contact form. */
export const enquiryTypeParams: Record<string, string> = {
  'plan-a-case': 'Plan a case',
  meeting: 'Request a meeting',
  'rf-training': 'RF product training',
};

export const regions = [
  'Eastern Cape',
  'Free State',
  'Gauteng',
  'KwaZulu-Natal',
  'Limpopo',
  'Mpumalanga',
  'North West',
  'Northern Cape',
  'Western Cape',
  'Outside South Africa',
];

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about/' },
  { label: 'Portfolio', href: '/portfolio/', children: true },
  { label: 'Support', href: '/support/' },
  { label: 'Insights', href: '/insights/', insights: true },
  { label: 'Contact', href: '/contact/' },
];

export const contactHref = (slug?: string, type?: keyof typeof enquiryTypeParams) => {
  const q = [slug && `speciality=${slug}`, type && `type=${type}`].filter(Boolean).join('&');
  return `/contact/${q ? `?${q}` : ''}#enquiry-form`;
};
