import { Fraunces, Inter, IBM_Plex_Mono, Amiri, Noto_Sans_Arabic } from 'next/font/google';

/* Las mismas familias que el HTML original, pero servidas desde el propio
   dominio: sin petición a Google y sin salto de tipografía al cargar.
   Fraunces, Inter y Noto Sans Arabic se cargan como fuentes variables —igual
   que hacía el <link> original— para que el trazo sea idéntico. */

export const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['opsz', 'SOFT', 'WONK'],
  variable: '--fuente-display',
  display: 'swap',
});

export const inter = Inter({
  subsets: ['latin'],
  variable: '--fuente-body',
  display: 'swap',
});

export const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--fuente-mono',
  display: 'swap',
});

export const amiri = Amiri({
  subsets: ['arabic'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--fuente-arabe-display',
  display: 'swap',
  preload: false,
});

export const notoArabe = Noto_Sans_Arabic({
  subsets: ['arabic'],
  variable: '--fuente-arabe',
  display: 'swap',
  preload: false,
});

export const clasesFuentes = [
  fraunces.variable,
  inter.variable,
  plexMono.variable,
  amiri.variable,
  notoArabe.variable,
].join(' ');
