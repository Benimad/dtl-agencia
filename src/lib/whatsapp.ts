import { site } from '@/data/site';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/types';

export interface DatosFicha {
  nombre: string;
  nacimiento: string;
  posicion: string;
  pie?: string;
  club?: string;
  pais?: string;
  video: string;
  mensaje?: string;
}

const CABECERA: Record<Locale, string> = {
  es: 'Candidatura de jugador',
  fr: 'Candidature joueur',
  ar: 'ترشيح لاعب',
};

const NOMBRE: Record<Locale, string> = {
  es: 'NOMBRE',
  fr: 'NOM',
  ar: 'الاسم',
};

const CLUB: Record<Locale, string> = {
  es: 'CLUB',
  fr: 'CLUB',
  ar: 'النادي',
};

const VIDEO: Record<Locale, string> = {
  es: 'VIDEO',
  fr: 'VIDÉO',
  ar: 'الفيديو',
};

/** Arma el mensaje de WhatsApp con la ficha ya escrita, en el idioma activo. */
export function mensajeCandidatura(d: DatosFicha, locale: Locale, dic: Dictionary): string {
  const et = dic.ficha;
  const may = (s: string) => (locale === 'ar' ? s : s.toUpperCase());

  const lineas: string[] = [
    `DTL AGENCIA — ${CABECERA[locale]}`,
    '',
    `${may(et.posicion)}: ${d.posicion}`,
    `${NOMBRE[locale]}: ${d.nombre}`,
    `${may(et.nacimiento)}: ${d.nacimiento}`,
  ];

  if (d.pie) lineas.push(`${may(et.pie)}: ${d.pie}`);
  if (d.club) lineas.push(`${CLUB[locale]}: ${d.club}`);
  if (d.pais) lineas.push(`${may(et.pais)}: ${d.pais}`);
  lineas.push(`${VIDEO[locale]}: ${d.video}`);
  if (d.mensaje) lineas.push('', d.mensaje);

  return lineas.join('\n');
}

export function enlaceWhatsApp(texto?: string): string {
  const base = `https://wa.me/${site.whatsapp}`;
  return texto ? `${base}?text=${encodeURIComponent(texto)}` : base;
}
