import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUp,
  Instagram,
  Facebook,
  Youtube,
  Mail,
  MapPin,
  Phone,
  MessageCircle,
} from 'lucide-react';
import Logo from './Logo.jsx';
import WhatsAppButton from './WhatsAppButton.jsx';
import siteConfig from '../config/siteConfig.js';
import { footerContent } from '../data/content.js';
import { buildMailtoUrl, hasEmail, isWhatsAppConfigured, buildWhatsAppUrl } from '../lib/contact.js';

function SocialLink({ href, label, children }) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-ivory/80 transition hover:-translate-y-0.5 hover:border-gold hover:text-gold"
    >
      {children}
    </a>
  );
}

// Decorative dotted "travel route" line across the top of the footer.
function RouteMotif() {
  return (
    <svg
      viewBox="0 0 1200 60"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-x-0 top-0 h-10 w-full opacity-60"
      aria-hidden="true"
      fill="none"
    >
      <path
        d="M0 40 C 150 5, 280 55, 420 30 S 700 5, 820 32 S 1060 52, 1200 14"
        stroke="#D5B477"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="1 9"
      />
    </svg>
  );
}

export default function Footer() {
  const { location } = siteConfig;
  const [newsEmail, setNewsEmail] = useState('');

  const backToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const onNewsletter = (e) => {
    e.preventDefault();
    if (!newsEmail.trim()) return;
    const url = buildMailtoUrl(
      'Please add me to your travel updates',
      `Hello ${siteConfig.name}, please add this email address to your travel updates list: ${newsEmail.trim()}`,
    );
    if (url) window.location.href = url;
  };

  const waUrl = isWhatsAppConfigured() ? buildWhatsAppUrl(siteConfig.whatsappGreeting) : '';

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-midnight via-[#102a29] to-forest text-ivory">
      <RouteMotif />
      <div className="container-x relative pb-10 pt-20 sm:pt-24">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-ivory/70">{footerContent.blurb}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <SocialLink href={siteConfig.instagram} label="Ceylon Joyrides on Instagram">
                <Instagram size={19} />
              </SocialLink>
              <SocialLink href={siteConfig.socials.facebook} label="Ceylon Joyrides on Facebook">
                <Facebook size={19} />
              </SocialLink>
              <SocialLink href={siteConfig.socials.youtube} label="Ceylon Joyrides on YouTube">
                <Youtube size={19} />
              </SocialLink>
              <SocialLink href={siteConfig.socials.tiktok} label="Ceylon Joyrides on TikTok">
                <span className="text-[0.7rem] font-bold">TT</span>
              </SocialLink>
            </div>
          </div>

          {/* Explore */}
          <nav aria-label="Footer explore" className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-gold">{footerContent.exploreTitle}</h3>
            <ul className="mt-5 space-y-3">
              {siteConfig.nav.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-[0.95rem] text-ivory/75 transition hover:text-gold">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label="Footer services" className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-gold">{footerContent.servicesTitle}</h3>
            <ul className="mt-5 space-y-3">
              {footerContent.services.map((s) => (
                <li key={s.label}>
                  <Link
                    to={`/booking?service=${encodeURIComponent(s.service)}`}
                    className="text-[0.95rem] text-ivory/75 transition hover:text-gold"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-gold">{footerContent.contactTitle}</h3>
            <ul className="mt-5 space-y-4 text-[0.95rem] text-ivory/75">
              <li className="flex gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
                <span>
                  {location.streetAddress && <>{location.streetAddress}, </>}
                  {location.city}, {location.country}
                </span>
              </li>
              {siteConfig.phoneDisplay && (
                <li className="flex gap-3">
                  <Phone size={18} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
                  <a
                    href={`tel:${siteConfig.phoneDisplay.replace(/[^\d+]/g, '')}`}
                    className="transition hover:text-gold"
                  >
                    {siteConfig.phoneDisplay}
                  </a>
                </li>
              )}
              {hasEmail() && (
                <li className="flex gap-3">
                  <Mail size={18} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
                  <a href={`mailto:${siteConfig.email}`} className="break-all transition hover:text-gold">
                    {siteConfig.email}
                  </a>
                </li>
              )}
              {waUrl && (
                <li className="flex gap-3">
                  <MessageCircle size={18} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
                  <a href={waUrl} target="_blank" rel="noopener noreferrer" className="transition hover:text-gold">
                    Message us on WhatsApp
                  </a>
                </li>
              )}
            </ul>
            <WhatsAppButton className="mt-6" variant="primary" size="sm">
              Chat on WhatsApp
            </WhatsAppButton>
          </div>
        </div>

        {/* Newsletter — honest mailto-based request; only shown when an email is configured */}
        {hasEmail() && (
          <div className="mt-14 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <div className="grid items-center gap-6 md:grid-cols-2">
              <div>
                <h3 className="font-display text-2xl">{footerContent.newsletter.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ivory/65">{footerContent.newsletter.text}</p>
              </div>
              <form onSubmit={onNewsletter} className="flex flex-col gap-3 sm:flex-row">
                <label htmlFor="footer-email" className="sr-only">
                  Your email address
                </label>
                <input
                  id="footer-email"
                  type="email"
                  required
                  value={newsEmail}
                  onChange={(e) => setNewsEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="field-input-dark border-white/15"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-full bg-gold-sheen px-6 py-3 text-sm font-bold text-midnight transition hover:brightness-105"
                >
                  {footerContent.newsletter.button}
                </button>
              </form>
            </div>
          </div>
        )}

        <div className="mt-14 flex flex-col items-start justify-between gap-5 border-t border-white/10 pt-7 text-sm text-ivory/55 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved. · {footerContent.credit}
          </p>
          <button
            type="button"
            onClick={backToTop}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-ivory/80 transition hover:border-gold hover:text-gold"
          >
            Back to top <ArrowUp size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
