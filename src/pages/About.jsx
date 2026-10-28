import { ArrowRight, Check, Compass, Armchair, Heart, ShieldCheck } from 'lucide-react';
import Seo from '../components/Seo.jsx';
import PageHero from '../components/PageHero.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import Reveal from '../components/Reveal.jsx';
import Img from '../components/Img.jsx';
import Button from '../components/Button.jsx';
import { images } from '../data/images.js';
import { aboutContent as c } from '../data/content.js';

const ICONS = { heart: Heart, shield: ShieldCheck, compass: Compass, armchair: Armchair };

export default function About() {
  return (
    <>
      <Seo title={c.seo.title} description={c.seo.description} />
      <PageHero
        tall
        eyebrow={c.hero.eyebrow}
        title={c.hero.title}
        text={c.hero.text}
        image={images.about}
        position="50% 55%"
      />

      {/* Story — asymmetric editorial layout */}
      <section className="bg-ivory py-24 sm:py-32">
        <div className="container-x grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHeading eyebrow={c.story.eyebrow} title={c.story.title} />
            <div className="mt-8 space-y-5 text-base leading-relaxed text-midnight/75 sm:text-[1.05rem]">
              {c.story.paragraphs.map((p) => (
                <Reveal key={p.slice(0, 24)} y={18}>
                  <p>{p}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="relative lg:col-span-6">
            <Reveal className="relative ml-auto aspect-[4/5] w-[78%] overflow-hidden rounded-[2rem] shadow-soft">
              <Img image={images.aboutInset1} width={1000} sizes="(min-width:1024px) 40vw, 80vw" />
            </Reveal>
            <Reveal
              delay={0.15}
              className="absolute -bottom-10 left-0 aspect-square w-[46%] overflow-hidden rounded-[1.75rem] border-[6px] border-ivory shadow-soft"
            >
              <Img image={images.aboutInset2} width={700} sizes="(min-width:1024px) 22vw, 45vw" />
            </Reveal>
            <div
              aria-hidden="true"
              className="absolute -right-3 top-10 hidden h-28 w-28 rounded-full border border-gold/60 sm:block"
            />
          </div>
        </div>
      </section>

      {/* Local assistance */}
      <section className="relative overflow-hidden bg-night-forest py-24 text-ivory sm:py-32">
        <div className="container-x grid items-center gap-14 lg:grid-cols-12">
          <Reveal className="order-2 lg:order-1 lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-2xl">
              <Img image={images.aboutInset3} width={1000} sizes="(min-width:1024px) 40vw, 100vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight/50 to-transparent" />
            </div>
          </Reveal>
          <div className="order-1 lg:order-2 lg:col-span-7 lg:pl-10">
            <SectionHeading tone="dark" eyebrow={c.local.eyebrow} title={c.local.title} text={c.local.text} />
            <ul className="mt-8 space-y-4">
              {c.local.points.map((pt, i) => (
                <Reveal as="li" key={pt} delay={i * 0.08} y={14} className="flex items-start gap-3.5">
                  <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold text-midnight">
                    <Check size={16} strokeWidth={3} aria-hidden="true" />
                  </span>
                  <span className="text-[0.98rem] text-ivory/85">{pt}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-ivory py-24 sm:py-32">
        <div className="container-x">
          <SectionHeading eyebrow={c.values.eyebrow} title={c.values.title} align="center" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {c.values.items.map((v, i) => {
              const Icon = ICONS[v.icon] || Heart;
              return (
                <Reveal key={v.title} delay={i * 0.08}>
                  <div className="h-full rounded-3xl border border-midnight/10 bg-white p-7 transition duration-500 hover:-translate-y-1 hover:border-gold/60 hover:shadow-soft">
                    <Icon className="text-forest" size={30} aria-hidden="true" />
                    <h3 className="mt-5 font-display text-xl font-semibold">{v.title}</h3>
                    <p className="mt-2.5 text-[0.93rem] leading-relaxed text-midnight/70">{v.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ivory-200 py-20 sm:py-24">
        <Reveal className="container-x text-center">
          <h2 className="display-lg mx-auto max-w-2xl">{c.cta.title}</h2>
          <p className="mx-auto mt-4 max-w-lg text-midnight/70">{c.cta.text}</p>
          <div className="mt-8 flex justify-center">
            <Button to="/booking" variant="dark" size="lg" iconRight={<ArrowRight size={18} aria-hidden="true" />}>
              {c.cta.button}
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
