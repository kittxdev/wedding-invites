
export const WEDDING = {
  // Section visibility config - set to false to disable any section
  sections: {
    hero: true,        // Main hero section (cannot be disabled)
    countdown: true,    // Countdown timer
    couple: true,       // Couple cards
    story: false,       // Story timeline (CSS ready, render not implemented)
    schedule: true,     // Wedding schedule
    venue: true,         // Venue information
    gallery: false,      // Photo gallery
    rsvp: false,        // RSVP form (CSS ready, render not implemented)
    musicPlayer: false,  // Background music player
    footer: true,        // Footer (cannot be disabled)
  },

  bride: {
    name: 'Vivitha',
    fullName: 'D. Vivitha',
    role: 'The Bride',
    emoji: '🪷',
    photo: 'vivitha.jpg', // Place photo in /public folder
    bio: 'Graceful, driven, and full of life. With her radiant smile and gentle heart, she brings immense joy and warmth to everyone around her.',
  },
  groom: {
    name: 'Padma Dev',
    fullName: 'E. Padma Dev',
    role: 'The Groom',
    emoji: '🌿',
    photo: 'padma-dev.jpg', // Place photo in /public folder
    bio: 'Thoughtful, compassionate, and an easygoing spirit. He found his perfect match in Vivitha to share life\'s beautiful, grand journey.',
  },
  wedding: {
    date: '2026-05-27',
    dateDisplay: 'May 27, 2026',
    dayOfWeek: 'Wednesday',
    time: '10:30',
    timeDisplay: '10:30 AM to 11:30 AM',
    venue: {
      name: 'Aysha Mahal',
      address: 'Abishekapatti',
      city: 'Tirunelveli',
      mapLabel: 'Aysha Mahal · Tirunelveli',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3943.2435720421417!2d77.63896097533518!3d8.763139191287943!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0416d81c4b1b81%3A0x21d1e58efb760e96!2sAysha%20Mahal%20tirunelveli!5e0!3m2!1sen!2sin!4v1777788393548!5m2!1sen!2sin',
      directLink: 'https://maps.app.goo.gl/GoxBGBUYdW97Ea7Y8'
    },
    receptionVenue: {
      name: 'Joseph Hall',
      address: 'Mathar Sangam Road, East Ramanputhoor',
      city: 'Nagercoil',
      mapLabel: 'Joseph Hall · Nagercoil',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3949.2917974821257!2d77.42286705708257!3d8.173330111715979!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b04f11e290e019f%3A0x7b70c1b031193a88!2sSt%20Joseph&#39;s%20Hall%20(A%2FC)!5e0!3m2!1sen!2sin!4v1777788310157!5m2!1sen!2sin',
      directLink: 'https://maps.app.goo.gl/Qxo2nQysmRgJmcDH9'
    },
    hashtag: '#PadmaWedsVivitha',
    dressCode: 'Traditional Elegance',
  },
  story: [
    {
      year: '2025', emoji: '✨', title: 'The First Spark',
      text: 'Our paths crossed, and what started as a simple conversation quickly blossomed into a beautiful connection, guided by the blessings of our elders.',
    },
    {
      year: '2025', emoji: '🤝', title: 'Families Meet',
      text: 'Our families came together, recognizing the bond we shared. Laughter, warmth, and joy filled the room as traditional sweets marked our union.',
    },
    {
      year: '2026', emoji: '💍', title: 'The Engagement',
      text: 'Surrounded by our closest family and friends, we exchanged rings and officially stepped into our journey toward a lifetime of togetherness.',
    },
    {
      year: '2026', emoji: '🌸', title: 'A New Beginning',
      text: 'With the blessings of the Almighty and our parents, we step into the sacred bond of marriage, ready to write our own beautiful story.',
    },
  ],
  schedule: [
    { time: '10:30 AM', event: 'Muhurtham', icon: '🕉️', desc: 'The auspicious moment where two souls are bound together in the holy bond of marriage at Aysha Mahal, Tirunelveli.' },
    { time: '12:00 PM', event: 'Wedding Feast', icon: '🍃', desc: 'Join us for a grand South Indian banana leaf wedding feast with traditional delicacies.' },
    { time: '6:30 PM', event: 'Grand Reception', icon: '🎉', desc: 'An evening of revelry and celebration at Joseph Hall, Mathar Sangam Road, East Ramanputhoor, Nagercoil.' },
    { time: '7:30 PM', event: 'Dinner & Music', icon: '🍽️', desc: 'Continue the celebration with a sumptuous dinner, heartfelt blessings, and joyful melodies.' },
  ],

  gallery: [
    { src: 'engagement.jpg', label: 'Engagement Ceremony' },
    { src: 'https://ik.imagekit.io/7ev5o5zyzu/Kittxdev/kittxdev_1024x1024.png', label: 'Ring Ceremony' },
    { src: 'engagement.jpg', label: 'Mehendi Celebration' },
    { src: 'gallery-4.jpg', label: 'Family Gathering' },
    { src: 'gallery-5.jpg', label: 'Pre-Wedding Shoot' },
  ],

  parents: {
    bride: [
      { name: 'Mr. V. Dharmaraj', qual: 'M.Sc., M.Tech.', desc: 'GAIL India Ltd (VRS), Prop. Vivitha Microns' },
      { name: 'Mrs. V. Latha', qual: 'M.A., B.Ed., M.Phil.', desc: 'St. Joseph Matric. Hr.Sec.School., Alangulam.' }
    ],
    groom: [
      { name: 'Mr. P. Elango', qual: 'B.Sc.(Agri)', desc: 'Joint Director of Agriculture (Rtd)' },
      { name: 'Mrs. M. Nagarethinam', qual: 'M.Sc. (N)', desc: 'Principal, Dept. of Allied Health Sciences, Siva Hospital' }
    ],
  },
};
