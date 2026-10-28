import { ids } from './images.js';

// Suggested destinations for inspiration — not a promise that every place or
// route is currently offered. Visitors confirm details when they enquire.
// `span` controls the editorial grid layout on desktop (Tailwind classes).
export const destinations = [
  {
    id: 'galle-fort',
    name: 'Galle Fort',
    region: 'Southern Coast',
    blurb: 'Ramparts, lighthouse views and sunset walks above the Indian Ocean.',
    image: { id: ids.coastRoad, alt: 'A road leading towards the sea near Galle Fort' },
    position: '50% 60%',
    span: 'lg:col-span-7 lg:row-span-2',
    ratio: 'aspect-[4/5] lg:aspect-auto',
  },
  {
    id: 'southern-coast',
    name: 'The Southern Coast',
    region: 'Beaches & bays',
    blurb: 'Palm-fringed sand, easy swims and slow days by the sea.',
    image: { id: ids.beachSky, alt: 'Palm trees along a southern Sri Lankan beach' },
    position: '50% 50%',
    span: 'lg:col-span-5',
    ratio: 'aspect-[4/3]',
  },
  {
    id: 'ella',
    name: 'Ella & the Hill Country',
    region: 'Highlands',
    blurb: 'Misty viewpoints, tea country and winding mountain roads.',
    image: { id: ids.teaHills, alt: 'Green hill-country slopes in the Sri Lankan highlands' },
    position: '50% 50%',
    span: 'lg:col-span-5',
    ratio: 'aspect-[4/3]',
  },
  {
    id: 'sigiriya',
    name: 'Sigiriya',
    region: 'Cultural Triangle',
    blurb: 'An ancient rock fortress rising dramatically from the forest.',
    image: { id: ids.sigiriya, alt: 'A great rock rising above the forest at Sigiriya' },
    position: '50% 40%',
    span: 'lg:col-span-4',
    ratio: 'aspect-[3/4]',
  },
  {
    id: 'yala',
    name: 'Yala National Park',
    region: 'Wildlife',
    blurb: 'Safari landscapes and the chance to meet Sri Lanka’s wildlife.',
    image: { id: ids.elephant, alt: 'An elephant walking across a green grass field' },
    position: '50% 50%',
    span: 'lg:col-span-4',
    ratio: 'aspect-[3/4]',
  },
  {
    id: 'trains',
    name: 'Scenic Train Journeys',
    region: 'Rail & landscapes',
    blurb: 'Rolling past jungle, viaducts and tea country by rail.',
    image: { id: ids.ellaTrain, alt: 'A train crossing a viaduct through lush jungle' },
    position: '50% 50%',
    span: 'lg:col-span-4',
    ratio: 'aspect-[3/4]',
  },
];
