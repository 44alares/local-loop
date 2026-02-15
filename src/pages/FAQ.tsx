import { Layout } from '@/components/layout/Layout';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';

// General FAQs
const generalFaqs = [
  {
    question: 'What is MakeHug?',
    answer: 'MakeHug is a platform to buy physical 3D-printed products, created by independent designers and produced by makers close to the buyer.',
  },
  {
    question: 'Does MakeHug sell STL files?',
    answer: 'No. MakeHug sells physical products, not digital files to the public.',
  },
  {
    question: 'Then why are STL files uploaded?',
    answer: 'Files ("Designs") are uploaded so the item can be manufactured when an order is placed. MakeHug is not a download marketplace.',
  },
  {
    question: 'Who can view/download the STL?',
    answer: 'Only the maker selected for that specific order. The STL is not public and is not accessible to other makers or buyers.',
  },
  {
    question: 'How is pricing calculated?',
    answer: 'Pricing is calculated automatically using a "Fair Calculation" system (material, machine time, support complexity, and the Designer\'s royalty). No bidding, manual repricing, or manipulation of costs is allowed.',
  },
  {
    question: 'What quality standards does MakeHug apply?',
    answer: 'The maker warrants that their equipment is calibrated to standard tolerances and that they will use materials consistent with the Designer\'s "Real-Scale Proof."',
  },
  {
    question: 'Who manufactures and ships the order?',
    answer: 'Each order is manufactured and shipped by the maker who accepts it. MakeHug does not handle logistics or shipping.',
  },
  {
    question: 'What materials and colors are supported?',
    answer: 'Makers must use materials and colors that match the product listing requirements and the Designer\'s "Real-Scale Proof." If an exact material or color isn\'t available, the maker must request approval before substituting.',
  },
  {
    question: 'What happens if a print fails or arrives damaged?',
    answer: 'If a print fails during production, the maker should reprint before shipping. If a customer receives a damaged or clearly defective print, MakeHug will coordinate the resolution and may request photos to verify the issue.',
  },
  {
    question: 'How long does production take vs shipping?',
    answer: `\u2022 Standard (FDM, ~0.32 mm layer height): Layer lines are clearly visible, but the part keeps its essential shape and its functional/aesthetic value; best for most everyday functional prints where perfection isn't the goal.
\u2022 Premium (FDM, ~0.16 mm layer height): Smoother finish for parts where surface quality matters; layer lines may still be visible up close, but the overall look is noticeably cleaner.
\u2022 Ultra (Resin, ~0.05 mm layer height): Very high detail and a near line-free surface; ideal for small, high-definition parts and display/detail work (requires resin printing and post-processing).
\u2022 Baseline guarantee (all tiers): The maker warrants their equipment is calibrated to standard tolerances (\u00b10.2 mm) and will use materials consistent with the Designer's "Real-Scale Proof."`,
  },
];

// Maker FAQs
const makerFaqs = [
  {
    question: 'Can the maker reuse my file for other orders or personal use?',
    answer: `No. The maker acts as a contract manufacturer and agrees to:
\u2022 Use the file only to produce the quantity specified in the order.
\u2022 Not print extra copies (including for sale, gifts, marketing, or portfolio use) without the Designer's prior written consent.
\u2022 Delete all copies after completing the order and the warranty period (including local and cloud copies, and derivatives such as project/sliced files where applicable).`,
  },
  {
    question: 'What information will I receive with an order?',
    answer: 'You\'ll receive the production files required to fulfill the order, the selected quality tier, material/color requirements (if specified), quantity, ship-to country, and any Designer production notes. If anything critical is missing or unclear, request clarification before printing.',
  },
  {
    question: 'Are makers required to share photos before shipping?',
    answer: 'If the order is high-risk (large parts, ultra-fine details, tight tolerances) or the Designer requests it, makers may be asked to share quick proof photos before shipping. Photos should show the key surfaces and any critical-fit features.',
  },
  {
    question: 'What file formats can makers receive?',
    answer: 'Makers may receive STL and, when provided, other production-ready formats. If a file presents issues (scale ambiguity, mesh errors), the maker should request a corrected file or clarification before starting.',
  },
  {
    question: 'What packaging standards should makers follow?',
    answer: 'Package prints to prevent crushing and abrasion: protect thin features, avoid loose movement inside the box, and separate multipart pieces to prevent rubbing. Use sufficient padding so the print arrives in the same condition it left your bench.',
  },
  {
    question: 'Can I include a maker mark or signature on the print?',
    answer: 'Only if the listing or the Designer explicitly allows it. By default, do not add logos, marks, or engraved signatures.',
  },
  {
    question: 'What if the print is likely to fail (supports, tall thin parts, warping risk)?',
    answer: 'Pause and message before printing with a short explanation and suggested mitigation (orientation change, thicker walls if permissible, different material, splitting). The goal is preventing wasted time and inconsistent outcomes.',
  },
  {
    question: 'What if the customer requests a custom change or personalization?',
    answer: 'Do not modify the design unless the platform flow explicitly supports customization for that listing and the Designer has approved the change. Redirect the request to the proper customization process.',
  },
  {
    question: 'How are repeat orders handled (consistency)?',
    answer: 'For repeatability, keep your slicer profile and material consistent for that design/quality tier. If you need to change material brand, nozzle size, or key settings, flag it before producing another batch.',
  },
  {
    question: 'Are there restricted items makers should not print?',
    answer: 'Yes -- makers must refuse items that are illegal, unsafe, or violate third-party rights, and should flag suspicious requests. When in doubt, request clarification or decline the order.',
  },
  {
    question: 'Who decides orientation, supports, and print settings (infill/walls)?',
    answer: 'By default, the maker chooses orientation, supports, and print settings to achieve reliable results at the selected quality level. If the Designer provides mandatory production notes (for example, "no supports on face" or "strength-first"), the maker should follow them when feasible or request clarification before printing.',
  },
  {
    question: 'What post-processing is included by default?',
    answer: 'Standard post-processing includes safe support removal and basic cleanup consistent with the selected quality tier. Resin prints must be properly washed and cured. Advanced finishing (sanding to a cosmetic surface, coating, painting) is only included if explicitly stated in the listing.',
  },
];

// Designer FAQs
const designerFaqs = [
  {
    question: 'What does it mean if I set my design as Basic, Functional or Artistic?',
    answer: `This label helps set the right expectations for production and use.

\u2022 Basic: Simple items that don't need precise mechanical fit, special materials, or extra strength/heat resistance -- think desk organizers, simple decor, basic holders, and other non-critical accessories.

\u2022 Functional: parts where fit, tolerances, and durability matter (sliding/press-fit interfaces, mechanisms, replacement parts, brackets, mounts, adapters). Use this when the part must align correctly or withstand real stress/heat.

\u2022 Artistic: aesthetic pieces where detail and surface finish are the priority (figurines, sculptures, display models, high-detail decor).

Review note: Functional and Artistic objects always require manual team validation before publishing.

Fees note: The designer can set a fixed fee that varies by design type. On top of that fixed fee, a small variable fee is added based on the final sale price (you'll see the exact breakdown as amounts before publishing).`,
  },
  {
    question: 'What does the Designer guarantee when uploading a design?',
    answer: `By uploading a Design, the Designer warrants, under their sole responsibility, that:
\u2022 The design is their original work.
\u2022 They are not reselling or re-uploading third-party files (Thingiverse, Printables, Cults3D, Patreon, etc.), even if those files were shared under open licenses.
\u2022 They are not uploading designs that are identical to, or substantially similar to, designs already available on MakeHug.`,
  },
  {
    question: 'How does MakeHug prevent duplicates?',
    answer: 'MakeHug may run internal similarity checks to detect duplicates or near-identical designs. Flagged listings may be hidden, suspended, or removed, and repeated violations may result in account suspension.',
  },
  {
    question: 'What does MakeHug do about intellectual property?',
    answer: 'MakeHug operates as a neutral platform: users (Designers and Makers) are responsible for ensuring they have the necessary rights to upload, manufacture, and sell a design. MakeHug does not provide legal clearance or guarantee non-infringement.',
  },
  {
    question: 'What are "Generic Geometry Designs" and how are they handled?',
    answer: 'These are designs primarily based on basic/common geometric forms (e.g., cylinders or simple boxes). They may be uploaded and sold on MakeHug, but they are not eligible for exclusivity. However, the platform still blocks exact duplicates, near-identical copies, and cosmetic-only variations (e.g., only color, material, or negligible dimensional tweaks).',
  },
  {
    question: 'Can MakeHug request proof of authorship?',
    answer: 'Yes. MakeHug may request reasonable proof of authorship (e.g., CAD/STEP/F3D files, version history, sketches, or process screenshots). If it is not provided within the timeframe specified in the contract, the listing or account may be suspended and funds may be withheld according to the terms.',
  },
  {
    question: 'What if I believe someone has copied my design on MakeHug?',
    answer: 'You can report it. MakeHug will review the case, may request information from both parties, and may hide or remove the listing if appropriate, including applying sanctions for repeated violations.',
  },
  {
    question: 'What if I receive an IP claim about my listing?',
    answer: 'MakeHug may disable the content and open a review. You may submit evidence (design process, editable source files, history, etc.). Decisions and appeal options are handled under the platform\'s terms.',
  },
  {
    question: 'Can I include mandatory production notes for makers?',
    answer: 'Yes. Designers can include production notes (for example: orientation preferences, "cosmetic face", strength requirements, material constraints, or areas where supports must be avoided). Makers should follow these notes when feasible and ask for clarification if anything is unclear.',
  },
  {
    question: 'What happens if my model is not printable as-is?',
    answer: 'If a model has printability issues (thin walls, unsupported features, non-manifold geometry), the maker may request clarification or suggest adjustments before printing. Any change that affects the final look or function should be approved by the Designer before production.',
  },
];

export default function FAQ() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-hero py-12 md:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-secondary/10 mb-4">
              <HelpCircle className="h-7 w-7 text-secondary" />
            </div>
            <h1 className="text-display-sm font-bold mb-3">
              Frequently Asked Questions
            </h1>
            <p className="text-muted-foreground">
              Everything you need to know about MakeHug, our platform, and how we protect designers and makers.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-10">
            {/* General */}
            <div>
              <h2 className="text-xl font-bold mb-4 pb-2 border-b border-border">General</h2>
              <Accordion type="single" collapsible className="w-full">
                {generalFaqs.map((item, index) => (
                  <AccordionItem key={index} value={`general-${index}`} className="border-border">
                    <AccordionTrigger className="text-left text-sm font-semibold hover:text-secondary hover:no-underline py-3">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm whitespace-pre-line pb-3">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* For Makers */}
            <div>
              <h2 className="text-xl font-bold mb-4 pb-2 border-b border-border">For Makers</h2>
              <Accordion type="single" collapsible className="w-full">
                {makerFaqs.map((item, index) => (
                  <AccordionItem key={index} value={`maker-${index}`} className="border-border">
                    <AccordionTrigger className="text-left text-sm font-semibold hover:text-secondary hover:no-underline py-3">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm whitespace-pre-line pb-3">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* For Designers */}
            <div>
              <h2 className="text-xl font-bold mb-4 pb-2 border-b border-border">For Designers</h2>
              <Accordion type="single" collapsible className="w-full">
                {designerFaqs.map((item, index) => (
                  <AccordionItem key={index} value={`designer-${index}`} className="border-border">
                    <AccordionTrigger className="text-left text-sm font-semibold hover:text-secondary hover:no-underline py-3">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm whitespace-pre-line pb-3">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
