import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '../SectionHeading.jsx';
import Reveal from '../Reveal.jsx';
import Button from '../Button.jsx';
import Img from '../Img.jsx';
import { gallery, galleryPreviewIds } from '../../data/gallery.js';
import { homeContent } from '../../data/content.js';

// Grid placement for each of the six preview tiles (editorial mosaic).
const SPANS = ['col-span-2 row-span-2', '', 'row-span-2', '', 'col-span-2', 'col-span-2'];

export default function GalleryPreview() {
  const c = homeContent.galleryPreview;
  const items = galleryPreviewIds.map((id) => gallery.find((g) => g.id === id)).filter(Boolean);

  return (
    <section className="bg-ivory py-24 sm:py-32">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading eyebrow={c.eyebrow} title={c.title} />
          <Reveal>
            <Button to="/gallery" variant="outlineDark" iconRight={<ArrowRight size={16} aria-hidden="true" />}>
              {c.cta}
            </Button>
          </Reveal>
        </div>

        <div className="mt-12 grid auto-rows-[9.5rem] grid-cols-2 gap-3 sm:auto-rows-[13rem] md:grid-cols-4 md:gap-4 lg:auto-rows-[15rem]">
          {items.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.06} className={SPANS[i] || ''} y={20}>
              <Link
                to="/gallery"
                aria-label={`View gallery — ${item.caption}`}
                className="group relative block h-full overflow-hidden rounded-2xl bg-midnight sm:rounded-3xl"
              >
                <Img
                  src={item.src}
                  alt={item.alt}
                  width={900}
                  sizes="(min-width:768px) 25vw, 50vw"
                  className="transition-transform duration-[900ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="absolute bottom-3 left-4 translate-y-2 text-sm font-semibold text-ivory opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {item.caption}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
