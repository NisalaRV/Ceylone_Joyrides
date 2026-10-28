import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Plane, Route, Sun } from 'lucide-react';
import Img from './Img.jsx';
import Reveal from './Reveal.jsx';

const ICONS = { compass: Compass, sun: Sun, route: Route, plane: Plane };

export default function ExperienceCard({ experience, index = 0 }) {
  const Icon = ICONS[experience.icon] || Compass;
  return (
    <Reveal delay={index * 0.09} className="h-full">
      <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-soft ring-1 ring-midnight/5 transition duration-500 hover:-translate-y-1.5 hover:shadow-2xl">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Img
            image={experience.image}
            width={900}
            sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
            className="transition-transform duration-[900ms] ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight/65 via-transparent to-transparent" />
          <span className="absolute left-4 top-4 rounded-full bg-midnight/70 px-3.5 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-gold backdrop-blur">
            {experience.category}
          </span>
        </div>
        <div className="relative flex flex-1 flex-col p-6 pt-9">
          <span className="absolute -top-6 right-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold-sheen text-midnight shadow-gold">
            <Icon size={22} aria-hidden="true" />
          </span>
          <h3 className="font-display text-[1.4rem] font-semibold leading-snug">{experience.title}</h3>
          <p className="mt-3 flex-1 text-[0.93rem] leading-relaxed text-midnight/70">{experience.description}</p>
          <Link
            to={`/booking?service=${encodeURIComponent(experience.service)}`}
            className="group/cta mt-6 inline-flex items-center gap-2 text-sm font-bold text-forest transition hover:text-gold-600"
          >
            {experience.cta}
            <ArrowRight size={16} className="transition-transform duration-300 group-hover/cta:translate-x-1.5" aria-hidden="true" />
          </Link>
        </div>
      </article>
    </Reveal>
  );
}
