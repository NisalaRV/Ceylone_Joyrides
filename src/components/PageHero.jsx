import { motion, useReducedMotion } from 'framer-motion';
import Img from './Img.jsx';

/**
 * Hero banner used at the top of inner pages. The navbar sits transparently on top
 * of it, so it is always dark. Pass `image` for a photographic banner.
 */
export default function PageHero({ eyebrow, title, text, image, position, tall = false, children }) {
  const reduce = useReducedMotion();
  const fade = (delay) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
        };

  return (
    <section
      className={`relative isolate overflow-hidden bg-night-forest ${
        tall ? 'min-h-[78svh]' : 'min-h-[50svh]'
      } flex items-end`}
    >
      {image && (
        <div className="absolute inset-0 -z-10">
          <Img image={image} eager width={1800} position={position} sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/55 to-midnight/50" />
        </div>
      )}
      {!image && (
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_10%,rgba(213,180,119,0.18),transparent_45%)]"
        />
      )}
      <div className="container-x pb-14 pt-36 sm:pb-20 sm:pt-44">
        <motion.p {...fade(0.05)} className="eyebrow eyebrow-light">
          {eyebrow}
        </motion.p>
        <motion.h1 {...fade(0.15)} className="display-xl mt-5 max-w-4xl text-ivory">
          {title}
        </motion.h1>
        {text && (
          <motion.p {...fade(0.28)} className="mt-6 max-w-2xl text-base leading-relaxed text-ivory/80 sm:text-lg">
            {text}
          </motion.p>
        )}
        {children && <motion.div {...fade(0.4)}>{children}</motion.div>}
      </div>
    </section>
  );
}
