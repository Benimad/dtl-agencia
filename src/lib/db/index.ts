import 'server-only';

/* ══════════════════════════════════════════════════════════════
   Puerta de entrada a los datos. Hay dos backends:

     · Supabase  — cuando están sus variables de entorno. Postgres
                   para los datos y Storage para los carteles.
     · Archivo   — data/db.json. Para desarrollo local y servidores
                   con disco propio.

   El resto de la aplicación no sabe cuál está funcionando.
   ══════════════════════════════════════════════════════════════ */

import * as archivo from './archivo';
import * as remoto from './supabase';
import { supabaseActivo } from './supabase';
import { almacenamientoPersistente as discoPersistente } from './almacen';
import type {
  Ajustes,
  Candidatura,
  Club,
  EstadoCandidatura,
  Imagen,
  Jugador,
  Testimonio,
  Usuario,
} from './esquema';

export * from './esquema';
export { dirSubidas, ErrorSoloLectura } from './almacen';
export { crearSlug } from './archivo';
export { supabaseActivo, subirFoto, borrarFotoRemota, CUBO } from './supabase';
export type { DatosCandidatura, DatosJugador, DatosTestimonio } from './archivo';

import { crearSlug } from './archivo';
import type { DatosCandidatura, DatosJugador, DatosTestimonio } from './archivo';

/** ¿Los cambios del panel sobreviven a un despliegue? */
export function almacenamientoPersistente(): boolean {
  return supabaseActivo() || discoPersistente();
}

/** Qué backend está sirviendo. Solo para avisos del panel. */
export function backend(): 'supabase' | 'archivo' {
  return supabaseActivo() ? 'supabase' : 'archivo';
}

/* ── jugadores ────────────────────────────────────────────────── */

export async function listarJugadores(soloPublicados = true): Promise<Jugador[]> {
  return supabaseActivo()
    ? remoto.listarJugadores(soloPublicados)
    : archivo.listarJugadores(soloPublicados);
}

export async function obtenerJugadorPorSlug(slug: string): Promise<Jugador | undefined> {
  return supabaseActivo()
    ? remoto.obtenerJugadorPorSlug(slug)
    : archivo.obtenerJugadorPorSlug(slug);
}

export async function obtenerJugador(id: string): Promise<Jugador | undefined> {
  return supabaseActivo() ? remoto.obtenerJugador(id) : archivo.obtenerJugador(id);
}

export async function crearJugador(
  datos: DatosJugador,
  imagen: Imagen | null,
): Promise<Jugador> {
  return supabaseActivo()
    ? remoto.crearJugador(datos, imagen, crearSlug(datos.nombre))
    : archivo.crearJugador(datos, imagen);
}

export async function actualizarJugador(
  id: string,
  datos: DatosJugador,
  imagen?: Imagen | null,
): Promise<Jugador | null> {
  return supabaseActivo()
    ? remoto.actualizarJugador(id, datos, imagen, crearSlug(datos.nombre))
    : archivo.actualizarJugador(id, datos, imagen);
}

export async function borrarJugador(id: string): Promise<Jugador | null> {
  return supabaseActivo() ? remoto.borrarJugador(id) : archivo.borrarJugador(id);
}

export async function moverJugador(id: string, salto: number): Promise<void> {
  return supabaseActivo() ? remoto.moverJugador(id, salto) : archivo.moverJugador(id, salto);
}

/* ── testimonios ──────────────────────────────────────────────── */

export async function listarTestimonios(soloPublicados = true): Promise<Testimonio[]> {
  return supabaseActivo()
    ? remoto.listarTestimonios(soloPublicados)
    : archivo.listarTestimonios(soloPublicados);
}

export async function crearTestimonio(datos: DatosTestimonio): Promise<Testimonio> {
  return supabaseActivo() ? remoto.crearTestimonio(datos) : archivo.crearTestimonio(datos);
}

export async function actualizarTestimonio(
  id: string,
  datos: DatosTestimonio,
): Promise<Testimonio | null> {
  return supabaseActivo()
    ? remoto.actualizarTestimonio(id, datos)
    : archivo.actualizarTestimonio(id, datos);
}

export async function borrarTestimonio(id: string): Promise<void> {
  return supabaseActivo() ? remoto.borrarTestimonio(id) : archivo.borrarTestimonio(id);
}

export async function moverTestimonio(id: string, salto: number): Promise<void> {
  return supabaseActivo()
    ? remoto.moverTestimonio(id, salto)
    : archivo.moverTestimonio(id, salto);
}

/* ── clubes ───────────────────────────────────────────────────── */

export async function listarClubes(soloPublicados = true): Promise<Club[]> {
  return supabaseActivo()
    ? remoto.listarClubes(soloPublicados)
    : archivo.listarClubes(soloPublicados);
}

export async function crearClub(nombre: string, publicado = true): Promise<Club> {
  return supabaseActivo() ? remoto.crearClub(nombre, publicado) : archivo.crearClub(nombre, publicado);
}

export async function actualizarClub(
  id: string,
  nombre: string,
  publicado: boolean,
): Promise<void> {
  return supabaseActivo()
    ? remoto.actualizarClub(id, nombre, publicado)
    : archivo.actualizarClub(id, nombre, publicado);
}

export async function borrarClub(id: string): Promise<void> {
  return supabaseActivo() ? remoto.borrarClub(id) : archivo.borrarClub(id);
}

export async function moverClub(id: string, salto: number): Promise<void> {
  return supabaseActivo() ? remoto.moverClub(id, salto) : archivo.moverClub(id, salto);
}

/* ── candidaturas ─────────────────────────────────────────────── */

export async function listarCandidaturas(estado?: EstadoCandidatura): Promise<Candidatura[]> {
  return supabaseActivo() ? remoto.listarCandidaturas(estado) : archivo.listarCandidaturas(estado);
}

export async function crearCandidatura(datos: DatosCandidatura): Promise<Candidatura> {
  return supabaseActivo() ? remoto.crearCandidatura(datos) : archivo.crearCandidatura(datos);
}

export async function actualizarCandidatura(
  id: string,
  cambios: Partial<Pick<Candidatura, 'estado' | 'notas' | 'leida'>>,
): Promise<void> {
  return supabaseActivo()
    ? remoto.actualizarCandidatura(id, cambios)
    : archivo.actualizarCandidatura(id, cambios);
}

export async function borrarCandidatura(id: string): Promise<void> {
  return supabaseActivo() ? remoto.borrarCandidatura(id) : archivo.borrarCandidatura(id);
}

export async function contarCandidaturas() {
  return supabaseActivo() ? remoto.contarCandidaturas() : archivo.contarCandidaturas();
}

/* ── ajustes ──────────────────────────────────────────────────── */

export async function obtenerAjustes(): Promise<Ajustes> {
  return supabaseActivo() ? remoto.obtenerAjustes() : archivo.obtenerAjustes();
}

export async function actualizarAjustes(cambios: Partial<Ajustes>): Promise<void> {
  return supabaseActivo() ? remoto.actualizarAjustes(cambios) : archivo.actualizarAjustes(cambios);
}

/* ── usuarios ─────────────────────────────────────────────────── */

export async function buscarUsuarioPorEmail(email: string): Promise<Usuario | undefined> {
  return supabaseActivo()
    ? remoto.buscarUsuarioPorEmail(email)
    : archivo.buscarUsuarioPorEmail(email);
}

export async function obtenerUsuario(id: string): Promise<Usuario | undefined> {
  return supabaseActivo() ? remoto.obtenerUsuario(id) : archivo.obtenerUsuario(id);
}

export async function contarUsuarios(): Promise<number> {
  return supabaseActivo() ? remoto.contarUsuarios() : archivo.contarUsuarios();
}

export async function crearUsuario(
  email: string,
  nombre: string,
  clave: string,
): Promise<Usuario> {
  return supabaseActivo()
    ? remoto.crearUsuario(email, nombre, clave)
    : archivo.crearUsuario(email, nombre, clave);
}

export async function cambiarClave(id: string, clave: string): Promise<void> {
  return supabaseActivo() ? remoto.cambiarClave(id, clave) : archivo.cambiarClave(id, clave);
}

/** Solo el backend de archivo lo necesita: siembra antes de servir una foto. */
export function asegurarBase(): void {
  if (!supabaseActivo()) archivo.asegurarBase();
}
