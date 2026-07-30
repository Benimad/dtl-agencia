import type { MetadataRoute } from 'next';
import { urlSitio } from '@/data/site';
import { locales } from '@/i18n/config';
import { href, type RouteKey } from '@/i18n/routes';
import { listarJugadores } from '@/lib/db';

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
  const base = urlSitio();
  const ahora = new Date();
  const jugadores = listarJugadores();

  for (const locale of locales) {
    for (const pagina of PAGINAS) {
      entradas.push({
        url: `${base}${href(locale, pagina)}`,
        lastModified: ahora,
        changeFrequency: pagina === 'inicio' ? 'weekly' : 'monthly',
        priority: pagina === 'inicio' ? 1 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${base}${href(l, pagina)}`]),
          ),
        },
      });
    }

    for (const jugador of jugadores) {
      entradas.push({
        url: `${base}${href(locale, 'fichajes', jugador.slug)}`,
        lastModified: new Date(jugador.actualizado),
        changeFrequency: 'yearly',
        priority: 0.6,
      });
    }
  }

  return entradas;
}
