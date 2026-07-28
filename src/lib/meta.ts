import type { Metadata } from 'next';
import { site } from '@/data/site';
import { getDictionary } from '@/i18n';
import { locales, type Locale } from '@/i18n/config';
import { href, type RouteKey } from '@/i18n/routes';
import type { Dictionary } from '@/i18n/types';

type ClaveMeta = keyof Dictionary['meta'];

/** Metadatos de una página interior, con canónica y hreflang de los tres idiomas. */
export function metaDePagina(locale: Locale, clave: ClaveMeta, ruta: RouteKey): Metadata {
  const dic = getDictionary(locale);
  const meta = dic.meta[clave];
  const url = href(locale, ruta);

  return {
    title: meta.titulo,
    description: meta.descripcion,
    alternates: {
      canonical: url,
      languages: Object.fromEntries(locales.map((l) => [l, href(l, ruta)])),
    },
    openGraph: {
      title: `${meta.titulo} — ${site.nombre}`,
      description: meta.descripcion,
      url: `${site.url}${url}`,
    },
  };
}
