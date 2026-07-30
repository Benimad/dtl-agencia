import { randomUUID } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { VERSION_BD, type BaseDatos } from './esquema';
import { baseInicial } from './semilla';

/* ══════════════════════════════════════════════════════════════
   Almacén en archivo. Un único JSON en data/db.json, escrito de
   forma atómica (archivo temporal + rename) para que un fallo a
   mitad de escritura no deje la base a medias.

   Es deliberadamente simple: la agencia maneja decenas de fichas,
   no millones. Si algún día hace falta Postgres, solo se reescribe
   este archivo — el resto del código habla con el repositorio.
   ══════════════════════════════════════════════════════════════ */

export const DIR_DATOS = path.join(process.cwd(), 'data');
export const DIR_SUBIDAS = path.join(DIR_DATOS, 'uploads');
const ARCHIVO_BD = path.join(DIR_DATOS, 'db.json');

let cache: { datos: BaseDatos; mtime: number } | null = null;

function asegurarDirectorios() {
  fs.mkdirSync(DIR_SUBIDAS, { recursive: true });
}

function escribir(datos: BaseDatos) {
  asegurarDirectorios();
  const temporal = `${ARCHIVO_BD}.${randomUUID()}.tmp`;
  fs.writeFileSync(temporal, JSON.stringify(datos, null, 2), 'utf8');
  fs.renameSync(temporal, ARCHIVO_BD);
  cache = { datos, mtime: fs.statSync(ARCHIVO_BD).mtimeMs };
}

/** Lee la base. La deja en memoria y solo vuelve al disco si el archivo cambió. */
export function leerBD(): BaseDatos {
  asegurarDirectorios();

  if (!fs.existsSync(ARCHIVO_BD)) {
    const inicial = baseInicial();
    escribir(inicial);
    return inicial;
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
    const copia = `${ARCHIVO_BD}.roto-${Date.now()}`;
    fs.copyFileSync(ARCHIVO_BD, copia);
    console.error(`[bd] db.json ilegible, copiado a ${copia}:`, error);
    const inicial = baseInicial();
    escribir(inicial);
    return inicial;
  }
}

/** Modifica la base dentro de una función y la guarda. Devuelve lo que devuelva `fn`. */
export function escribirBD<T>(fn: (bd: BaseDatos) => T): T {
  const bd = structuredClone(leerBD());
  const resultado = fn(bd);
  escribir(bd);
  return resultado;
}

function migrar(datos: BaseDatos): BaseDatos {
  const base = baseInicial();
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
