// ---------------------------------------------------------------------------
// CENTRAL IMAGE LIBRARY
// ---------------------------------------------------------------------------
// Every photograph used on the site is defined here, so you can swap any image
// in one place. Photos are royalty-free images from Unsplash (Unsplash License).
//
// HOW IT WORKS: each entry is an Unsplash photo ID. `photo(id, width)` builds
// a URL from it. To use your OWN photographs instead (recommended), put files
// in /public/images/ and replace an entry with a local path such as
// '/images/galle-road.jpg' — `photo()` passes any string starting with "/" or
// "http" straight through.
//
// IMPORTANT: These IDs were picked from Unsplash photo titles/locations. Please
// open the site once and confirm each photo shows what its alt text says. Any
// image that fails to load automatically falls back to a themed gradient.
// ---------------------------------------------------------------------------

const UNSPLASH_IDS = {
  coastRoad: 'V0QYvYcwFf4', // road leading to the sea, Galle Fort area
  beachPalms: 'iduEaeBB_rQ', // palm trees on beach shore
  beachSky: 'qfiSDPQD9Ws', // palm-lined beach under blue sky
  beachAerial: '4CPF_TglMDc', // beach with palms from above
  rockyShore: 'aKLSiMwHXR0', // green trees on a rocky shore
  seashoreWalk: 'HA5k7riR7no', // person standing on the seashore
  coastalCulture: 'Qx8_d5dGhrs', // people by the sea
  sigiriya: 'q357pEmGJro', // large rock rising from forest
  sigiriya2: 'Rz9pQ3ZEuTw', // large rock rising from forest (second view)
  ellaTrain: '-E7dpukTajA', // train on a viaduct in lush jungle
  ellaBridge: 'gE1qG4s8DKY', // train crossing a bridge in the forest
  ellaBridge2: '5o3ODxRQCfI', // train crossing a bridge in the forest (second view)
  teaHills: 'RA0ulK_q67w', // green plantation on a mountain slope
  elephant: 'CMHPtpk4rQE', // elephant walking on green grass
  tukRain: 'z9sem9ljtlQ', // red tuk-tuk in heavy rain
  tukGreen: 'FpCrOqzK3JQ', // green auto-rickshaw on the road
  tukParked: 'wwcWdqo-zq8', // two auto-rickshaws parked
};

export function photo(idOrPath, width = 1400) {
  if (!idOrPath) return '';
  if (idOrPath.startsWith('/') || idOrPath.startsWith('http')) return idOrPath;
  return `https://unsplash.com/photos/${idOrPath}/download?force=true&w=${width}`;
}

// Named images used across pages. Alt text describes what each photo is meant
// to show — update it if you replace a photo.
export const images = {
  hero: { id: UNSPLASH_IDS.coastRoad, alt: 'A coastal road in southern Sri Lanka leading towards the sea under a soft cloudy sky' },
  heroMobileFocus: '60% 50%',

  about: { id: UNSPLASH_IDS.beachSky, alt: 'Palm trees along a Sri Lankan beach beneath a blue sky' },
  aboutInset1: { id: UNSPLASH_IDS.teaHills, alt: 'Green plantation covering a hill-country mountain slope' },
  aboutInset2: { id: UNSPLASH_IDS.tukGreen, alt: 'A green auto-rickshaw travelling along a Sri Lankan road' },
  aboutInset3: { id: UNSPLASH_IDS.ellaTrain, alt: 'A train crossing a viaduct through lush green jungle' },

  booking: { id: UNSPLASH_IDS.ellaBridge, alt: 'A train crossing a bridge in the forests near Ella, Sri Lanka' },
  contact: { id: UNSPLASH_IDS.beachAerial, alt: 'Aerial view of a palm-fringed Sri Lankan beach' },
  finalCta: { id: UNSPLASH_IDS.sigiriya, alt: 'A great rock rising above the forest in Sri Lanka’s cultural triangle' },
  notFound: { id: UNSPLASH_IDS.tukRain, alt: 'A red tuk-tuk driving through heavy rain' },
};

export const ids = UNSPLASH_IDS;
