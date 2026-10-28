import { ArrowRight, ExternalLink, Instagram, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import Seo from '../components/Seo.jsx';
import PageHero from '../components/PageHero.jsx';
import ContactForm from '../components/ContactForm.jsx';
import Reveal from '../components/Reveal.jsx';
import Button from '../components/Button.jsx';
import WhatsAppButton from '../components/WhatsAppButton.jsx';
import siteConfig from '../config/siteConfig.js';
import { images } from '../data/images.js';
import Img from '../components/Img.jsx';
import { contactContent as c } from '../data/content.js';
import { buildWhatsAppUrl, hasEmail, isWhatsAppConfigured } from '../lib/contact.js';

function InfoRow({ icon: Icon, label, children }) {
  return (
    <li className="flex gap-4">
      <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-gold">
        <Icon size={20} aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-gold">{label}</p>
        <div className="mt-1 text-[0.98rem] text-ivory/90">{children}</div>
      </div>
    </li>
  );
}

const soon = <span className="text-ivory/50">Coming soon</span>;

export default function Contact() {
  const { location } = siteConfig;
  const waUrl = isWhatsAppConfigured() ? buildWhatsAppUrl(siteConfig.whatsappGreeting) : '';
  const fullAddress = [location.streetAddress, location.city, location.country].filter(Boolean).join(', ');

  return (
    <>
      <Seo title={c.seo.title} description={c.seo.description} />
      <PageHero eyebrow={c.hero.eyebrow} title={c.hero.title} text={c.hero.text} image={images.contact} position="50% 40%" />

      <section className="relative bg-midnight py-20 text-ivory sm:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 h-96 w-96 rounded-full bg-forest/40 blur-3xl"
        />
        <div className="container-x relative grid gap-14 lg:grid-cols-12">
          {/* Details */}
          <Reveal className="lg:col-span-5">
            <h2 className="font-display text-3xl font-semibold sm:text-4xl">Reach us your way</h2>
            <ul className="mt-9 space-y-7">
              <InfoRow icon={Phone} label="Phone">
                {siteConfig.phoneDisplay ? (
                  <a className="transition hover:text-gold" href={`tel:${siteConfig.phoneDisplay.replace(/[^\d+]/g, '')}`}>
                    {siteConfig.phoneDisplay}
                  </a>
                ) : (
                  soon
                )}
              </InfoRow>
              <InfoRow icon={MessageCircle} label="WhatsApp">
                {waUrl ? (
                  <a className="transition hover:text-gold" href={waUrl} target="_blank" rel="noopener noreferrer">
                    Message us on WhatsApp
                  </a>
                ) : (
                  soon
                )}
              </InfoRow>
              <InfoRow icon={Mail} label="Email">
                {hasEmail() ? (
                  <a className="break-all transition hover:text-gold" href={`mailto:${siteConfig.email}`}>
                    {siteConfig.email}
                  </a>
                ) : (
                  soon
                )}
              </InfoRow>
              <InfoRow icon={MapPin} label="Location">
                {fullAddress}
                {location.mapUrl && (
                  <a
                    href={location.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 flex items-center gap-1.5 text-sm text-gold transition hover:underline"
                  >
                    Open in Google Maps <ExternalLink size={14} aria-hidden="true" />
                  </a>
                )}
              </InfoRow>
              <InfoRow icon={Instagram} label="Instagram">
                <a
                  className="transition hover:text-gold"
                  href={siteConfig.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @ceylonjoyrides
                </a>
              </InfoRow>
            </ul>

            {/* Map placeholder — shows a real map link only if one is configured */}
            <div className="relative mt-10 flex aspect-[16/10] items-center justify-center overflow-hidden rounded-3xl border border-white/10">
              <Img
                src={images.contact.id}
                alt=""
                width={900}
                sizes="(min-width:1024px) 40vw, 100vw"
                className="opacity-40"
              />
              <div className="absolute inset-0 bg-midnight/60" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <MapPin className="text-gold" size={28} aria-hidden="true" />
                <p className="mt-2 font-display text-xl">{location.city}, {location.country}</p>
                {location.mapUrl ? (
                  <a
                    href={location.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-gold px-5 py-2 text-sm font-bold text-midnight"
                  >
                    View on map <ExternalLink size={14} aria-hidden="true" />
                  </a>
                ) : (
                  <p className="mt-1 text-xs text-ivory/60">Map link will appear once the exact address is confirmed.</p>
                )}
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur sm:p-10">
              <h2 className="font-display text-3xl font-semibold">{c.form.title}</h2>
              <p className="mt-2 mb-8 text-sm text-ivory/65">{c.form.text}</p>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Travel enquiry CTA */}
      <section className="bg-gradient-to-r from-forest to-midnight py-16 text-ivory">
        <div className="container-x flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <p className="font-display text-2xl sm:text-3xl">{c.cta.text}</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <WhatsAppButton variant="outline">Chat on WhatsApp</WhatsAppButton>
            <Button to="/booking" iconRight={<ArrowRight size={16} aria-hidden="true" />}>
              {c.cta.button}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
