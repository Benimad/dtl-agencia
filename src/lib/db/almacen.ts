import { randomUUID } from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { VERSION_BD, type BaseDatos } from './esquema';
import { baseInicial } from './semilla';

/* ══════════════════════════════════════════════════════════════
   Almacén en archivo. Un único JSON, escrito de forma atómica
   (archivo temporal + rename) para que un fallo a mitad de
   escritura no deje la base a medias.

   Dónde escribe: se prueba de verdad, no se adivina por variables
   de entorno. Se intenta crear el directorio y, si el sistema de
   archivos no deja (serverless con /var/task de solo lectura), se
   cae al temporal del sistema. Si tampoco, todo sigue en memoria y
   el panel avisa al guardar — pero la web nunca se cae.
   ══════════════════════════════════════════════════════════════ */

const CARPETA_TEMPORAL = path.join(os.tmpdir(), 'dtl-agencia-datos');

function candidatos(): string[] {
  const lista = [
    process.env.DATA_DIR ? path.resolve(process.env.DATA_DIR) : null,
    path.join(process.cwd(), 'data'),
    CARPETA_TEMPORAL,
  ];
  return lista.filter((d): d is string => Boolean(d));
}

function sePuedeEscribir(dir: string): boolean {
  try {
    fs.mkdirSync(path.join(dir, 'uploads'), { recursive: true });
    fs.accessSync(dir, fs.constants.W_OK);
    return true;
  } catch {
    return false;
  }
}

let dirElegido: string | null = null;
let persistente = false;

/** Primer directorio de la lista en el que el servidor pueda escribir de verdad. */
function dirDatos(): string {
  if (dirElegido) return dirElegido;

  for (const dir of candidatos()) {
    if (sePuedeEscribir(dir)) {
      dirElegido = dir;
      // El temporal del sistema se borra solo: sirve para que el sitio
      // funcione, pero no cuenta como almacenamiento de verdad.
      persistente = dir !== CARPETA_TEMPORAL;
      if (!persistente) {
        console.warn(
          `[bd] sin disco propio; usando ${dir}. Los cambios del panel no sobrevivirán a un despliegue.`,
        );
      }
      return dir;
    }
  }

  console.warn('[bd] ningún directorio escribible; el contenido se sirve en memoria.');
  dirElegido = CARPETA_TEMPORAL;
  persistente = false;
  return dirElegido;
}

export function dirSubidas(): string {
  return path.join(dirDatos(), 'uploads');
}

function archivoBD(): string {
  return path.join(dirDatos(), 'db.json');
}

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
  const archivo = archivoBD();
  fs.mkdirSync(dirSubidas(), { recursive: true });
  const temporal = `${archivo}.${randomUUID()}.tmp`;
  fs.writeFileSync(temporal, JSON.stringify(datos, null, 2), 'utf8');
  fs.renameSync(temporal, archivo);
  cache = { datos, mtime: fs.statSync(archivo).mtimeMs };
}

/** Intenta persistir; si el disco no deja, se queda en memoria. */
function escribirSiSePuede(datos: BaseDatos): boolean {
  try {
    escribir(datos);
    enMemoria = null;
    return true;
  } catch (error) {
    if (!enMemoria) {
      console.warn(`[bd] no se puede escribir en ${dirDatos()}:`, error);
    }
    enMemoria = datos;
    return false;
  }
}

/** Lee la base. La deja en memoria y solo vuelve al disco si el archivo cambió. */
export function leerBD(): BaseDatos {
  const archivo = archivoBD();

  let existe = false;
  try {
    existe = fs.existsSync(archivo);
  } catch {
    existe = false;
  }

  if (!existe) {
    if (enMemoria) return enMemoria;
    const inicial = baseInicial(dirSubidas());
    escribirSiSePuede(inicial);
    return enMemoria ?? inicial;
  }

  const mtime = fs.statSync(archivo).mtimeMs;
  if (cache && cache.mtime === mtime) return cache.datos;

  try {
    const datos = JSON.parse(fs.readFileSync(archivo, 'utf8')) as BaseDatos;
    const migrada = migrar(datos);
    cache = { datos: migrada, mtime };
    return migrada;
  } catch (error) {
    // Antes de reiniciar nada, guardamos el archivo roto: puede tener datos
    // reales que la agencia quiera recuperar a mano.
    try {
      const copia = `${archivo}.roto-${Date.now()}`;
      fs.copyFileSync(archivo, copia);
      console.error(`[bd] db.json ilegible, copiado a ${copia}:`, error);
    } catch {
      console.error('[bd] db.json ilegible y no se ha podido copiar:', error);
    }
    const inicial = baseInicial(dirSubidas());
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

/** ¿Este servidor guarda los cambios de verdad? Lo usa el panel para avisar. */
export function almacenamientoPersistente(): boolean {
  dirDatos();
  return persistente;
}

function migrar(datos: BaseDatos): BaseDatos {
  const base = baseInicial(dirSubidas());
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
