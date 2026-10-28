import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPin } from 'lucide-react';
import Img from './Img.jsx';
import Reveal from './Reveal.jsx';

export default function DestinationCard({ destination, index = 0 }) {
  const d = destination;
  return (
    <Reveal delay={(index % 3) * 0.08} className={`${d.span} ${d.ratio}`}>
      <Link
        to={`/booking?destination=${encodeURIComponent(d.name)}`}
        aria-label={`Enquire about ${d.name}`}
        className="group relative block h-full min-h-[18rem] w-full overflow-hidden rounded-[1.75rem] bg-midnight"
      >
        <div className="absolute inset-0">
          <Img
            image={d.image}
            position={d.position}
            width={1200}
            sizes="(min-width:1024px) 50vw, 100vw"
            className="transition-transform duration-[1100ms] ease-out group-hover:scale-110"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-midnight/85 via-midnight/15 to-transparent transition-opacity duration-500 group-hover:from-midnight/90" />
        <span className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-ivory/15 text-ivory backdrop-blur transition duration-300 group-hover:bg-gold group-hover:text-midnight">
          <ArrowUpRight size={20} aria-hidden="true" />
        </span>
        <div className="absolute inset-x-0 bottom-0 p-6 text-ivory sm:p-7">
          <p className="inline-flex items-center gap-1.5 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-gold">
            <MapPin size={13} aria-hidden="true" /> {d.region}
          </p>
          <h3 className="mt-2 font-display text-2xl font-semibold leading-tight sm:text-[1.9rem]">{d.name}</h3>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-ivory/80 transition-all duration-500 sm:max-h-0 sm:translate-y-2 sm:opacity-0 sm:group-hover:max-h-24 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:group-focus-visible:max-h-24 sm:group-focus-visible:translate-y-0 sm:group-focus-visible:opacity-100">
            {d.blurb}
          </p>
        </div>
      </Link>
    </Reveal>
  );
}
