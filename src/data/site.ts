import type { Locale } from '@/i18n/config';

/* ══════════════════════════════════════════════════════════════
   Lo que no cambia nunca vive aquí. El teléfono, el email y el
   Instagram sí cambian, así que están en la base de datos y se
   editan desde el panel (/admin/ajustes) — mira `obtenerContacto`.
   ══════════════════════════════════════════════════════════════ */

export const NOMBRE_SITIO = 'DTL Agencia';

export const PAISES = ['ES', 'MA', 'EU'] as const;
export const IDIOMAS_ATENCION = ['es', 'fr', 'ar'] as const;

/** Dominio público, sin barra final. */
export function urlSitio(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.dtlagencia.com';
  return url.replace(/\/$/, '');
}

export interface Contacto {
  whatsapp: string;
  whatsappVisible: string;
  whatsappUrl: string;
  email: string;
  instagram: string;
  instagramUrl: string;
  clubesExtra: Record<Locale, string>;
}

export function enlaceWa(numero: string, texto?: string): string {
  const base = `https://wa.me/${numero}`;
  return texto ? `${base}?text=${encodeURIComponent(texto)}` : base;
}
