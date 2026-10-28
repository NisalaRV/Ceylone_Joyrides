import { Link } from 'react-router-dom';
import siteConfig from '../config/siteConfig.js';

/**
 * Typographic wordmark with a small sun-over-winding-road symbol.
 * This is a placeholder treatment, NOT an official logo. To use a real logo,
 * set `logoImage` in src/config/siteConfig.js.
 */
export function LogoMark({ className = 'h-9 w-9' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" fill="none">
      <circle cx="24" cy="24" r="23" stroke="#D5B477" strokeOpacity="0.55" strokeWidth="1.2" />
      <circle cx="24" cy="17" r="6" fill="#D5B477" />
      <path
        d="M6 38 C 16 28, 30 36, 42 24"
        stroke="#F7F4ED"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M9 42 C 19 33, 31 40, 41 31"
        stroke="#D5B477"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeDasharray="1 5"
      />
    </svg>
  );
}

export default function Logo({ tone = 'light', className = '', onClick }) {
  const text = tone === 'light' ? 'text-ivory' : 'text-midnight';

  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label={`${siteConfig.name} — home`}
      className={`group inline-flex items-center gap-3 ${className}`}
    >
      {siteConfig.logoImage ? (
        <img src={siteConfig.logoImage} alt={siteConfig.name} className="h-10 w-auto" />
      ) : (
        <>
          <LogoMark className="h-10 w-10 transition-transform duration-500 group-hover:rotate-12" />
          <span className="flex flex-col leading-none">
            <span className={`font-display text-[1.45rem] font-semibold tracking-tight ${text}`}>
              Ceylon
            </span>
            <span className="mt-1 text-[0.62rem] font-bold uppercase tracking-[0.42em] text-gold">
              Joyrides
            </span>
          </span>
        </>
      )}
    </Link>
  );
}
