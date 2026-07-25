/* ------------------------------------------------------------------
   All site copy and content lives here — edit this one file to change
   text, prices, hours and contact details. Nothing else needs touching.
   Items marked TODO are placeholders for you to fill in.
------------------------------------------------------------------- */

export const shop = {
  name: 'SHORTCUTZ',
  tagline: 'Precision barbering',
  // TODO: replace with your real details
  phone: '+1 (514) 601-4123',
  email: 'hello@shortcutz.com',
  address: {
    line1: '340 Main St N, Level 2',
    line2: 'Brampton, ON',
  },
  instagram: 'https://instagram.com/_shortcutz_',
  // TODO: point this at your real booking system (Booksy, Fresha, Square, Calendly…)
  bookingUrl: '#book',
}

export const nav = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Team', href: '#team' },
  { label: 'Visit', href: '#visit' },
]

export const services = [
  {
    id: '01',
    name: 'Skin Fade',
    price: '45',
    duration: '45 min',
    blurb: 'Bald taper blended clean into the top. Razor finish at the neckline.',
  },
  {
    id: '02',
    name: 'Signature Cut',
    price: '40',
    duration: '40 min',
    blurb: 'Full consultation, scissor and clipper work, styled and finished.',
    featured: true,
  },
  {
    id: '03',
    name: 'Beard Sculpt',
    price: '28',
    duration: '30 min',
    blurb: 'Line-up, shape and hot towel. Oiled and conditioned to close.',
  },
  {
    id: '04',
    name: 'Cut + Beard',
    price: '62',
    duration: '70 min',
    blurb: 'The full reset. Everything above, run end to end in one chair.',
  },
  {
    id: '05',
    name: 'Head Shave',
    price: '38',
    duration: '35 min',
    blurb: 'Straight razor, hot towel, balm. Smooth and calm.',
  },
  {
    id: '06',
    name: 'Kids Cut',
    price: '25',
    duration: '30 min',
    blurb: 'Twelve and under. Patient hands, no rush, no drama.',
  },
]

export const team = [
  {
    name: 'Shivank',
    role: 'Founder / Master Barber',
    // TODO: drop your headshot at public/assets/team/shivank.png
    image: '/assets/team/shivank.png',
    years: '10',
    specialties: ['Skin fades', 'Textured crops', 'Beard design'],
    bio: 'Ten years behind the chair and still measures every fade twice. Shivank built SHORTCUTZ around one rule: nobody leaves the chair unsure.',
    instagram: 'https://instagram.com/shortcutz',
  },
  {
    name: 'Ninder',
    role: 'Senior Barber',
    // TODO: drop your headshot at public/assets/team/ninder.png
    image: '/assets/team/ninder.png',
    years: '7',
    specialties: ['Scissor work', 'Classic tapers', 'Straight razor'],
    bio: 'Trained on classic scissor-over-comb and never let it go. Ninder is the one you book when you want the shape to grow out as clean as it went in.',
    instagram: 'https://instagram.com/shortcutz',
  },
]

/* Side-profile cut shots. Transparent PNGs sit best on the dark panels.
   TODO: drop files at public/assets/cuts/ using these filenames, or
   rename these entries to match whatever you've got. */
export const gallery = [
  { src: '/assets/cuts/cut-01.png', label: 'Mid skin fade', tag: 'FADE' },
  { src: '/assets/cuts/cut-02.png', label: 'Textured crop', tag: 'CROP' },
  { src: '/assets/cuts/cut-03.png', label: 'Classic taper', tag: 'TAPER' },
  { src: '/assets/cuts/cut-04.png', label: 'Burst fade', tag: 'BURST' },
  { src: '/assets/cuts/cut-05.png', label: 'Beard sculpt', tag: 'BEARD' },
  { src: '/assets/cuts/cut-06.png', label: 'Line-up', tag: 'LINE' },
]

export const hours = [
  { day: 'Mon', time: 'Closed', closed: true },
  { day: 'Tue', time: '10 — 19' },
  { day: 'Wed', time: '10 — 19' },
  { day: 'Thu', time: '10 — 20' },
  { day: 'Fri', time: '09 — 20' },
  { day: 'Sat', time: '09 — 18' },
  { day: 'Sun', time: '11 — 16' },
]

export const stats = [
  { value: '17', label: 'Years combined' },
  { value: '9K+', label: 'Cuts delivered' },
  { value: '4.9', label: 'Average rating' },
]

export const tickerWords = [
  'SKIN FADES',
  'BEARD SCULPTING',
  'HOT TOWEL',
  'STRAIGHT RAZOR',
  'TEXTURED CROPS',
  'LINE-UPS',
  'WALK-INS WELCOME',
]
