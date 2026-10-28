import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronDown, MapPin } from 'lucide-react';
import Button from '../Button.jsx';
import Img from '../Img.jsx';
import siteConfig from '../../config/siteConfig.js';
import { homeContent } from '../../data/content.js';

export default function Hero() {
  const c = homeContent.hero;
  const reduce = useReducedMotion();

  const rise = (delay) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 34 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
        };

  return (
    <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-night-forest">
      {/* Photograph with slow settle-in zoom */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={reduce ? false : { scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.6, ease: 'easeOut' }}
      >
        <Img image={siteConfig.heroImage} eager width={1920} sizes="100vw" position="50% 62%" />
      </motion.div>

      {/* Cinematic overlays: readable text, bright horizon */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-midnight via-midnight/45 to-midnight/55" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_20%_85%,rgba(16,24,32,0.75),transparent_60%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_85%_15%,rgba(213,180,119,0.22),transparent_40%)]" />

      <div className="container-x pb-28 pt-40 sm:pb-32 md:pb-36">
        <motion.p
          {...rise(0.1)}
          className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-midnight/40 px-4 py-2 text-[0.72rem] font-bold uppercase tracking-[0.22em] text-gold backdrop-blur"
        >
          <MapPin size={14} aria-hidden="true" /> {c.label}
        </motion.p>

        <motion.h1 {...rise(0.22)} className="display-xl mt-7 max-w-5xl text-ivory">
          {c.headlineBefore} <span className="italic text-gold">{c.headlineAccent}</span>
        </motion.h1>

        <motion.p {...rise(0.38)} className="mt-6 max-w-xl text-base leading-relaxed text-ivory/85 sm:text-lg md:text-xl">
          {c.text}
        </motion.p>

        <motion.div {...rise(0.52)} className="mt-9 flex flex-col gap-3.5 sm:flex-row">
          <Button to="/booking" size="lg" iconRight={<ArrowRight size={18} aria-hidden="true" />}>
            {c.primaryCta}
          </Button>
          <Button href="#experiences" variant="outline" size="lg">
            {c.secondaryCta}
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#experiences"
        aria-label="Scroll to travel experiences"
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.3em] text-ivory/70 transition hover:text-gold md:flex"
      >
        {c.scrollLabel}
        <span className="relative flex h-10 w-6 justify-center rounded-full border border-ivory/40 pt-2">
          <span className="block h-1.5 w-1.5 animate-scrollDot rounded-full bg-gold motion-reduce:animate-none" />
        </span>
        <ChevronDown size={14} aria-hidden="true" className="-mt-1" />
      </a>
    </section>
  );
}
