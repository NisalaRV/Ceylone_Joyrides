import { Home as HomeIcon } from 'lucide-react';
import Seo from '../components/Seo.jsx';
import Img from '../components/Img.jsx';
import Button from '../components/Button.jsx';
import { images } from '../data/images.js';
import { notFoundContent as c } from '../data/content.js';

export default function NotFound() {
  return (
    <>
      <Seo title={c.seo.title} description={c.seo.description} />
      <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-night-forest text-ivory">
        <div className="absolute inset-0 -z-10">
          <Img image={images.notFound} eager width={1600} sizes="100vw" />
          <div className="absolute inset-0 bg-midnight/80" />
        </div>
        <div className="container-x py-32 text-center">
          <p className="font-display text-[7rem] leading-none text-gold sm:text-[11rem]">{c.eyebrow}</p>
          <h1 className="display-lg mx-auto mt-2 max-w-2xl">{c.title}</h1>
          <p className="mx-auto mt-5 max-w-md text-ivory/75">{c.text}</p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button to="/" icon={<HomeIcon size={18} aria-hidden="true" />}>
              {c.home}
            </Button>
            <Button to="/booking" variant="outline">
              {c.booking}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
