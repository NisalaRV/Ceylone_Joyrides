
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
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock page scrolling and close the menu with Escape.
  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const solid = scrolled || open;

  const navLinkClass = ({ isActive }) =>
      `flex items-center justify-between py-5 font-display text-2xl transition-colors duration-200 ${
          isActive ? 'text-gold' : 'text-ivory hover:text-gold'
      }`;

  return (
      <>
        <header
            className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
                solid
                    ? 'border-b border-white/10 bg-midnight/95 py-3 backdrop-blur-xl'
                    : 'bg-transparent py-5'
            }`}
        >
          <div className="container-x flex items-center justify-between">
            <Logo onClick={() => setOpen(false)} />

            {/* Desktop navigation */}
            <nav
                aria-label="Primary navigation"
                className="hidden items-center gap-9 lg:flex"
            >
              {siteConfig.nav.map((item) => (
                  <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.to === '/'}
                      className={({ isActive }) =>
                          `group relative py-2 text-sm font-semibold tracking-wide transition-colors ${
                              isActive
                                  ? 'text-gold'
                                  : 'text-ivory/85 hover:text-ivory'
                          }`
                      }
                  >
                    {({ isActive }) => (
                        <>
                          {item.label}
                          <span
                              className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-gold transition-transform duration-300 ${
                                  isActive
                                      ? 'scale-x-100'
                                      : 'scale-x-0 group-hover:scale-x-100'
                              }`}
                          />
                        </>
                    )}
                  </NavLink>
              ))}
            </nav>

            {/* Desktop booking and mobile toggle */}
            <div className="flex items-center gap-3">
              <Button
                  to="/booking"
                  size="sm"
                  className="hidden lg:inline-flex"
                  iconRight={<ArrowRight size={16} />}
              >
                Plan Your Journey
              </Button>

              <button
                  type="button"
                  className="relative z-[70] inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-midnight/80 text-ivory transition hover:border-gold hover:text-gold lg:hidden"
                  aria-label={open ? 'Close menu' : 'Open menu'}
                  aria-expanded={open}
                  aria-controls="mobile-menu"
                  onClick={() => setOpen((previous) => !previous)}
              >
                {open ? <X size={23} /> : <Menu size={23} />}
              </button>
            </div>
          </div>
        </header>

        {/* Mobile navigation */}
        <AnimatePresence>
          {open && (
              <motion.div
                  id="mobile-menu"
                  key="mobile-menu"
                  initial={reduce ? false : { opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  className="fixed inset-0 z-[60] overflow-y-auto bg-midnight lg:hidden"
              >
                <nav
                    aria-label="Mobile navigation"
                    className="container-x flex min-h-full flex-col px-5 pb-10 pt-24"
                >
                  <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-gold">
                    Explore
                  </p>

                  <ul className="divide-y divide-white/10 border-y border-white/10">
                    {siteConfig.nav.map((item, index) => (
                        <motion.li
                            key={item.to}
                            initial={reduce ? false : { opacity: 0, x: -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.2,
                              delay: reduce ? 0 : index * 0.04,
                            }}
                        >
                          <NavLink
                              to={item.to}
                              end={item.to === '/'}
                              className={navLinkClass}
                          >
                            <span>{item.label}</span>
                            <ArrowRight size={19} className="shrink-0 opacity-60" />
                          </NavLink>
                        </motion.li>
                    ))}
                  </ul>

                  <div className="mt-7 grid gap-3">
                    <Button
                        to="/booking"
                        size="lg"
                        className="w-full justify-center"
                        onClick={() => setOpen(false)}
                    >
                      Plan Your Journey
                    </Button>

                    <WhatsAppButton size="lg" variant="outline" />
                  </div>

                  <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="mt-6 self-center py-3 text-sm text-ivory/60 transition hover:text-gold"
                  >
                    Close menu
                  </button>
                </nav>
              </motion.div>
          )}
        </AnimatePresence>
      </>
  );
}
