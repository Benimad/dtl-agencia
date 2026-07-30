import { randomUUID } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { VERSION_BD, type BaseDatos } from './esquema';
import { baseInicial } from './semilla';

/* ══════════════════════════════════════════════════════════════
   Almacén en archivo. Un único JSON, escrito de forma atómica
   (archivo temporal + rename) para que un fallo a mitad de
   escritura no deje la base a medias.

   Dónde escribe, por orden:
     1. DATA_DIR, si está definida
     2. /tmp, en plataformas sin disco propio (Vercel y similares)
     3. ./data, en local y en cualquier servidor normal

   Y si el disco no deja escribir, no se cae el sitio: la web sigue
   sirviendo el contenido en memoria y el panel avisa al guardar.
   ══════════════════════════════════════════════════════════════ */

/** Plataformas serverless donde el sistema de archivos es de solo lectura. */
const SIN_DISCO = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);

function resolverDirDatos(): string {
  if (process.env.DATA_DIR) return path.resolve(process.env.DATA_DIR);
  if (SIN_DISCO) return path.join('/tmp', 'dtl-agencia-datos');
  return path.join(process.cwd(), 'data');
}

export const DIR_DATOS = resolverDirDatos();
export const DIR_SUBIDAS = path.join(DIR_DATOS, 'uploads');
const ARCHIVO_BD = path.join(DIR_DATOS, 'db.json');

/** El disco no admite escrituras: seguimos en memoria y lo decimos al guardar. */
export class ErrorSoloLectura extends Error {
  constructor() {
    super(
      'Este servidor no permite guardar cambios: el almacenamiento es de solo lectura. ' +
        'Hay que alojar la web en un servidor con disco propio o conectar una base de datos.',
    );
    this.name = 'ErrorSoloLectura';
  }
}

let cache: { datos: BaseDatos; mtime: number } | null = null;
/** Copia viva cuando no se puede escribir en disco. */
let enMemoria: BaseDatos | null = null;

function escribir(datos: BaseDatos) {
  fs.mkdirSync(DIR_SUBIDAS, { recursive: true });
  const temporal = `${ARCHIVO_BD}.${randomUUID()}.tmp`;
  fs.writeFileSync(temporal, JSON.stringify(datos, null, 2), 'utf8');
  fs.renameSync(temporal, ARCHIVO_BD);
  cache = { datos, mtime: fs.statSync(ARCHIVO_BD).mtimeMs };
}

/** Intenta persistir; si el disco no deja, se queda en memoria. */
function escribirSiSePuede(datos: BaseDatos): boolean {
  try {
    escribir(datos);
    enMemoria = null;
    return true;
  } catch (error) {
    if (!enMemoria) {
      console.warn(
        `[bd] no se puede escribir en ${DIR_DATOS}; el contenido se sirve en memoria.`,
        error,
      );
    }
    enMemoria = datos;
    return false;
  }
}

/** Lee la base. La deja en memoria y solo vuelve al disco si el archivo cambió. */
export function leerBD(): BaseDatos {
  let existe = false;
  try {
    existe = fs.existsSync(ARCHIVO_BD);
  } catch {
    existe = false;
  }

  if (!existe) {
    if (enMemoria) return enMemoria;
    const inicial = baseInicial(DIR_SUBIDAS);
    escribirSiSePuede(inicial);
    return enMemoria ?? inicial;
  }

  const mtime = fs.statSync(ARCHIVO_BD).mtimeMs;
  if (cache && cache.mtime === mtime) return cache.datos;

  try {
    const datos = JSON.parse(fs.readFileSync(ARCHIVO_BD, 'utf8')) as BaseDatos;
    const migrada = migrar(datos);
    cache = { datos: migrada, mtime };
    return migrada;
  } catch (error) {
    // Antes de reiniciar nada, guardamos el archivo roto: puede tener datos
    // reales que la agencia quiera recuperar a mano.
    try {
      const copia = `${ARCHIVO_BD}.roto-${Date.now()}`;
      fs.copyFileSync(ARCHIVO_BD, copia);
      console.error(`[bd] db.json ilegible, copiado a ${copia}:`, error);
    } catch {
      console.error('[bd] db.json ilegible y no se ha podido copiar:', error);
    }
    const inicial = baseInicial(DIR_SUBIDAS);
    escribirSiSePuede(inicial);
    return enMemoria ?? inicial;
  }
}

/** Modifica la base dentro de una función y la guarda. Devuelve lo que devuelva `fn`. */
export function escribirBD<T>(fn: (bd: BaseDatos) => T): T {
  const bd = structuredClone(leerBD());
  const resultado = fn(bd);
  if (!escribirSiSePuede(bd)) throw new ErrorSoloLectura();
  return resultado;
}

/** ¿Este servidor puede guardar cambios? Lo usa el panel para avisar. */
export function almacenamientoPersistente(): boolean {
  if (SIN_DISCO && !process.env.DATA_DIR) return false;
  try {
    fs.mkdirSync(DIR_SUBIDAS, { recursive: true });
    fs.accessSync(DIR_DATOS, fs.constants.W_OK);
    return true;
  } catch {
    return false;
  }
}

function migrar(datos: BaseDatos): BaseDatos {
  const base = baseInicial(DIR_SUBIDAS);
  // Rellena lo que falte si la base viene de una versión anterior.
  return {
    version: VERSION_BD,
    jugadores: datos.jugadores ?? base.jugadores,
    testimonios: datos.testimonios ?? base.testimonios,
    clubes: datos.clubes ?? base.clubes,
    candidaturas: datos.candidaturas ?? [],
    ajustes: { ...base.ajustes, ...(datos.ajustes ?? {}) },
    usuarios: datos.usuarios ?? [],
  };
}

export function nuevoId(): string {
  return randomUUID();
}

export function ahora(): string {
  return new Date().toISOString();
}
