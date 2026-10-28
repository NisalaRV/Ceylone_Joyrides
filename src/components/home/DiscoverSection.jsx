import SectionHeading from '../SectionHeading.jsx';
import DestinationCard from '../DestinationCard.jsx';
import { destinations } from '../../data/destinations.js';
import { homeContent } from '../../data/content.js';

export default function DiscoverSection() {
  const c = homeContent.discover;
  return (
    <section className="relative overflow-hidden bg-midnight py-24 text-ivory sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-0 h-[34rem] w-[34rem] rounded-full bg-forest/40 blur-3xl"
      />
      <div className="container-x relative">
        <SectionHeading tone="dark" eyebrow={c.eyebrow} title={c.title} text={c.text} />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-5">
          {destinations.map((d, i) => (
            <DestinationCard key={d.id} destination={d} index={i} />
          ))}
        </div>
        <p className="mt-8 text-sm text-ivory/55">{c.note}</p>
      </div>
    </section>
  );
}
