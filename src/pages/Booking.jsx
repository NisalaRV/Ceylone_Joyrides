import { CalendarCheck, MessageCircle, Handshake } from 'lucide-react';
import Seo from '../components/Seo.jsx';
import PageHero from '../components/PageHero.jsx';
import BookingForm from '../components/BookingForm.jsx';
import Img from '../components/Img.jsx';
import Reveal from '../components/Reveal.jsx';
import { images } from '../data/images.js';
import { bookingContent as c } from '../data/content.js';

const STEP_ICONS = [CalendarCheck, MessageCircle, Handshake];

export default function Booking() {
  return (
    <>
      <Seo title={c.seo.title} description={c.seo.description} />
      <PageHero eyebrow={c.hero.eyebrow} title={c.hero.title} text={c.hero.text} />

      <section className="bg-ivory pb-24 sm:pb-32">
        <div className="container-x">
          <div className="grid gap-10 lg:-mt-10 lg:grid-cols-12 lg:gap-12">
            {/* Visual side — first on mobile, sticky on desktop */}
            <aside className="lg:col-span-5 lg:order-2">
              <div className="relative -mt-10 overflow-hidden rounded-[2rem] bg-midnight text-ivory shadow-soft lg:sticky lg:top-28 lg:mt-0">
                <div className="relative aspect-[16/10] lg:aspect-[4/4.2]">
                  <Img image={images.booking} width={1200} eager sizes="(min-width:1024px) 40vw, 100vw" position="50% 40%" />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/40 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                    <h2 className="font-display text-2xl font-semibold sm:text-3xl">{c.side.title}</h2>
                  </div>
                </div>
                <ol className="space-y-5 p-6 sm:p-8">
                  {c.side.steps.map((s, i) => {
                    const Icon = STEP_ICONS[i];
                    return (
                      <li key={s} className="flex items-start gap-4">
                        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/50 text-gold">
                          <Icon size={18} aria-hidden="true" />
                        </span>
                        <span className="pt-1.5 text-[0.95rem] text-ivory/85">{s}</span>
                      </li>
                    );
                  })}
                  <li className="border-t border-white/10 pt-5 text-xs leading-relaxed text-ivory/60">{c.side.note}</li>
                </ol>
              </div>
            </aside>

            {/* Form side */}
            <Reveal className="lg:col-span-7 lg:order-1" y={20}>
              <div className="rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-midnight/5 sm:p-10 lg:mt-0">
                <h2 className="display-md">Tell us about your trip</h2>
                <p className="mb-8 mt-2 text-sm text-midnight/65">
                  Fields marked <span className="text-gold-600">*</span> are required.
                </p>
                <BookingForm />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
