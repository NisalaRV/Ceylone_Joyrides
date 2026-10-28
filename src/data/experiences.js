import { ids } from './images.js';

// Service CATEGORIES (not fixed, priced or confirmed tour packages).
// `icon` must match a key in components/ExperienceCard.jsx → ICONS.
export const experiences = [
  {
    id: 'private-tours',
    category: 'Private Tours',
    icon: 'compass',
    title: 'Journeys planned around you',
    description:
      'Travel at your own pace with a private ride and a route shaped by your interests, whether that is culture, coast or countryside.',
    image: { id: ids.sigiriya2, alt: 'A great rock rising above forest in Sri Lanka’s cultural heartland' },
    service: 'Custom Sri Lanka Tour',
    cta: 'Plan a private tour',
  },
  {
    id: 'day-trips',
    category: 'Day Trips',
    icon: 'sun',
    title: 'Easy escapes from the coast',
    description:
      'Discover forts, beaches and nearby sights in a single day, with comfortable travel between each stop.',
    image: { id: ids.beachPalms, alt: 'Palm trees leaning over a quiet Sri Lankan beach' },
    service: 'Private Day Tour',
    cta: 'Ask about day trips',
  },
  {
    id: 'multi-day',
    category: 'Multi-Day Adventures',
    icon: 'route',
    title: 'Beaches, hills and heritage',
    description:
      'Link several regions into one flowing trip, from the southern shoreline to the tea-covered hill country.',
    image: { id: ids.teaHills, alt: 'Green tea country on a hill-country slope' },
    service: 'Multi-Day Tour',
    cta: 'Design a multi-day trip',
  },
  {
    id: 'airport-transfers',
    category: 'Airport Transfers',
    icon: 'plane',
    title: 'A calm start and finish',
    description:
      'Arrive and depart with a pre-arranged ride, so the first and last moments of your holiday feel effortless.',
    image: { id: ids.tukRain, alt: 'A red tuk-tuk travelling a rainy Sri Lankan road' },
    service: 'Airport Transfer',
    cta: 'Request a transfer',
  },
];
