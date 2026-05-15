"use client";

import { faqs } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Accordion } from "@/components/ui/Accordion";

export function FAQ() {
  const items = faqs.map((faq) => ({
    title: faq.question,
    content: <p>{faq.answer}</p>,
  }));

  return (
    <section className="section-padding bg-gradient-luxury">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently Asked Questions"
          subtitle="Everything you need to know before beginning your musical journey with us."
        />
        <Accordion items={items} />
      </div>
    </section>
  );
}
