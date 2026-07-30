import 'server-only';

import { ahora, escribirBD, leerBD, nuevoId } from './almacen';
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
export { dirSubidas, ErrorSoloLectura, almacenamientoPersistente } from './almacen';

/**
 * Garantiza que la base existe. En serverless cada instancia arranca vacía:
 * si la primera petición que le llega es la de una foto, sin esto no habría
 * nada que servir.
 */
export function asegurarBase(): void {
  leerBD();
}

/* ── utilidades ───────────────────────────────────────────────── */

const porOrden = <T extends { orden: number }>(a: T, b: T) => a.orden - b.orden;

export function crearSlug(texto: string): string {
  return texto
    .normalize('NFD')
    // NFD separa el acento de la letra; aquí tiramos el acento.
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 60);
}

function slugLibre(base: string, ignorarId?: string): string {
  const bd = leerBD();
  const raiz = base || 'jugador';
  let slug = raiz;
  let n = 2;
  while (bd.jugadores.some((j) => j.slug === slug && j.id !== ignorarId)) {
    slug = `${raiz}-${n++}`;
  }
  return slug;
}

/* ── jugadores ────────────────────────────────────────────────── */

export interface DatosJugador {
  nombre: string;
  club: string;
  temporada: string;
  posicion: string;
  nacimiento: string;
  pie: string;
  altura: string;
  pais: string;
  video: string;
  publicado: boolean;
}

export function listarJugadores(soloPublicados = true): Jugador[] {
  const bd = leerBD();
  const lista = soloPublicados ? bd.jugadores.filter((j) => j.publicado) : bd.jugadores;
  return [...lista].sort(porOrden);
}

export function obtenerJugadorPorSlug(slug: string): Jugador | undefined {
  return leerBD().jugadores.find((j) => j.slug === slug && j.publicado);
}

export function obtenerJugador(id: string): Jugador | undefined {
  return leerBD().jugadores.find((j) => j.id === id);
}

export function crearJugador(datos: DatosJugador, imagen: Imagen | null): Jugador {
  const momento = ahora();
  const jugador: Jugador = {
    id: nuevoId(),
    slug: slugLibre(crearSlug(datos.nombre)),
    ...datos,
    imagen,
    orden: leerBD().jugadores.length,
    creado: momento,
    actualizado: momento,
  };
  escribirBD((bd) => {
    bd.jugadores.push(jugador);
  });
  return jugador;
}

export function actualizarJugador(
  id: string,
  datos: DatosJugador,
  imagen?: Imagen | null,
): Jugador | null {
  return escribirBD((bd) => {
    const jugador = bd.jugadores.find((j) => j.id === id);
    if (!jugador) return null;

    if (jugador.nombre !== datos.nombre) {
      jugador.slug = slugLibre(crearSlug(datos.nombre), id);
    }
    Object.assign(jugador, datos);
    // undefined = «no toques la foto»; null = «quítala».
    if (imagen !== undefined) jugador.imagen = imagen;
    jugador.actualizado = ahora();
    return jugador;
  });
}

export function borrarJugador(id: string): Jugador | null {
  return escribirBD((bd) => {
    const i = bd.jugadores.findIndex((j) => j.id === id);
    if (i === -1) return null;
    const [borrado] = bd.jugadores.splice(i, 1);
    bd.jugadores.forEach((j, n) => {
      j.orden = n;
    });
    return borrado;
  });
}

/** Mueve un elemento una posición arriba (-1) o abajo (+1). */
function mover<T extends { id: string; orden: number }>(lista: T[], id: string, salto: number) {
  const ordenada = [...lista].sort(porOrden);
  const i = ordenada.findIndex((x) => x.id === id);
  const destino = i + salto;
  if (i === -1 || destino < 0 || destino >= ordenada.length) return;
  [ordenada[i], ordenada[destino]] = [ordenada[destino], ordenada[i]];
  ordenada.forEach((x, n) => {
    x.orden = n;
  });
}

export function moverJugador(id: string, salto: number) {
  escribirBD((bd) => mover(bd.jugadores, id, salto));
}

/* ── testimonios ──────────────────────────────────────────────── */

export type DatosTestimonio = Omit<Testimonio, 'id' | 'orden'>;

export function listarTestimonios(soloPublicados = true): Testimonio[] {
  const bd = leerBD();
  const lista = soloPublicados ? bd.testimonios.filter((t) => t.publicado) : bd.testimonios;
  return [...lista].sort(porOrden);
}

export function obtenerTestimonio(id: string): Testimonio | undefined {
  return leerBD().testimonios.find((t) => t.id === id);
}

export function crearTestimonio(datos: DatosTestimonio): Testimonio {
  const testimonio: Testimonio = { id: nuevoId(), ...datos, orden: leerBD().testimonios.length };
  escribirBD((bd) => {
    bd.testimonios.push(testimonio);
  });
  return testimonio;
}

export function actualizarTestimonio(id: string, datos: DatosTestimonio): Testimonio | null {
  return escribirBD((bd) => {
    const t = bd.testimonios.find((x) => x.id === id);
    if (!t) return null;
    Object.assign(t, datos);
    return t;
  });
}

export function borrarTestimonio(id: string) {
  escribirBD((bd) => {
    bd.testimonios = bd.testimonios.filter((t) => t.id !== id);
    bd.testimonios.forEach((t, n) => {
      t.orden = n;
    });
  });
}

export function moverTestimonio(id: string, salto: number) {
  escribirBD((bd) => mover(bd.testimonios, id, salto));
}

/* ── clubes ───────────────────────────────────────────────────── */

export function listarClubes(soloPublicados = true): Club[] {
  const bd = leerBD();
  const lista = soloPublicados ? bd.clubes.filter((c) => c.publicado) : bd.clubes;
  return [...lista].sort(porOrden);
}

export function crearClub(nombre: string, publicado = true): Club {
  const club: Club = { id: nuevoId(), nombre, publicado, orden: leerBD().clubes.length };
  escribirBD((bd) => {
    bd.clubes.push(club);
  });
  return club;
}

export function actualizarClub(id: string, nombre: string, publicado: boolean) {
  escribirBD((bd) => {
    const c = bd.clubes.find((x) => x.id === id);
    if (c) {
      c.nombre = nombre;
      c.publicado = publicado;
    }
  });
}

export function borrarClub(id: string) {
  escribirBD((bd) => {
    bd.clubes = bd.clubes.filter((c) => c.id !== id);
    bd.clubes.forEach((c, n) => {
      c.orden = n;
    });
  });
}

export function moverClub(id: string, salto: number) {
  escribirBD((bd) => mover(bd.clubes, id, salto));
}

/* ── candidaturas ─────────────────────────────────────────────── */

export type DatosCandidatura = Omit<
  Candidatura,
  'id' | 'estado' | 'notas' | 'recibida' | 'leida'
>;

export function listarCandidaturas(estado?: EstadoCandidatura): Candidatura[] {
  const bd = leerBD();
  const lista = estado ? bd.candidaturas.filter((c) => c.estado === estado) : bd.candidaturas;
  return [...lista].sort((a, b) => b.recibida.localeCompare(a.recibida));
}

export function obtenerCandidatura(id: string): Candidatura | undefined {
  return leerBD().candidaturas.find((c) => c.id === id);
}

export function crearCandidatura(datos: DatosCandidatura): Candidatura {
  const candidatura: Candidatura = {
    id: nuevoId(),
    ...datos,
    estado: 'pendiente',
    notas: '',
    recibida: ahora(),
    leida: false,
  };
  escribirBD((bd) => {
    bd.candidaturas.unshift(candidatura);
    // La bandeja no crece sin fin: guardamos las 500 últimas.
    if (bd.candidaturas.length > 500) bd.candidaturas.length = 500;
  });
  return candidatura;
}

export function actualizarCandidatura(
  id: string,
  cambios: Partial<Pick<Candidatura, 'estado' | 'notas' | 'leida'>>,
) {
  escribirBD((bd) => {
    const c = bd.candidaturas.find((x) => x.id === id);
    if (c) Object.assign(c, cambios);
  });
}

export function borrarCandidatura(id: string) {
  escribirBD((bd) => {
    bd.candidaturas = bd.candidaturas.filter((c) => c.id !== id);
  });
}

export function contarCandidaturas() {
  const bd = leerBD();
  return {
    total: bd.candidaturas.length,
    pendientes: bd.candidaturas.filter((c) => c.estado === 'pendiente').length,
    sinLeer: bd.candidaturas.filter((c) => !c.leida).length,
  };
}

/* ── ajustes ──────────────────────────────────────────────────── */

export function obtenerAjustes(): Ajustes {
  return leerBD().ajustes;
}

export function actualizarAjustes(cambios: Partial<Ajustes>) {
  escribirBD((bd) => {
    bd.ajustes = { ...bd.ajustes, ...cambios };
  });
}

/* ── usuarios ─────────────────────────────────────────────────── */

export function buscarUsuarioPorEmail(email: string): Usuario | undefined {
  const buscado = email.trim().toLowerCase();
  return leerBD().usuarios.find((u) => u.email === buscado);
}

export function obtenerUsuario(id: string): Usuario | undefined {
  return leerBD().usuarios.find((u) => u.id === id);
}

export function contarUsuarios(): number {
  return leerBD().usuarios.length;
}

export function crearUsuario(email: string, nombre: string, clave: string): Usuario {
  const usuario: Usuario = {
    id: nuevoId(),
    email: email.trim().toLowerCase(),
    nombre,
    clave,
    creado: ahora(),
  };
  escribirBD((bd) => {
    bd.usuarios.push(usuario);
  });
  return usuario;
}

export function cambiarClave(id: string, clave: string) {
  escribirBD((bd) => {
    const u = bd.usuarios.find((x) => x.id === id);
    if (u) u.clave = clave;
  });
}
