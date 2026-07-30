import { randomUUID } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { leerImagen } from '@/lib/imagen';
import { VERSION_BD, type BaseDatos, type Imagen, type Jugador } from './esquema';

/* ══════════════════════════════════════════════════════════════
   Contenido con el que arranca la base la primera vez: los tres
   fichajes que ya estaban en la web, los clubes y los ajustes.
   A partir de ahí todo se edita desde el panel.
   ══════════════════════════════════════════════════════════════ */

const DIR_SEMILLA = path.join(process.cwd(), 'seed', 'jugadores');

interface JugadorSemilla {
  slug: string;
  nombre: string;
  club: string;
  temporada: string;
  archivo: string;
}

const JUGADORES: JugadorSemilla[] = [
  {
    slug: 'hussein',
    nombre: 'Hussein Ahmed',
    club: 'Presentación oficial',
    temporada: '2026',
    archivo: 'hussein-ahmed.jpg',
  },
  {
    slug: 'yacouba',
    nombre: 'Yacouba Koné',
    club: 'Fichaje',
    temporada: '2026 / 2027',
    archivo: 'yacouba-kone.jpg',
  },
  {
    slug: 'samso',
    nombre: 'Samso',
    club: 'AD Lobón',
    temporada: '2026',
    archivo: 'samso.jpg',
  },
];

/**
 * Copia la foto de seed/ al directorio de subidas y devuelve sus medidas.
 * Si el destino no se puede escribir, devolvemos igualmente las medidas: la
 * ficha se queda sin cartel, pero el sitio arranca en vez de caerse.
 */
function copiarFoto(archivo: string, dirSubidas: string): Imagen | null {
  const origen = path.join(DIR_SEMILLA, archivo);

  let buf: Buffer;
  try {
    buf = fs.readFileSync(origen);
  } catch {
    return null;
  }

  const leida = leerImagen(buf);
  if (!leida) return null;

  try {
    fs.mkdirSync(dirSubidas, { recursive: true });
    const destino = path.join(dirSubidas, archivo);
    if (!fs.existsSync(destino)) fs.writeFileSync(destino, buf);
  } catch (error) {
    console.warn(`[semilla] no se ha podido copiar ${archivo}:`, error);
    return null;
  }

  return { archivo, ancho: leida.ancho, alto: leida.alto };
}

export function baseInicial(dirSubidas: string): BaseDatos {
  const momento = new Date().toISOString();

  const jugadores: Jugador[] = JUGADORES.map((j, i) => ({
    id: randomUUID(),
    slug: j.slug,
    nombre: j.nombre,
    club: j.club,
    temporada: j.temporada,
    posicion: '',
    nacimiento: '',
    pie: '',
    altura: '',
    pais: '',
    video: '',
    imagen: copiarFoto(j.archivo, dirSubidas),
    publicado: true,
    orden: i,
    creado: momento,
    actualizado: momento,
  }));

  return {
    version: VERSION_BD,
    jugadores,
    testimonios: [
      {
        id: randomUUID(),
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
        publicado: true,
        orden: 0,
      },
      {
        id: randomUUID(),
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
        publicado: true,
        orden: 1,
      },
    ],
    clubes: [
      { id: randomUUID(), nombre: 'AD Lobón', publicado: true, orden: 0 },
      { id: randomUUID(), nombre: 'CD · 2026/27', publicado: true, orden: 1 },
    ],
    candidaturas: [],
    ajustes: {
      whatsapp: '212714346018',
      whatsappVisible: '+212 714-346018',
      email: 'darkomagencia@gmail.com',
      instagram: 'yo.soyde.alcorcon',
      clubesExtra: {
        es: '+ clubes en España, Marruecos y Europa',
        fr: '+ clubs en Espagne, au Maroc et en Europe',
        ar: '+ أندية في إسبانيا والمغرب وأوروبا',
      },
    },
    usuarios: [],
  };
}
