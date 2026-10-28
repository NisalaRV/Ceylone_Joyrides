import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import Logo from './Logo.jsx';
import Button from './Button.jsx';
import WhatsAppButton from './WhatsAppButton.jsx';
import siteConfig from '../config/siteConfig.js';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu after navigating.
  useEffect(() => setOpen(false), [pathname]);

  // Lock page scroll and allow Escape to close while the mobile menu is open.
  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid ? 'border-b border-white/10 bg-midnight/85 py-3 backdrop-blur-xl' : 'bg-transparent py-5'
      }`}
    >
      <div className="container-x flex items-center justify-between">
        <Logo onClick={() => setOpen(false)} />

        <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
          {siteConfig.nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `group relative py-2 text-[0.9rem] font-semibold tracking-wide transition-colors ${
                  isActive ? 'text-gold' : 'text-ivory/85 hover:text-ivory'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  <span
                    className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-gold transition-transform duration-300 ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button to="/booking" size="sm" className="hidden lg:inline-flex" iconRight={<ArrowRight size={16} />}>
            Plan Your Journey
          </Button>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-ivory transition hover:border-gold hover:text-gold lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={reduce ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="fixed inset-x-0 bottom-0 top-[4.4rem] overflow-y-auto bg-midnight lg:hidden"
          >
            <nav aria-label="Mobile" className="container-x flex min-h-full flex-col pb-10 pt-6">
              <ul className="divide-y divide-white/10">
                {siteConfig.nav.map((item, i) => (
                  <motion.li
                    key={item.to}
                    initial={reduce ? false : { opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: reduce ? 0 : 0.05 * i + 0.08 }}
                  >
                    <NavLink
                      to={item.to}
                      end={item.to === '/'}
                      className={({ isActive }) =>
                        `flex items-center justify-between py-5 font-display text-3xl ${
                          isActive ? 'text-gold' : 'text-ivory'
                        }`
                      }
                    >
                      {item.label}
                      <ArrowRight size={20} className="opacity-50" />
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-8 grid gap-3">
                <Button to="/booking" size="lg">
                  Plan Your Journey
                </Button>
                <WhatsAppButton size="lg" variant="outline" />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
