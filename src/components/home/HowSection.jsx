import SectionHeading from '../SectionHeading.jsx';
import Reveal from '../Reveal.jsx';
import Button from '../Button.jsx';
import { ArrowRight } from 'lucide-react';
import { homeContent } from '../../data/content.js';

export default function HowSection() {
  const c = homeContent.how;
  return (
    <section className="relative overflow-hidden bg-night-forest py-24 text-ivory sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(213,180,119,0.14),transparent_40%)]"
      />
      <div className="container-x relative">
        <SectionHeading tone="dark" eyebrow={c.eyebrow} title={c.title} align="center" />

        <div className="relative mt-16">
          {/* dotted route line connecting the steps (large screens) */}
          <div
            aria-hidden="true"
            className="absolute left-[16%] right-[16%] top-8 hidden border-t-2 border-dashed border-gold/35 lg:block"
          />
          <ol className="grid gap-10 lg:grid-cols-3 lg:gap-8">
            {c.steps.map((step, i) => (
              <Reveal as="li" key={step.title} delay={i * 0.12} className="relative text-center">
                <span className="relative z-10 mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full border border-gold/60 bg-midnight font-display text-2xl text-gold shadow-gold">
                  {i + 1}
                </span>
                <h3 className="mt-6 font-display text-2xl font-semibold">{step.title}</h3>
                <p className="mx-auto mt-3 max-w-xs text-[0.95rem] leading-relaxed text-ivory/70">{step.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal className="mt-14 flex justify-center">
          <Button to="/booking" size="lg" iconRight={<ArrowRight size={18} aria-hidden="true" />}>
            Plan Your Journey
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
