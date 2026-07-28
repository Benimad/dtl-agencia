export const site = {
  nombre: 'DTL Agencia',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? '212714346018',
  whatsappVisible: '+212 714-346018',
  email: 'darkomagencia@gmail.com',
  instagram: 'yo.soyde.alcorcon',
  instagramUrl: 'https://instagram.com/yo.soyde.alcorcon',
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.dtlagencia.com').replace(/\/$/, ''),
  paises: ['ES', 'MA', 'EU'],
  idiomasAtencion: ['es', 'fr', 'ar'],
} as const;

export const whatsappUrl = `https://wa.me/${site.whatsapp}`;

/** Clubes con los que se ha cerrado. Edítalo cuando cierres uno nuevo. */
export const clubes = ['AD Lobón', 'CD · 2026/27'] as const;
