import { Link } from 'react-router-dom';
import { MessageCircle, Map } from 'lucide-react';
import { whatsappLinkProps } from '../lib/contact.js';

/** Fixed bottom action bar, visible on small screens only. Hidden on /booking (see App.jsx). */
export default function MobileActionBar() {
  const wa = whatsappLinkProps();
  const waClasses =
    'flex min-h-[3rem] items-center justify-center gap-2 rounded-full bg-forest text-sm font-semibold text-ivory ring-1 ring-gold/40 active:scale-[0.97]';

  return (
    <div
      className="pb-safe fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-midnight/90 px-3 pt-3 backdrop-blur-xl md:hidden"
      role="region"
      aria-label="Quick actions"
    >
      <div className="mx-auto grid max-w-md grid-cols-2 gap-3">
        {wa.href ? (
          <a href={wa.href} target="_blank" rel="noopener noreferrer" className={waClasses}>
            <MessageCircle size={18} aria-hidden="true" /> WhatsApp
          </a>
        ) : (
          <Link to={wa.to} className={waClasses}>
            <MessageCircle size={18} aria-hidden="true" /> WhatsApp
          </Link>
        )}
        <Link
          to="/booking"
          className="flex min-h-[3rem] items-center justify-center gap-2 rounded-full bg-gold-sheen text-sm font-bold text-midnight active:scale-[0.97]"
        >
          <Map size={18} aria-hidden="true" /> Plan a Trip
        </Link>
      </div>
    </div>
  );
}
