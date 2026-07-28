import type { StaticImageData } from 'next/image';
import hussein from '@/assets/players/hussein-ahmed.jpg';
import yacouba from '@/assets/players/yacouba-kone.jpg';
import samso from '@/assets/players/samso.jpg';

export interface Jugador {
  /** Se usa en la URL: /es/fichajes/[id] */
  id: string;
  nombre: string;
  /** Club o titular del cartel. */
  club: string;
  temporada: string;
  img: StaticImageData;
  /** Todo lo de abajo es opcional: si está vacío, no se pinta. */
  posicion?: string;
  nacimiento?: string;
  pie?: string;
  altura?: string;
  pais?: string;
  video?: string;
}

/* ══════════════════════════════════════════════════════════════
   JUGADORES — edita aquí. Deja el campo fuera si no lo quieres mostrar.
   Para añadir uno nuevo: pon la foto en src/assets/players/,
   impórtala arriba y añade el objeto a la lista.
   ══════════════════════════════════════════════════════════════ */
export const jugadores: Jugador[] = [
  {
    id: 'hussein',
    nombre: 'Hussein Ahmed',
    club: 'Presentación oficial',
    temporada: '2026',
    img: hussein,
  },
  {
    id: 'yacouba',
    nombre: 'Yacouba Koné',
    club: 'Fichaje',
    temporada: '2026 / 2027',
    img: yacouba,
  },
  {
    id: 'samso',
    nombre: 'Samso',
    club: 'AD Lobón',
    temporada: '2026',
    img: samso,
  },
];

export function getJugador(id: string): Jugador | undefined {
  return jugadores.find((j) => j.id === id);
}
