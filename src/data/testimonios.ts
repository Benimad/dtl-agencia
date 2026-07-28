import type { Locale } from '@/i18n/config';

export interface Testimonio {
  /** Texto por idioma. Si falta un idioma, se usa el español. */
  texto: Record<Locale, string>;
  firma: Record<Locale, string>;
}

/* ══════════════════════════════════════════════════════════════
   TESTIMONIOS — SUSTITUYE ESTE TEXTO POR FRASES REALES
   antes de publicar la web.
   ══════════════════════════════════════════════════════════════ */
export const testimonios: Testimonio[] = [
  {
    texto: {
      es: '[Sustituye por la frase real del jugador: qué le resolvió la agencia y en cuánto tiempo.]',
      fr: '[Remplace par la phrase réelle du joueur : ce que l’agence a réglé et en combien de temps.]',
      ar: '[استبدل هذا بعبارة حقيقية من اللاعب: ما الذي حلّته الوكالة وفي كم من الوقت.]',
    },
    firma: {
      es: 'Jugador representado · 2025/26',
      fr: 'Joueur représenté · 2025/26',
      ar: 'لاعب نمثّله · 2025/26',
    },
  },
  {
    texto: {
      es: '[Sustituye por la frase real de un club o director deportivo con el que hayas trabajado.]',
      fr: '[Remplace par la phrase réelle d’un club ou d’un directeur sportif avec qui tu as travaillé.]',
      ar: '[استبدل هذا بعبارة حقيقية من نادٍ أو مدير رياضي عملت معه.]',
    },
    firma: {
      es: 'Club · España',
      fr: 'Club · Espagne',
      ar: 'نادٍ · إسبانيا',
    },
  },
];
