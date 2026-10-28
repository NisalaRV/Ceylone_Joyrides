import { ArrowRight } from 'lucide-react';
import Img from '../Img.jsx';
import Reveal from '../Reveal.jsx';
import Button from '../Button.jsx';
import WhatsAppButton from '../WhatsAppButton.jsx';
import { images } from '../../data/images.js';
import { homeContent } from '../../data/content.js';

export default function FinalCta() {
  const c = homeContent.finalCta;
  return (
    <section className="relative isolate overflow-hidden bg-midnight py-28 text-center text-ivory sm:py-40">
      <div className="absolute inset-0 -z-10">
        <Img image={images.finalCta} width={1800} sizes="100vw" position="50% 35%" />
        <div className="absolute inset-0 bg-gradient-to-b from-midnight/85 via-midnight/65 to-midnight/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(23,75,58,0.45),transparent_60%)]" />
      </div>
      <div className="container-x">
        <Reveal>
          <p className="eyebrow eyebrow-light justify-center">Start Today</p>
          <h2 className="display-lg mx-auto mt-5 max-w-3xl sm:text-6xl">{c.title}</h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ivory/80 sm:text-lg">{c.text}</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
            <WhatsAppButton size="lg">{c.whatsappCta}</WhatsAppButton>
            <Button to="/booking" size="lg" iconRight={<ArrowRight size={18} aria-hidden="true" />}>
              {c.bookingCta}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
