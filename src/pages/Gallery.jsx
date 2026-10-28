import { useCallback, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Expand } from 'lucide-react';
import Seo from '../components/Seo.jsx';
import PageHero from '../components/PageHero.jsx';
import Img from '../components/Img.jsx';
import Lightbox from '../components/Lightbox.jsx';
import Button from '../components/Button.jsx';
import Reveal from '../components/Reveal.jsx';
import { gallery, galleryCategories } from '../data/gallery.js';
import { galleryContent as c } from '../data/content.js';

export default function Gallery() {
  const [category, setCategory] = useState('All');
  const [openIndex, setOpenIndex] = useState(null);
  const triggerRef = useRef(null);
  const reduce = useReducedMotion();

  const visible = category === 'All' ? gallery : gallery.filter((g) => g.category === category);

  const close = useCallback(() => {
    setOpenIndex(null);
    // return focus to the thumbnail that opened the lightbox
    setTimeout(() => triggerRef.current?.focus(), 0);
  }, []);
  const prev = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i - 1 + visible.length) % visible.length)),
    [visible.length],
  );
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i + 1) % visible.length)),
    [visible.length],
  );

  return (
    <>
      <Seo title={c.seo.title} description={c.seo.description} />
      <PageHero eyebrow={c.hero.eyebrow} title={c.hero.title} text={c.hero.text} />

      <section className="bg-ivory py-16 sm:py-24">
        <div className="container-x">
          {/* Category filters */}
          <div
            role="group"
            aria-label="Filter photos by category"
            className="-mx-5 flex gap-2.5 overflow-x-auto px-5 pb-3 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
          >
            {galleryCategories.map((cat) => {
              const active = cat === category;
              return (
                <button
                  key={cat}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setCategory(cat)}
                  className={`shrink-0 rounded-full border px-5 py-2.5 text-sm font-semibold transition duration-300 ${
                    active
                      ? 'border-forest bg-forest text-ivory shadow-soft'
                      : 'border-midnight/15 bg-white text-midnight/75 hover:border-gold hover:text-midnight'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Masonry via CSS columns keeps each photo's natural editorial ratio */}
          {/* Keyed by category so the grid re-mounts and fades in when a filter changes */}
          <ul key={category} className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3 lg:gap-5">
            {visible.map((item, i) => (
              <motion.li
                key={item.id}
                initial={reduce ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: reduce ? 0 : Math.min(i * 0.05, 0.4), ease: 'easeOut' }}
                className="mb-4 break-inside-avoid lg:mb-5"
              >
                <button
                  type="button"
                  aria-label={`Open photo: ${item.caption}`}
                  onClick={(e) => {
                    triggerRef.current = e.currentTarget;
                    setOpenIndex(i);
                  }}
                  className={`group relative block w-full overflow-hidden rounded-3xl bg-midnight ${item.ratio}`}
                >
                  <div className="absolute inset-0">
                    <Img
                      src={item.src}
                      alt={item.alt}
                      width={1000}
                      sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                      className="transition-transform duration-[900ms] ease-out group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight/75 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-left opacity-0 transition duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <div>
                      <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-gold">{item.category}</p>
                      <p className="mt-1 font-display text-lg text-ivory">{item.caption}</p>
                    </div>
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-ivory/15 text-ivory backdrop-blur">
                      <Expand size={18} aria-hidden="true" />
                    </span>
                  </div>
                </button>
              </motion.li>
            ))}
          </ul>

          {visible.length === 0 && <p className="mt-10 text-center text-midnight/60">No photos in this category yet.</p>}
          <p className="mt-10 text-sm text-midnight/55">{c.note}</p>
        </div>
      </section>

      <section className="bg-night-forest py-20 text-center text-ivory sm:py-24">
        <Reveal className="container-x">
          <h2 className="display-lg mx-auto max-w-2xl">{c.cta.title}</h2>
          <div className="mt-8 flex justify-center">
            <Button to="/booking" size="lg" iconRight={<ArrowRight size={18} aria-hidden="true" />}>
              {c.cta.button}
            </Button>
          </div>
        </Reveal>
      </section>

      <AnimatePresence>
        {openIndex !== null && (
          <Lightbox items={visible} index={openIndex} onClose={close} onPrev={prev} onNext={next} />
        )}
      </AnimatePresence>
    </>
  );
}
