// ===========================================================================
// CENTRAL SITE CONFIGURATION — edit this file to customise the website.
// ===========================================================================
// Anything marked  >>> REPLACE <<<  is an unverified placeholder. It is left
// empty on purpose so that no invented contact detail ever appears on the site.
// Empty contact values are hidden or shown as "coming soon" in the interface.
// ===========================================================================

import { images } from '../data/images.js';

export const siteConfig = {
  // ---- Brand -------------------------------------------------------------
  name: 'Ceylon Joyrides',
  tagline: 'Your Sri Lankan Journey, Your Way.',
  description:
    'Private tours, day trips, multi-day adventures and airport transfers across Sri Lanka, with friendly local travel assistance.',

  // >>> REPLACE <<< Public website address, e.g. 'https://www.yourdomain.com' (used for Open Graph tags).
  siteUrl: '',

  // ---- Contact details (all editable) -----------------------------------
  // >>> REPLACE <<< WhatsApp number in international format, digits only:
  // country code + number, no "+", spaces or dashes. Sri Lanka example: '94771234567'
  whatsappNumber: '',

  // >>> REPLACE <<< Phone number as you want it displayed, e.g. '+94 77 123 4567'
  phoneDisplay: '',

  // >>> REPLACE <<< Public enquiry email address, e.g. 'hello@yourdomain.com'
  email: '',

  location: {
    city: 'Ambalangoda',
    country: 'Sri Lanka',
    // >>> REPLACE <<< Exact street address (optional). Leave empty if you prefer not to show it.
    streetAddress: '',
    // >>> REPLACE <<< A Google Maps share link once the exact address is confirmed (optional).
    mapUrl: '',
  },

  // ---- Social links ------------------------------------------------------
  instagram: 'https://www.instagram.com/ceylonjoyrides/',
  socials: {
    // >>> REPLACE <<< Add real profile links, or leave empty to hide the icon.
    facebook: '',
    tiktok: '',
    youtube: '',
  },

  // ---- Logo --------------------------------------------------------------
  // The site shows a typographic wordmark by default. To use a real logo,
  // put the file in /public (e.g. /public/logo.svg) and set:  logoImage: '/logo.svg'
  logoImage: '',

  // ---- Theme colours (mirrors tailwind.config.js) -----------------------
  theme: {
    midnight: '#101820',
    forest: '#174B3A',
    ivory: '#F7F4ED',
    gold: '#D5B477',
    stone: '#8C9690',
  },

  // ---- Imagery -----------------------------------------------------------
  heroImage: images.hero,

  // ---- Default WhatsApp greeting used by plain "Chat on WhatsApp" buttons --
  whatsappGreeting:
    'Hello Ceylon Joyrides, I would like to ask about travelling in Sri Lanka.',

  // ---- Navigation --------------------------------------------------------
  nav: [
    { label: 'Home', to: '/' },
    { label: 'About Us', to: '/about' },
    { label: 'Gallery', to: '/gallery' },
    { label: 'Contact Us', to: '/contact' },
    { label: 'Booking', to: '/booking' },
  ],
};

export default siteConfig;
