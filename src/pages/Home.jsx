import Seo from '../components/Seo.jsx';
import Hero from '../components/home/Hero.jsx';
import ExperiencesSection from '../components/home/ExperiencesSection.jsx';
import DiscoverSection from '../components/home/DiscoverSection.jsx';
import WhySection from '../components/home/WhySection.jsx';
import HowSection from '../components/home/HowSection.jsx';
import GalleryPreview from '../components/home/GalleryPreview.jsx';
import FinalCta from '../components/home/FinalCta.jsx';
import Reveal from '../components/Reveal.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import { homeContent } from '../data/content.js';
import { testimonials } from '../data/testimonials.js';

export default function Home() {
  return (
    <>
      <Seo title={homeContent.seo.title} description={homeContent.seo.description} />
      <Hero />
      <ExperiencesSection />
      <DiscoverSection />
      <WhySection />
      <HowSection />
      <GalleryPreview />

      {/* Only renders when REAL, verified reviews are added to data/testimonials.js */}
      {testimonials.length > 0 && (
        <section className="bg-ivory-200 py-24">
          <div className="container-x">
            <SectionHeading eyebrow="Reviews" title="What travellers say" />
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {testimonials.map((t, i) => (
                <Reveal key={t.id} delay={i * 0.08}>
                  <figure className="h-full rounded-3xl bg-white p-7 shadow-soft">
                    <blockquote className="text-[0.95rem] leading-relaxed text-midnight/80">“{t.quote}”</blockquote>
                    <figcaption className="mt-5 text-sm font-semibold">
                      {t.name}
                      {t.origin && <span className="font-normal text-midnight/60"> · {t.origin}</span>}
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <FinalCta />
    </>
  );
}
