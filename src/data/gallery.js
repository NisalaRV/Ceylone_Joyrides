import { ids } from './images.js';

// ---------------------------------------------------------------------------
// GALLERY DATA — edit freely. Add your own photos as new entries.
//  id        unique string
//  src       Unsplash photo ID (from images.js) OR a path like '/images/my-photo.jpg'
//  alt       descriptive alt text (also shown as the lightbox caption)
//  caption   short title for the lightbox
//  category  one of: Landscapes | Beaches | Culture | Wildlife | Road Trips
//  ratio     Tailwind aspect class that gives the grid its editorial rhythm
// ---------------------------------------------------------------------------

export const galleryCategories = ['All', 'Landscapes', 'Beaches', 'Culture', 'Wildlife', 'Road Trips'];

export const gallery = [
  {
    id: 'g1',
    src: ids.coastRoad,
    alt: 'A road leading to the sea near Galle Fort under a cloudy sky',
    caption: 'The road to Galle Fort',
    category: 'Road Trips',
    ratio: 'aspect-[4/5]',
  },
  {
    id: 'g2',
    src: ids.beachSky,
    alt: 'Palm trees on a Sri Lankan beach beneath blue sky',
    caption: 'Palm-fringed shoreline',
    category: 'Beaches',
    ratio: 'aspect-[4/3]',
  },
  {
    id: 'g3',
    src: ids.sigiriya,
    alt: 'A great rock rising out of the forest at Sigiriya',
    caption: 'Rock and forest at Sigiriya',
    category: 'Culture',
    ratio: 'aspect-[3/4]',
  },
  {
    id: 'g4',
    src: ids.ellaTrain,
    alt: 'A train crossing a viaduct through lush green jungle',
    caption: 'A train through the jungle',
    category: 'Landscapes',
    ratio: 'aspect-[4/3]',
  },
  {
    id: 'g5',
    src: ids.elephant,
    alt: 'An elephant walking across a green grass field',
    caption: 'Elephant on the grasslands',
    category: 'Wildlife',
    ratio: 'aspect-[4/3]',
  },
  {
    id: 'g6',
    src: ids.teaHills,
    alt: 'Green plantation on a hill-country mountain slope',
    caption: 'Hill-country slopes',
    category: 'Landscapes',
    ratio: 'aspect-[4/5]',
  },
  {
    id: 'g7',
    src: ids.beachPalms,
    alt: 'Palm trees on a beach shore in the daytime',
    caption: 'Quiet palms by the sea',
    category: 'Beaches',
    ratio: 'aspect-[3/4]',
  },
  {
    id: 'g8',
    src: ids.tukGreen,
    alt: 'A green auto-rickshaw travelling down a Sri Lankan road',
    caption: 'Tuk-tuk on the road',
    category: 'Road Trips',
    ratio: 'aspect-[4/3]',
  },
  {
    id: 'g9',
    src: ids.ellaBridge2,
    alt: 'A train crossing a bridge among the forests of the hill country',
    caption: 'Rails across the forest',
    category: 'Landscapes',
    ratio: 'aspect-[4/5]',
  },
  {
    id: 'g10',
    src: ids.beachAerial,
    alt: 'Aerial view of a palm-fringed beach',
    caption: 'A beach from above',
    category: 'Beaches',
    ratio: 'aspect-[4/3]',
  },
  {
    id: 'g11',
    src: ids.sigiriya2,
    alt: 'A second view of the great rock rising above the forest',
    caption: 'Ancient stone, ancient forest',
    category: 'Culture',
    ratio: 'aspect-[4/5]',
  },
  {
    id: 'g12',
    src: ids.rockyShore,
    alt: 'Green trees growing over a brown rocky shoreline',
    caption: 'Where jungle meets the coast',
    category: 'Beaches',
    ratio: 'aspect-[3/4]',
  },
  {
    id: 'g13',
    src: ids.coastalCulture,
    alt: 'People gathered beside the sea on the Sri Lankan coast',
    caption: 'Life by the sea',
    category: 'Culture',
    ratio: 'aspect-[4/3]',
  },
  {
    id: 'g14',
    src: ids.tukRain,
    alt: 'A red tuk-tuk driving through heavy rain',
    caption: 'Monsoon on the road',
    category: 'Road Trips',
    ratio: 'aspect-[3/4]',
  },
  {
    id: 'g15',
    src: ids.ellaBridge,
    alt: 'A train crossing a bridge in the forest near Ella',
    caption: 'Near Ella',
    category: 'Road Trips',
    ratio: 'aspect-[4/3]',
  },
  {
    id: 'g16',
    src: ids.seashoreWalk,
    alt: 'A person standing at the water’s edge on a Sri Lankan beach',
    caption: 'At the water’s edge',
    category: 'Beaches',
    ratio: 'aspect-[4/5]',
  },
];

// Images shown in the Home page gallery preview (ids from the list above).
export const galleryPreviewIds = ['g1', 'g3', 'g2', 'g4', 'g6', 'g5'];
