import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { photo } from '../data/images.js';

/**
 * Accessible image lightbox: Escape closes, ←/→ navigate, swipe on touch screens,
 * focus moves to the close button and is restored by the parent on close.
 */
export default function Lightbox({ items, index, onClose, onPrev, onNext }) {
  const item = items[index];
  const reduce = useReducedMotion();
  const closeRef = useRef(null);
  const touchX = useRef(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => setFailed(false), [index]);

  useEffect(() => {
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') onPrev();
      else if (e.key === 'ArrowRight') onNext();
      else if (e.key === 'Tab') {
        // Keep keyboard focus inside the dialog.
        const focusables = Array.from(document.querySelectorAll('[data-lightbox-focus]')).filter(
          (el) => el.offsetParent !== null,
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose, onPrev, onNext]);

  if (!item) return null;

  const onTouchStart = (e) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 50) (dx > 0 ? onPrev : onNext)();
  };

  const navBtn =
    'absolute top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-midnight/60 text-ivory backdrop-blur transition hover:border-gold hover:text-gold sm:flex';

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`Photo viewer: ${item.caption}`}
      className="fixed inset-0 z-[90] flex flex-col bg-midnight/95 backdrop-blur-md"
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="flex items-center justify-between px-5 py-4 text-ivory sm:px-8" onClick={(e) => e.stopPropagation()}>
        <p className="text-sm text-ivory/70">
          {index + 1} / {items.length}
        </p>
        <button
          ref={closeRef}
          data-lightbox-focus
          type="button"
          onClick={onClose}
          aria-label="Close photo viewer"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 transition hover:border-gold hover:text-gold"
        >
          <X size={22} />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20">
        <button
          type="button"
          data-lightbox-focus
          aria-label="Previous photo"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className={`${navBtn} left-4 sm:left-6`}
        >
          <ChevronLeft size={24} />
        </button>

        <motion.figure
          key={item.id}
          initial={reduce ? false : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="flex max-h-full max-w-full flex-col items-center"
          onClick={(e) => e.stopPropagation()}
        >
          {failed ? (
            <div
              role="img"
              aria-label={item.alt}
              className="flex h-[50vh] w-[80vw] max-w-3xl items-center justify-center rounded-2xl bg-gradient-to-br from-forest to-midnight-700 p-6 text-center text-ivory/70"
            >
              This photo could not be loaded.
            </div>
          ) : (
            <img
              src={photo(item.src, 1800)}
              alt={item.alt}
              onError={() => setFailed(true)}
              referrerPolicy="no-referrer"
              className="max-h-[70vh] max-w-full rounded-2xl object-contain shadow-2xl sm:max-h-[74vh]"
            />
          )}
          <figcaption className="mt-4 text-center text-sm text-ivory/80">
            <span className="font-display text-lg text-ivory">{item.caption}</span>
            <span className="mx-2 text-gold">·</span>
            {item.category}
          </figcaption>
        </motion.figure>

        <button
          type="button"
          data-lightbox-focus
          aria-label="Next photo"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className={`${navBtn} right-4 sm:right-6`}
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Mobile prev/next buttons */}
      <div className="flex items-center justify-center gap-4 px-4 py-4 sm:hidden" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          data-lightbox-focus
          aria-label="Previous photo"
          onClick={onPrev}
          className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/25 text-ivory"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          type="button"
          data-lightbox-focus
          aria-label="Next photo"
          onClick={onNext}
          className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/25 text-ivory"
        >
          <ChevronRight size={22} />
        </button>
      </div>
    </motion.div>
  );
}
