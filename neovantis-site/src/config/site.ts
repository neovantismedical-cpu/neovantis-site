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
  logo: '/images/neovantis-logo.png',
} as const;

export const credentials = [
  {
    title: 'SAMED member',
    text: 'Neovantis is a member of SAMED, the South African Medical Technology Industry Association.',
  },
  {
    title: 'SAHPRA licensed',
    text: 'Neovantis holds a medical device establishment licence from SAHPRA. The licence covers our activities as a company; it is not an approval of individual products.',
  },
  {
    title: 'Level 1 B-BBEE',
    text: 'Neovantis has Level 1 Broad-Based Black Economic Empowerment (B-BBEE) status.',
  },
  {
    title: 'ISO certified',
    text: 'Neovantis holds ISO certification. Ask our team for the certificate and its scope.',
  },
] as const;

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
  intro: [string, string];
  button: string;
  metaTitle: string;
  metaDescription: string;
  image?: { src: string; srcset: string; width: number; height: number; alt: string };
  /** Additional sections written for this refresh (see WEBSITE_HANDOVER.md) */
  sections: { heading: string; intro?: string; items?: string[]; note?: string }[];
}

export const specialities: Speciality[] = [
  {
    slug: 'orthopaedics',
    name: 'Orthopaedics',
    card: 'K-wire supply and information for orthopaedic and trauma teams.',
    h1: 'Orthopaedic fixation and K-wires',
    intro: [
      'Neovantis supplies Kirschner wires (K-wires) for orthopaedic and trauma teams.',
      'If you’re preparing for a case or replenishing stock, contact us to discuss the sizes and specifications you need, confirm availability or request a quote.',
    ],
    button: 'Enquire about orthopaedic products',
    metaTitle: 'K-Wire Supply for Orthopaedic and Trauma Teams',
    metaDescription:
      'Neovantis supplies Kirschner wires (K-wires) to orthopaedic and trauma teams. Contact our Umhlanga team about sizes, specifications, availability or a quote.',
    image: {
      src: '/images/optimised/k-wire-tray-illustration-960.webp',
      srcset:
        '/images/optimised/k-wire-tray-illustration-640.webp 640w, /images/optimised/k-wire-tray-illustration-960.webp 960w, /images/optimised/k-wire-tray-illustration-1280.webp 1280w',
      width: 960,
      height: 640,
      alt: 'Illustration of wires and pins arranged in an instrument tray',
    },
    sections: [
      {
        heading: 'What to include in a K-wire enquiry',
        intro: 'Including these details helps our team respond to the right specification first time:',
        items: [
          'Wire diameter and length',
          'Quantity required',
          'Packaging or sterility requirements',
          'When you need the wires, for example a planned case date or a stock replenishment cycle',
          'Your facility or organisation name',
        ],
      },
    ],
  },
  {
    slug: 'spinal-surgery',
    name: 'Spinal Surgery',
    card: 'Screw and rod systems and cervical fixation components.',
    h1: 'Spinal fixation systems',
    intro: [
      'Our spinal fixation range includes screw and rod systems, as well as cervical fixation components.',
      'Planning a case? Tell us which system you’re looking for. We can discuss the relevant implants, compatible instruments and what’s available for your planned date.',
    ],
    button: 'Discuss spinal fixation requirements',
    metaTitle: 'Spinal Fixation Supply: Screw and Rod Systems',
    metaDescription:
      'Spinal fixation supply from Neovantis, including screw and rod systems and cervical fixation components. Tell us the system and planned date to discuss availability.',
    sections: [
      {
        heading: 'What to include when planning a case',
        items: [
          'The system you’re looking for, if you have one in mind',
          'Whether you need screw and rod components, cervical fixation components or both',
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
    card: 'Cranial plates, screws, mesh and associated instruments.',
    h1: 'Cranial plates, screws and mesh',
    intro: [
      'Our cranial fixation range includes plates, screws, titanium mesh and associated instruments for neurosurgical teams.',
      'Contact us to discuss the components you need for a planned procedure and to check the availability of the corresponding instruments or tray.',
    ],
    button: 'Enquire about cranial fixation',
    metaTitle: 'Cranial Fixation Plates, Screws and Titanium Mesh',
    metaDescription:
      'Neovantis supplies cranial fixation plates, screws, titanium mesh and associated instruments to neurosurgical teams. Discuss components and instrument availability.',
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
    card: 'Urinary drainage and procedural access, dilation and retrieval.',
    h1: 'Urology products for drainage and procedures',
    intro: [
      'Neovantis supplies urinary drainage catheters and products for urological procedures, including access sheaths, dilators and retrieval baskets.',
      'Whether you’re replenishing ward stock or sourcing a product for theatre, contact us to discuss the item you need, check specifications and pack sizes or request a quote.',
    ],
    button: 'Enquire about urology products',
    metaTitle: 'Urology Devices and Consumables',
    metaDescription:
      'Urology devices and consumables from Neovantis: drainage catheters, access sheaths, dilators and retrieval baskets. Check specifications and pack sizes or request a quote.',
    sections: [
      {
        heading: 'Ward stock: urinary drainage',
        intro: 'For drainage catheter enquiries, tell us:',
        items: ['The product type and specification you use', 'Pack size and quantity', 'How often you replenish, if this is a regular order'],
      },
      {
        heading: 'Theatre: access, dilation and retrieval',
        intro: 'For access sheaths, dilators and retrieval baskets, tell us:',
        items: ['The item and specification you need', 'Quantity', 'When you need it, for example a planned theatre list'],
        note: 'This website handles professional supply enquiries only. It does not provide catheter care or homecare advice.',
      },
    ],
  },
  {
    slug: 'pain-management',
    name: 'Interventional Pain Management',
    card: 'RF ablation equipment, electrodes and cannulae.',
    h1: 'Radiofrequency equipment and accessories',
    intro: [
      'We supply radiofrequency (RF) ablation equipment and accessories for interventional pain management, including electrodes and cannulae.',
      'If you’re evaluating a generator or ordering consumables, tell us which platform you use or are considering. Contact us to check compatibility, request product information or enquire about technical support.',
    ],
    button: 'Discuss RF equipment and accessories',
    metaTitle: 'RF Ablation Equipment and Accessories',
    metaDescription:
      'RF ablation equipment and accessories for interventional pain management, including electrodes and cannulae. Tell us your platform to check compatibility.',
    image: {
      src: '/images/optimised/rf-electrodes-illustration-800.webp',
      srcset: '/images/optimised/rf-electrodes-illustration-480.webp 480w, /images/optimised/rf-electrodes-illustration-800.webp 800w',
      width: 800,
      height: 800,
      alt: 'Illustration of radiofrequency electrodes on a sterile drape',
    },
    sections: [
      {
        heading: 'Platform details to include',
        intro: 'Compatibility depends on the specific generator and accessory, so our team will need:',
        items: [
          'The make and model of the RF generator you use or are considering',
          'Whether you’re evaluating equipment, ordering consumables or both',
          'The electrodes or cannulae you need, with any specifications you already know',
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
    card: 'Radiation protection glove information for fluoroscopy and procedural teams.',
    h1: 'Radiation protection gloves',
    intro: [
      'Neovantis supplies sterile, single-use radiation protection gloves. For teams working in settings such as interventional cardiology and fluoroscopy, we can provide product information to help with selection and ordering.',
      'Contact us for product information on intended use, sizing and materials, or to discuss ordering and replenishment for your facility.',
    ],
    button: 'Request glove information',
    metaTitle: 'Radiation Protection Gloves',
    metaDescription:
      'Sterile, single-use radiation protection gloves from Neovantis. Request information on intended use, sizing and materials, or discuss replenishment for your facility.',
    sections: [
      {
        heading: 'Requesting product information',
        intro: 'To help us send the right information, tell us:',
        items: [
          'The procedural setting, for example interventional cardiology or fluoroscopy',
          'The sizes you need',
          'Any material requirements for your team',
          'Whether you need technical documentation for evaluation or procurement',
          'Expected quantities and how often you would like to replenish',
        ],
      },
    ],
  },
];

export const specialityBySlug = (slug: string) => specialities.find((s) => s.slug === slug);

/** Values offered in the enquiry form. The first six match speciality slugs for URL prefill. */
export const formSpecialities = [
  ...specialities.map((s) => ({ value: s.name, slug: s.slug as string })),
  { value: 'General enquiry', slug: 'general' },
];

export const enquiryTypes = [
  'Product information',
  'Supply or quotation',
  'Technical documentation',
  'Equipment or support question',
  'Other',
];

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
  { label: 'Specialities', href: '/specialities/', children: true },
  { label: 'Support', href: '/support/' },
  { label: 'Insights', href: '/insights/', insights: true },
  { label: 'Contact', href: '/contact/' },
];

export const contactHref = (slug?: string) => (slug ? `/contact/?speciality=${slug}#enquiry-form` : '/contact/#enquiry-form');
