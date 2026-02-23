// ── Types ──

export type MemberRole = 'maker' | 'designer' | 'buyer';

export interface MacroArea {
  id: string;
  label: string;
}

export interface Region {
  id: string;
  label: string;
  macroAreaId: string;
}

export interface GroupBuy {
  id: string;
  itemName: string;
  supplierName: string;
  category: GroupBuyCategory;
  macroAreaIds: string[];
  regionIds: string[];
  eligibleRoles: MemberRole[];
  targetUnits: number;
  currentUnits: number;
  tiers: PriceTier[];
  deadline: string;
  deliveryWindow: string;
  status: 'active' | 'upcoming' | 'completed';
  description: string;
  specs: string[];
  terms: string;
  participationPolicy: string;
}

export interface PriceTier {
  label: string;
  threshold: number;
  pricePerUnit: number;
  unlocked: boolean;
}

export type GroupBuyCategory = 'filament' | 'resin' | 'nozzles' | 'build-plates' | 'tools' | 'packaging' | 'other';

export interface Deal {
  id: string;
  title: string;
  type: 'member-price' | 'bundle' | 'limited-promo' | 'credits' | 'shipping';
  forRoles: MemberRole[];
  macroAreaIds: string[];
  regionIds: string[];
  category: string;
  expiration: string;
  description: string;
  terms: string;
  cta: string;
}

export interface Supplier {
  id: string;
  name: string;
  macroAreaIds: string[];
  regionIds: string[];
  categories: string[];
  agreementType: string;
  qualityNotes: string;
  description: string;
  agreementDetails: {
    whatMembersGet: string;
    eligibility: string;
    howToRedeem: string;
    limitations: string;
  };
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  forRoles: MemberRole[];
  tags: string[];
  category: string;
}

export interface CommunityEvent {
  id: string;
  title: string;
  date: string;
  type: 'workshop' | 'ama' | 'qa' | 'clinic' | 'meetup';
  forRoles: MemberRole[];
  regionIds: string[];
  isOnline: boolean;
  description: string;
}

// ── Static Data ──

export const macroAreas: MacroArea[] = [
  { id: 'us', label: 'United States' },
  { id: 'uk', label: 'UK / Europe' },
];

export const regions: Region[] = [
  { id: 'la', label: 'Los Angeles Area', macroAreaId: 'us' },
  { id: 'ny', label: 'New York Area', macroAreaId: 'us' },
  { id: 'madrid', label: 'Madrid Area', macroAreaId: 'eu' },
  { id: 'berlin', label: 'Berlin Area', macroAreaId: 'eu' },
  { id: 'london', label: 'UK / London Area', macroAreaId: 'uk' },
];

export const groupBuyCategories: { value: GroupBuyCategory; label: string }[] = [
  { value: 'filament', label: 'Filament' },
  { value: 'resin', label: 'Resin' },
  { value: 'nozzles', label: 'Nozzles' },
  { value: 'build-plates', label: 'Build Plates' },
  { value: 'tools', label: 'Tools' },
  { value: 'packaging', label: 'Packaging' },
  { value: 'other', label: 'Other' },
];

export const roleLabels: Record<MemberRole, string> = {
  maker: 'Maker',
  designer: 'Designer',
  buyer: 'Buyer',
};

// ── Mock Data ──

export const mockGroupBuys: GroupBuy[] = [
  {
    id: 'gb1',
    itemName: 'PETG 1kg Spools (10-pack)',
    supplierName: 'FilaSource EU',
    category: 'filament',
    macroAreaIds: ['eu'],
    regionIds: ['madrid', 'berlin'],
    eligibleRoles: ['maker'],
    targetUnits: 200,
    currentUnits: 144,
    tiers: [
      { label: 'Tier 1 — Baseline', threshold: 50, pricePerUnit: 18.5, unlocked: true },
      { label: 'Tier 2', threshold: 150, pricePerUnit: 15.9, unlocked: false },
      { label: 'Tier 3', threshold: 300, pricePerUnit: 13.2, unlocked: false },
    ],
    deadline: '2026-03-15',
    deliveryWindow: '2–3 weeks after close',
    status: 'active',
    description: 'High-quality PETG filament in 1 kg spools. Consistent diameter (±0.02 mm), low moisture packaging. Great for functional parts and prototypes.',
    specs: ['Diameter: 1.75 mm ±0.02', 'Net weight: 1 kg per spool', 'Colors: Black, White, Natural, Grey', 'Temp range: 220–250 °C'],
    terms: 'No charge until threshold is reached. If the group buy does not meet the minimum target by the deadline, all pre-authorizations are released and no one is charged.',
    participationPolicy: 'Pre-authorized and captured only if successful',
  },
  {
    id: 'gb2',
    itemName: 'Hardened Steel Nozzle Pack (5 nozzles)',
    supplierName: 'NozzlePro',
    category: 'nozzles',
    macroAreaIds: ['us'],
    regionIds: ['la', 'ny'],
    eligibleRoles: ['maker'],
    targetUnits: 100,
    currentUnits: 87,
    tiers: [
      { label: 'Tier 1 — Baseline', threshold: 30, pricePerUnit: 24, unlocked: true },
      { label: 'Tier 2', threshold: 80, pricePerUnit: 19.5, unlocked: true },
      { label: 'Tier 3', threshold: 150, pricePerUnit: 16, unlocked: false },
    ],
    deadline: '2026-03-01',
    deliveryWindow: '1–2 weeks after close',
    status: 'active',
    description: 'Pack of 5 hardened steel nozzles (0.4 mm). Compatible with most FDM printers. Ideal for abrasive filaments like carbon fiber or glow-in-the-dark.',
    specs: ['Material: Hardened steel', 'Sizes: 0.4 mm', 'Thread: MK8/MK10 compatible', 'Pack of 5'],
    terms: 'No charge until threshold is reached.',
    participationPolicy: 'Pre-authorized and captured only if successful',
  },
  {
    id: 'gb3',
    itemName: 'UV Resin — Standard Grey (5L)',
    supplierName: 'ResinWorks',
    category: 'resin',
    macroAreaIds: ['eu', 'uk'],
    regionIds: ['madrid', 'berlin', 'london'],
    eligibleRoles: ['maker'],
    targetUnits: 80,
    currentUnits: 22,
    tiers: [
      { label: 'Tier 1 — Baseline', threshold: 30, pricePerUnit: 52, unlocked: false },
      { label: 'Tier 2', threshold: 60, pricePerUnit: 44, unlocked: false },
      { label: 'Tier 3', threshold: 100, pricePerUnit: 38, unlocked: false },
    ],
    deadline: '2026-04-01',
    deliveryWindow: '3–4 weeks after close',
    status: 'upcoming',
    description: 'Standard grey UV resin for LCD/DLP printers. Low odor formula, excellent detail reproduction. Great for miniatures and prototyping.',
    specs: ['Volume: 5 L', 'Wavelength: 405 nm', 'Viscosity: 150–200 mPa·s', 'Color: Standard Grey'],
    terms: 'Pre-authorization only. Full refund if threshold is not met.',
    participationPolicy: 'Pre-authorized and captured only if successful',
  },
  {
    id: 'gb4',
    itemName: 'Eco Packaging Starter Kit',
    supplierName: 'GreenShip',
    category: 'packaging',
    macroAreaIds: ['eu', 'us', 'uk'],
    regionIds: ['la', 'ny', 'madrid', 'berlin', 'london'],
    eligibleRoles: ['maker'],
    targetUnits: 150,
    currentUnits: 150,
    tiers: [
      { label: 'Tier 1 — Baseline', threshold: 50, pricePerUnit: 12, unlocked: true },
      { label: 'Tier 2', threshold: 100, pricePerUnit: 9.5, unlocked: true },
      { label: 'Tier 3', threshold: 150, pricePerUnit: 7.8, unlocked: true },
    ],
    deadline: '2026-02-01',
    deliveryWindow: 'Shipped',
    status: 'completed',
    description: 'Sustainable packaging kit including recycled mailers, tissue paper, and branded stickers. Perfect for shipping 3D printed products.',
    specs: ['25× recycled poly mailers', '50× tissue sheets', '25× thank-you stickers', 'All recyclable / compostable'],
    terms: 'Completed successfully. All participants charged at Tier 3 pricing.',
    participationPolicy: 'Pre-authorized and captured only if successful',
  },
];

export const mockDeals: Deal[] = [
  {
    id: 'd1',
    title: '15% off all PLA filament orders',
    type: 'member-price',
    forRoles: ['maker'],
    macroAreaIds: ['eu', 'us'],
    regionIds: ['la', 'ny', 'madrid', 'berlin'],
    category: 'Filament',
    expiration: '2026-03-31',
    description: 'Exclusive member pricing on PLA filament from our partner suppliers. No minimum order.',
    terms: 'Valid once per member. Cannot be combined with group buy pricing.',
    cta: 'Get code',
  },
  {
    id: 'd2',
    title: 'Designer resource bundle — free',
    type: 'bundle',
    forRoles: ['designer'],
    macroAreaIds: ['eu', 'us', 'uk'],
    regionIds: ['la', 'ny', 'madrid', 'berlin', 'london'],
    category: 'Resources',
    expiration: '2026-06-30',
    description: 'Free access to our printability checklist, file packaging templates, and listing quality guide.',
    terms: 'Available to all registered designers.',
    cta: 'Activate',
  },
  {
    id: 'd3',
    title: '€5 credit on your next order',
    type: 'credits',
    forRoles: ['buyer'],
    macroAreaIds: ['eu', 'uk'],
    regionIds: ['madrid', 'berlin', 'london'],
    category: 'Credits',
    expiration: '2026-04-15',
    description: 'A €5 credit applied automatically on your next qualifying order (min. €25).',
    terms: 'One per account. Min. order €25. Cannot be combined with other credits.',
    cta: 'Redeem',
  },
  {
    id: 'd4',
    title: 'Free local pickup for members',
    type: 'shipping',
    forRoles: ['buyer'],
    macroAreaIds: ['eu', 'us'],
    regionIds: ['la', 'madrid'],
    category: 'Shipping',
    expiration: '2026-05-31',
    description: 'Zero shipping fees when you pick up from a local maker within your region.',
    terms: 'Applies to orders fulfilled by verified makers in your region.',
    cta: 'Activate',
  },
  {
    id: 'd5',
    title: 'Nozzle maintenance kit — member price',
    type: 'member-price',
    forRoles: ['maker'],
    macroAreaIds: ['us'],
    regionIds: ['la', 'ny'],
    category: 'Tools',
    expiration: '2026-03-15',
    description: 'Maintenance kit with cleaning needles, brass brush, and thermal paste at reduced member pricing.',
    terms: 'Limited stock. One per member.',
    cta: 'Get code',
  },
];

export const mockSuppliers: Supplier[] = [
  {
    id: 's1',
    name: 'FilaSource EU',
    macroAreaIds: ['eu'],
    regionIds: ['madrid', 'berlin'],
    categories: ['Filament'],
    agreementType: 'Volume tiers',
    qualityNotes: 'Consistent batches, known tolerances (±0.02 mm). ISO certified production.',
    description: 'European filament manufacturer specializing in PLA, PETG, and specialty materials.',
    agreementDetails: {
      whatMembersGet: 'Tiered pricing based on community volume. Better terms than typical retail, when available.',
      eligibility: 'All verified makers in EU regions.',
      howToRedeem: 'Use your member code at checkout on FilaSource website, or join active group buys.',
      limitations: 'Volume tiers reset quarterly. Minimum order: 5 kg.',
    },
  },
  {
    id: 's2',
    name: 'NozzlePro',
    macroAreaIds: ['us'],
    regionIds: ['la', 'ny'],
    categories: ['Nozzles', 'Tools'],
    agreementType: 'Member codes',
    qualityNotes: 'Hardened steel and ruby-tipped options. Consistent bore quality.',
    description: 'US-based precision nozzle manufacturer for FDM printers.',
    agreementDetails: {
      whatMembersGet: 'Exclusive member discount codes and early access to new products.',
      eligibility: 'All verified makers in US regions.',
      howToRedeem: 'Apply your unique member code at nozzlepro.com checkout.',
      limitations: 'Codes valid for 30 days after issue. One use per code.',
    },
  },
  {
    id: 's3',
    name: 'ResinWorks',
    macroAreaIds: ['eu', 'uk'],
    regionIds: ['madrid', 'berlin', 'london'],
    categories: ['Resin'],
    agreementType: 'Negotiated community terms',
    qualityNotes: 'Low-odor formulas, batch-tested viscosity. Safety data sheets included.',
    description: 'Resin supplier with EU and UK distribution. Specializes in standard and engineering-grade resins.',
    agreementDetails: {
      whatMembersGet: 'Community-negotiated pricing on bulk resin orders. Access to beta formulas.',
      eligibility: 'Makers in EU and UK regions with resin printing capability.',
      howToRedeem: 'Join group buys or contact via the Community Hub for direct orders.',
      limitations: 'Minimum group order: 20 L. Individual orders subject to standard pricing.',
    },
  },
  {
    id: 's4',
    name: 'GreenShip',
    macroAreaIds: ['eu', 'us', 'uk'],
    regionIds: ['la', 'ny', 'madrid', 'berlin', 'london'],
    categories: ['Packaging'],
    agreementType: 'Volume tiers',
    qualityNotes: '100% recyclable materials. Carbon-neutral shipping option.',
    description: 'Sustainable packaging solutions for small businesses and makers.',
    agreementDetails: {
      whatMembersGet: 'Reduced pricing on eco-friendly packaging. Volume-based tiers unlock automatically.',
      eligibility: 'All member roles in all regions.',
      howToRedeem: 'Order through the Community Hub storefront or use member code on greenship.eco.',
      limitations: 'Free shipping on orders above €50.',
    },
  },
];

export const mockResources: Resource[] = [
  // Maker resources
  { id: 'r1', title: 'PLA Printing Guide', description: 'Temperature settings, bed adhesion tips, and common troubleshooting for PLA.', forRoles: ['maker'], tags: ['material', 'PLA', 'beginner'], category: 'Material Guides' },
  { id: 'r2', title: 'PETG Best Practices', description: 'How to get clean PETG prints: retraction, cooling, and layer adhesion.', forRoles: ['maker'], tags: ['material', 'PETG', 'intermediate'], category: 'Material Guides' },
  { id: 'r3', title: 'Cost Calculator Template', description: 'Spreadsheet to calculate per-print cost: time + material + electricity + failure buffer + margin.', forRoles: ['maker'], tags: ['business', 'pricing', 'tools'], category: 'Business Tools' },
  { id: 'r4', title: 'Printer Maintenance Schedule', description: 'When to replace nozzles, belts, and perform calibration checks.', forRoles: ['maker'], tags: ['maintenance', 'hardware'], category: 'Maintenance' },
  { id: 'r5', title: 'Packaging & Shipping Best Practices', description: 'How to package 3D printed items safely and sustainably.', forRoles: ['maker'], tags: ['shipping', 'packaging'], category: 'Operations' },
  // Designer resources
  { id: 'r6', title: 'Upload Checklist', description: 'File naming, orientation suggestions, support guidance, and version control.', forRoles: ['designer'], tags: ['upload', 'checklist', 'beginner'], category: 'Getting Started' },
  { id: 'r7', title: 'Printability Guidelines', description: 'Wall thickness, tolerances, overhang angles, and bridging limits.', forRoles: ['designer'], tags: ['design', 'printability', 'intermediate'], category: 'Design Quality' },
  { id: 'r8', title: 'Licensing Basics', description: 'Simple explanations of licensing options for your designs.', forRoles: ['designer'], tags: ['legal', 'licensing'], category: 'IP & Legal' },
  { id: 'r9', title: 'Listing Quality Tips', description: 'How to photograph/render your designs and write compelling descriptions.', forRoles: ['designer'], tags: ['listing', 'marketing'], category: 'Marketing' },
  { id: 'r10', title: 'How to Collaborate with Makers', description: 'A playbook for working effectively with makers on your designs.', forRoles: ['designer'], tags: ['collaboration', 'makers'], category: 'Collaboration' },
  // Buyer resources
  { id: 'r11', title: 'How to Choose Materials & Finishes', description: 'A buyer-friendly guide to PLA, PETG, ABS, resin and when each is right.', forRoles: ['buyer'], tags: ['materials', 'guide', 'beginner'], category: 'Buying Guide' },
  { id: 'r12', title: 'What Affects Price & Lead Time', description: 'Understand how material, complexity, size, and location impact your order.', forRoles: ['buyer'], tags: ['pricing', 'education'], category: 'Buying Guide' },
  { id: 'r13', title: 'How to Request Customization', description: 'Tips for safely requesting custom prints and communicating with makers.', forRoles: ['buyer'], tags: ['customization', 'tips'], category: 'Buying Guide' },
  { id: 'r14', title: 'Trusted Listings Explained', description: 'What "reviewed by the platform" means and how we curate quality.', forRoles: ['buyer'], tags: ['trust', 'quality'], category: 'Trust & Safety' },
];

export const mockEvents: CommunityEvent[] = [
  { id: 'e1', title: 'Filament 101 Workshop', date: '2026-03-10', type: 'workshop', forRoles: ['maker'], regionIds: ['madrid', 'berlin'], isOnline: true, description: 'Learn the basics of filament types and when to use each one.' },
  { id: 'e2', title: 'AMA: Pricing Your Prints', date: '2026-03-15', type: 'ama', forRoles: ['maker'], regionIds: ['la', 'ny', 'madrid', 'berlin', 'london'], isOnline: true, description: 'Ask our experienced makers anything about pricing strategies.' },
  { id: 'e3', title: 'Design for Printability Q&A', date: '2026-03-20', type: 'qa', forRoles: ['designer'], regionIds: ['la', 'ny', 'madrid', 'berlin', 'london'], isOnline: true, description: 'Get your printability questions answered by our maker community.' },
  { id: 'e4', title: 'Madrid Maker Meetup', date: '2026-04-05', type: 'meetup', forRoles: ['maker', 'designer', 'buyer'], regionIds: ['madrid'], isOnline: false, description: 'In-person meetup for the Madrid maker community. Share prints, tips, and connect.' },
  { id: 'e5', title: 'Supplier Q&A: FilaSource', date: '2026-04-12', type: 'qa', forRoles: ['maker'], regionIds: ['madrid', 'berlin'], isOnline: true, description: 'Direct Q&A with our partner supplier FilaSource about upcoming materials and community terms.' },
];

export const hubFaqs = [
  { q: 'How do regional group buys work?', a: 'Group buys pool demand from community members in a region. When enough people commit, we unlock better pricing from the supplier. No one is charged until the threshold is met.' },
  { q: "What if the threshold isn't reached?", a: 'If the target isn\'t met by the deadline, all pre-authorizations are released and no one is charged. No risk to you.' },
  { q: 'How are suppliers selected?', a: 'We vet suppliers for quality, reliability, and fair terms. The community can also suggest and vote on new suppliers.' },
  { q: 'Do I have to participate?', a: 'Not at all. Membership gives you access—you choose what to join. No pressure, no obligations.' },
  { q: 'Can I change my region?', a: 'Yes, you can update your region at any time from your profile or the region selector in the Hub.' },
  { q: 'How do you keep it fair across regions?', a: 'Each region has independent thresholds and terms. We aim to offer comparable benefits across areas as the community grows.' },
  { q: "What does 'reviewed by the platform' mean?", a: 'Every listing, maker, and supplier on MakeHug goes through a review process. We prioritize quality and transparency over volume.' },
];
