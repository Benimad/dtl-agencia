'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { exigirSesionAccion } from '@/lib/auth/guardia';
import { cifrarClave, claveDebil, verificarClave } from '@/lib/auth/clave';
import { borrarFoto, ErrorSubida, guardarFoto } from './subir';
import { locales } from '@/i18n/config';
import {
  actualizarAjustes,
  actualizarCandidatura,
  actualizarClub,
  actualizarJugador,
  actualizarTestimonio,
  borrarCandidatura,
  borrarClub,
  borrarJugador,
  borrarTestimonio,
  cambiarClave,
  crearClub,
  crearJugador,
  crearTestimonio,
  moverClub,
  moverJugador,
  moverTestimonio,
  obtenerJugador,
  type EstadoCandidatura,
  type Imagen,
  type TextoMultiidioma,
} from '@/lib/db';

export interface EstadoFormulario {
  error?: string;
  ok?: string;
}

/* ── ayudas ───────────────────────────────────────────────────── */

const texto = (datos: FormData, campo: string) => String(datos.get(campo) ?? '').trim();
const marcado = (datos: FormData, campo: string) => datos.get(campo) === 'on';
const id = (datos: FormData) => texto(datos, 'id');

function multiidioma(datos: FormData, prefijo: string): TextoMultiidioma {
  const salida = {} as TextoMultiidioma;
  for (const l of locales) salida[l] = texto(datos, `${prefijo}_${l}`);
  return salida;
}

/** Todas las páginas del sitio leen de la base, así que refrescamos el árbol. */
function refrescar() {
  revalidatePath('/', 'layout');
}

/* ── jugadores ────────────────────────────────────────────────── */

export async function guardarJugador(
  _estado: EstadoFormulario,
  datos: FormData,
): Promise<EstadoFormulario> {
  await exigirSesionAccion();

  const nombre = texto(datos, 'nombre');
  if (nombre.length < 2) return { error: 'El nombre del jugador es obligatorio.' };

  const video = texto(datos, 'video');
  if (video && !/^https?:\/\/\S+$/i.test(video)) {
    return { error: 'El enlace del vídeo debe empezar por https://' };
  }

  const campos = {
    nombre,
    club: texto(datos, 'club'),
    temporada: texto(datos, 'temporada'),
    posicion: texto(datos, 'posicion'),
    nacimiento: texto(datos, 'nacimiento'),
    pie: texto(datos, 'pie'),
    altura: texto(datos, 'altura'),
    pais: texto(datos, 'pais'),
    video,
    publicado: marcado(datos, 'publicado'),
  };

  const foto = datos.get('foto');
  const quitarFoto = marcado(datos, 'quitarFoto');
  // undefined = deja la foto como está; null = quítala.
  let imagen: Imagen | null | undefined;

  try {
    if (foto instanceof File && foto.size > 0) {
      imagen = await guardarFoto(foto);
    } else if (quitarFoto) {
      imagen = null;
    }
  } catch (error) {
    if (error instanceof ErrorSubida) return { error: error.message };
    throw error;
  }

  const existente = id(datos);
  const lang = texto(datos, 'lang') || 'es';

  if (existente) {
    const anterior = obtenerJugador(existente);
    if (!anterior) return { error: 'Ese jugador ya no existe.' };

    actualizarJugador(existente, campos, imagen);
    // La foto vieja solo se borra cuando la nueva ya está guardada.
    if (imagen !== undefined && anterior.imagen) borrarFoto(anterior.imagen);
  } else {
    crearJugador(campos, imagen ?? null);
  }

  refrescar();
  redirect(`/${lang}/admin/jugadores`);
}

export async function eliminarJugador(datos: FormData) {
  await exigirSesionAccion();
  const borrado = borrarJugador(id(datos));
  if (borrado) borrarFoto(borrado.imagen);
  refrescar();
}

export async function ordenarJugador(datos: FormData) {
  await exigirSesionAccion();
  moverJugador(id(datos), Number(datos.get('salto')) || 0);
  refrescar();
}

export async function publicarJugador(datos: FormData) {
  await exigirSesionAccion();
  const jugador = obtenerJugador(id(datos));
  if (!jugador) return;
  actualizarJugador(jugador.id, { ...jugador, publicado: !jugador.publicado });
  refrescar();
}

/* ── testimonios ──────────────────────────────────────────────── */

export async function guardarTestimonio(
  _estado: EstadoFormulario,
  datos: FormData,
): Promise<EstadoFormulario> {
  await exigirSesionAccion();

  const contenido = {
    texto: multiidioma(datos, 'texto'),
    firma: multiidioma(datos, 'firma'),
    publicado: marcado(datos, 'publicado'),
  };

  if (!contenido.texto.es) return { error: 'El testimonio en español es obligatorio.' };

  const existente = id(datos);
  if (existente) actualizarTestimonio(existente, contenido);
  else crearTestimonio(contenido);

  refrescar();
  return { ok: existente ? 'Testimonio actualizado.' : 'Testimonio añadido.' };
}

export async function eliminarTestimonio(datos: FormData) {
  await exigirSesionAccion();
  borrarTestimonio(id(datos));
  refrescar();
}

export async function ordenarTestimonio(datos: FormData) {
  await exigirSesionAccion();
  moverTestimonio(id(datos), Number(datos.get('salto')) || 0);
  refrescar();
}

/* ── clubes ───────────────────────────────────────────────────── */

export async function guardarClub(
  _estado: EstadoFormulario,
  datos: FormData,
): Promise<EstadoFormulario> {
  await exigirSesionAccion();

  const nombre = texto(datos, 'nombre');
  if (!nombre) return { error: 'Escribe el nombre del club.' };

  const existente = id(datos);
  if (existente) actualizarClub(existente, nombre, marcado(datos, 'publicado'));
  else crearClub(nombre, true);

  refrescar();
  return { ok: existente ? 'Club actualizado.' : 'Club añadido.' };
}

export async function eliminarClub(datos: FormData) {
  await exigirSesionAccion();
  borrarClub(id(datos));
  refrescar();
}

export async function ordenarClub(datos: FormData) {
  await exigirSesionAccion();
  moverClub(id(datos), Number(datos.get('salto')) || 0);
  refrescar();
}

/* ── candidaturas ─────────────────────────────────────────────── */

const ESTADOS: EstadoCandidatura[] = ['pendiente', 'aceptada', 'rechazada'];

export async function cambiarEstadoCandidatura(datos: FormData) {
  await exigirSesionAccion();
  const estado = texto(datos, 'estado') as EstadoCandidatura;
  if (!ESTADOS.includes(estado)) return;
  actualizarCandidatura(id(datos), { estado, leida: true });
  revalidatePath('/[lang]/admin/candidaturas', 'page');
}

export async function marcarLeida(datos: FormData) {
  await exigirSesionAccion();
  actualizarCandidatura(id(datos), { leida: true });
}

export async function guardarNotas(
  _estado: EstadoFormulario,
  datos: FormData,
): Promise<EstadoFormulario> {
  await exigirSesionAccion();
  actualizarCandidatura(id(datos), { notas: texto(datos, 'notas'), leida: true });
  return { ok: 'Nota guardada.' };
}

export async function eliminarCandidatura(datos: FormData) {
  await exigirSesionAccion();
  borrarCandidatura(id(datos));
  revalidatePath('/[lang]/admin/candidaturas', 'page');
}

/* ── ajustes ──────────────────────────────────────────────────── */

export async function guardarAjustes(
  _estado: EstadoFormulario,
  datos: FormData,
): Promise<EstadoFormulario> {
  await exigirSesionAccion();

  const whatsapp = texto(datos, 'whatsapp').replace(/[^0-9]/g, '');
  if (whatsapp.length < 8) {
    return { error: 'El WhatsApp va en formato internacional, sin «+» ni espacios.' };
  }

  const email = texto(datos, 'email');
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return { error: 'Ese email no es válido.' };

  actualizarAjustes({
    whatsapp,
    whatsappVisible: texto(datos, 'whatsappVisible') || `+${whatsapp}`,
    email,
    instagram: texto(datos, 'instagram').replace(/^@/, ''),
    clubesExtra: multiidioma(datos, 'clubesExtra'),
  });

  refrescar();
  return { ok: 'Datos de contacto guardados.' };
}

export async function cambiarMiClave(
  _estado: EstadoFormulario,
  datos: FormData,
): Promise<EstadoFormulario> {
  const usuario = await exigirSesionAccion();

  const actual = String(datos.get('actual') ?? '');
  const nueva = String(datos.get('nueva') ?? '');
  const repetir = String(datos.get('repetir') ?? '');

  if (!(await verificarClave(actual, usuario.clave))) {
    return { error: 'La contraseña actual no es correcta.' };
  }
  if (nueva !== repetir) return { error: 'Las dos contraseñas nuevas no coinciden.' };

  const debil = claveDebil(nueva);
  if (debil) return { error: debil };

  cambiarClave(usuario.id, await cifrarClave(nueva));
  return { ok: 'Contraseña cambiada.' };
}
