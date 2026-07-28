import type { MetadataRoute } from 'next';
import { jugadores } from '@/data/players';
import { site } from '@/data/site';
import { locales } from '@/i18n/config';
import { href, type RouteKey } from '@/i18n/routes';

const PAGINAS: RouteKey[] = [
  'inicio',
  'fichajes',
  'servicios',
  'proceso',
  'mercados',
  'candidatura',
  'contacto',
  'avisoLegal',
  'privacidad',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entradas: MetadataRoute.Sitemap = [];
  const ahora = new Date();

  for (const locale of locales) {
    for (const pagina of PAGINAS) {
      entradas.push({
        url: `${site.url}${href(locale, pagina)}`,
        lastModified: ahora,
        changeFrequency: pagina === 'inicio' ? 'weekly' : 'monthly',
        priority: pagina === 'inicio' ? 1 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${site.url}${href(l, pagina)}`]),
          ),
        },
      });
    }

    for (const jugador of jugadores) {
      entradas.push({
        url: `${site.url}${href(locale, 'fichajes', jugador.id)}`,
        lastModified: ahora,
        changeFrequency: 'yearly',
        priority: 0.6,
      });
    }
  }

  return entradas;
}
