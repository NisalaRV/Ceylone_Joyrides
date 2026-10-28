import { Armchair, Map, Shuffle, Smile, Sparkles } from 'lucide-react';
import SectionHeading from '../SectionHeading.jsx';
import Reveal from '../Reveal.jsx';
import { homeContent } from '../../data/content.js';

const ICONS = { map: Map, smile: Smile, shuffle: Shuffle, armchair: Armchair, sparkles: Sparkles };

export default function WhySection() {
  const c = homeContent.why;
  return (
    <section className="bg-ivory py-24 sm:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SectionHeading eyebrow={c.eyebrow} title={c.title} text={c.text} />
          </div>
        </div>
        <ul className="grid gap-5 sm:grid-cols-2 lg:col-span-8">
          {c.items.map((item, i) => {
            const Icon = ICONS[item.icon] || Sparkles;
            const last = i === c.items.length - 1;
            return (
              <Reveal as="li" key={item.title} delay={(i % 2) * 0.08} className={last ? 'sm:col-span-2' : ''}>
                <div className="group h-full rounded-3xl border border-midnight/10 bg-white p-7 transition duration-500 hover:-translate-y-1 hover:border-gold/60 hover:shadow-soft">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-forest text-gold transition duration-500 group-hover:bg-gold group-hover:text-midnight">
                    <Icon size={24} aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold">{item.title}</h3>
                  <p className="mt-2.5 text-[0.93rem] leading-relaxed text-midnight/70">{item.text}</p>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
