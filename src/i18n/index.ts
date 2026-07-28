import { defaultLocale, isLocale, type Locale } from './config';
import type { Dictionary } from './types';
import es from './dictionaries/es';
import fr from './dictionaries/fr';
import ar from './dictionaries/ar';

const diccionarios: Record<Locale, Dictionary> = { es, fr, ar };

/** Diccionario de un idioma. Si llega algo raro, cae al español. */
export function getDictionary(locale: string): Dictionary {
  return diccionarios[isLocale(locale) ? locale : defaultLocale];
}

export type { Dictionary } from './types';
export * from './config';
export * from './routes';
