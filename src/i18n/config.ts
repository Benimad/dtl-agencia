export const locales = ['es', 'fr', 'ar'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'es';

export const localeLabel: Record<Locale, string> = {
  es: 'ES',
  fr: 'FR',
  ar: 'AR',
};

/** Etiqueta completa para el atributo hreflang y el selector accesible. */
export const localeName: Record<Locale, string> = {
  es: 'Español',
  fr: 'Français',
  ar: 'العربية',
};

export const localeOgTag: Record<Locale, string> = {
  es: 'es_ES',
  fr: 'fr_FR',
  ar: 'ar_MA',
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function dirOf(locale: Locale): 'rtl' | 'ltr' {
  return locale === 'ar' ? 'rtl' : 'ltr';
}
