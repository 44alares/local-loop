import { Layout } from '@/components/layout/Layout';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';

const faqData = [
  {
    question: 'What is MakeHug?',
    answer: 'MakeHug is a platform to buy physical 3D‑printed products, created by independent designers and produced by makers close to the buyer.',
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
    question: 'What does MakeHug do about intellectual property?',
    answer: 'MakeHug operates as a neutral platform: users (Designers and Makers) are responsible for ensuring they have the necessary rights to upload, manufacture, and sell a design. MakeHug does not provide legal clearance or guarantee non‑infringement.',
  },
  {
    question: 'What does the Designer guarantee when uploading a design?',
    answer: `By uploading a Design, the Designer warrants, under their sole responsibility, that:
• The design is their original work.
• They are not reselling or re‑uploading third‑party files (Thingiverse, Printables, Cults3D, Patreon, etc.), even if those files were shared under open licenses.
• They are not uploading designs that are identical to, or substantially similar to, designs already available on MakeHug.`,
  },
  {
    question: 'How does MakeHug prevent duplicates?',
    answer: 'MakeHug may run internal similarity checks to detect duplicates or near‑identical designs. Flagged listings may be hidden, suspended, or removed, and repeated violations may result in account suspension.',
  },
  {
    question: 'What are "Generic Geometry Designs" and how are they handled?',
    answer: 'These are designs primarily based on basic/common geometric forms (e.g., cylinders or simple boxes). They may be uploaded and sold on MakeHug, but they are not eligible for exclusivity. However, the platform still blocks exact duplicates, near‑identical copies, and cosmetic‑only variations (e.g., only color, material, or negligible dimensional tweaks).',
  },
  {
    question: 'Who manufactures and ships the order?',
    answer: 'Each order is manufactured and shipped by the maker who accepts it. MakeHug does not handle logistics or shipping.',
  },
  {
    question: 'Can the maker reuse my file for other orders or personal use?',
    answer: `No. The maker acts as a contract manufacturer and agrees to:
• Use the file only to produce the quantity specified in the order.
• Not print extra copies (including for sale, gifts, marketing, or portfolio use) without the Designer's prior written consent.
• Delete all copies after completing the order and the warranty period (including local and cloud copies, and derivatives such as project/sliced files where applicable).`,
  },
  {
    question: 'Can MakeHug request proof of authorship?',
    answer: 'Yes. MakeHug may request reasonable proof of authorship (e.g., CAD/STEP/F3D files, version history, sketches, or process screenshots). If it is not provided within the timeframe specified in the contract, the listing or account may be suspended and funds may be withheld according to the terms.',
  },
  {
    question: 'How is pricing calculated?',
    answer: 'Pricing is calculated automatically using a "Fair Calculation" system (material, machine time, support complexity, and the Designer\'s royalty). No bidding, manual repricing, or manipulation of costs is allowed.',
  },
  {
    question: 'What quality standards does MakeHug apply?',
    answer: 'The maker warrants that their equipment is calibrated to standard tolerances (±0.2 mm) and that they will use materials consistent with the Designer\'s "Real‑Scale Proof."',
  },
  {
    question: 'What if I believe someone has copied my design on MakeHug?',
    answer: 'You can report it. MakeHug will review the case, may request information from both parties, and may hide or remove the listing if appropriate, including applying sanctions for repeated violations.',
  },
  {
    question: 'What if I receive an IP claim about my listing?',
    answer: 'MakeHug may disable the content and open a review. You may submit evidence (design process, editable source files, history, etc.). Decisions and appeal options are handled under the platform\'s terms.',
  },
];

export default function FAQ() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-hero py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-secondary/10 mb-6">
              <HelpCircle className="h-8 w-8 text-secondary" />
            </div>
            <h1 className="text-display font-bold mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about MakeHug, our platform, and how we protect designers and makers.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqData.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-border">
                  <AccordionTrigger className="text-left text-base font-semibold hover:text-secondary hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground whitespace-pre-line">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </Layout>
  );
}
