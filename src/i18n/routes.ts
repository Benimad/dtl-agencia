import type { Locale } from './config';

/**
 * Slugs del sitio. Están centralizados aquí para poder traducirlos
 * en el futuro sin tocar ni un componente.
 */
export const routes = {
  inicio: '',
  fichajes: 'fichajes',
  servicios: 'servicios',
  proceso: 'proceso',
  mercados: 'mercados',
  candidatura: 'candidatura',
  contacto: 'contacto',
  avisoLegal: 'legal/aviso-legal',
  privacidad: 'legal/privacidad',
} as const;

export type RouteKey = keyof typeof routes;

/** Construye una URL interna con el idioma delante: href('fr', 'fichajes') → /fr/fichajes */
export function href(locale: Locale, key: RouteKey, extra?: string): string {
  const slug = routes[key];
  const partes = [locale, slug, extra].filter(Boolean);
  return `/${partes.join('/')}`;
}

/** Cambia el idioma de la ruta actual conservando la página. */
export function switchLocale(pathname: string, locale: Locale): string {
  const partes = pathname.split('/').filter(Boolean);
  if (partes.length === 0) return `/${locale}`;
  partes[0] = locale;
  return `/${partes.join('/')}`;
}
