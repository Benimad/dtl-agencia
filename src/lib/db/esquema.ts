import type { Locale } from '@/i18n/config';

/* ══════════════════════════════════════════════════════════════
   Forma de los datos que administra el panel. Todo lo que edita
   la agencia vive aquí; el sitio público solo lee.
   ══════════════════════════════════════════════════════════════ */

export interface Imagen {
  /** Nombre del archivo dentro de data/uploads. */
  archivo: string;
  ancho: number;
  alto: number;
}

export interface Jugador {
  id: string;
  /** Lo que va en la URL: /es/fichajes/[slug] */
  slug: string;
  nombre: string;
  club: string;
  temporada: string;
  posicion: string;
  nacimiento: string;
  pie: string;
  altura: string;
  pais: string;
  video: string;
  imagen: Imagen | null;
  publicado: boolean;
  orden: number;
  creado: string;
  actualizado: string;
}

export type TextoMultiidioma = Record<Locale, string>;

export interface Testimonio {
  id: string;
  texto: TextoMultiidioma;
  firma: TextoMultiidioma;
  publicado: boolean;
  orden: number;
}

export interface Club {
  id: string;
  nombre: string;
  publicado: boolean;
  orden: number;
}

export type EstadoCandidatura = 'pendiente' | 'aceptada' | 'rechazada';

export interface Candidatura {
  id: string;
  nombre: string;
  nacimiento: string;
  posicion: string;
  pie: string;
  club: string;
  pais: string;
  video: string;
  mensaje: string;
  idioma: Locale;
  estado: EstadoCandidatura;
  notas: string;
  recibida: string;
  leida: boolean;
}

export interface Ajustes {
  whatsapp: string;
  whatsappVisible: string;
  email: string;
  instagram: string;
  clubesExtra: TextoMultiidioma;
}

export interface Usuario {
  id: string;
  email: string;
  nombre: string;
  /** scrypt: sal:hash, en hexadecimal. Nunca la contraseña en claro. */
  clave: string;
  creado: string;
}

export interface BaseDatos {
  version: number;
  jugadores: Jugador[];
  testimonios: Testimonio[];
  clubes: Club[];
  candidaturas: Candidatura[];
  ajustes: Ajustes;
  usuarios: Usuario[];
}

export const VERSION_BD = 1;
