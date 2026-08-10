import 'server-only';

import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { baseInicial } from './semilla';
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
import type { DatosCandidatura, DatosJugador, DatosTestimonio } from './archivo';

/* ══════════════════════════════════════════════════════════════
   Backend de Supabase: Postgres para los datos y Storage para los
   carteles. Es el que hace que la web funcione en Vercel, donde el
   disco de cada instancia es temporal.

   La service role key salta las políticas de seguridad, así que
   vive solo en el servidor y nunca se manda al navegador.
   ══════════════════════════════════════════════════════════════ */

export const CUBO = process.env.NEXT_PUBLIC_SUPABASE_BUCKET || 'carteles';

let cliente: SupabaseClient | null = null;

export function supabaseActivo(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
}

function sb(): SupabaseClient {
  if (cliente) return cliente;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const clave = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !clave) throw new Error('Supabase no está configurado.');

  cliente = createClient(url, clave, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cliente;
}

/** Toda respuesta de Supabase pasa por aquí: si falla, falla con motivo. */
function comprobar<T>(res: { data: T | null; error: { message: string } | null }, que: string): T {
  if (res.error) throw new Error(`Supabase — ${que}: ${res.error.message}`);
  return res.data as T;
}

/* ── conversión entre la tabla y nuestros tipos ───────────────── */

type FilaJugador = Omit<Jugador, 'imagen'> & { imagen: Imagen | null };

const aJugador = (f: FilaJugador): Jugador => ({ ...f, imagen: f.imagen ?? null });

interface FilaAjustes {
  whatsapp: string;
  whatsapp_visible: string;
  email: string;
  instagram: string;
  clubes_extra: Ajustes['clubesExtra'];
}

const aAjustes = (f: FilaAjustes): Ajustes => ({
  whatsapp: f.whatsapp,
  whatsappVisible: f.whatsapp_visible,
  email: f.email,
  instagram: f.instagram,
  clubesExtra: f.clubes_extra,
});

/* ── semilla ──────────────────────────────────────────────────── */

let sembrado = false;

/**
 * La primera vez que se abre la web con Supabase vacío, mete el contenido
 * con el que ya vivía el sitio: los tres fichajes, los clubes y los textos.
 * Así la agencia se encuentra la web como la dejó, no una página en blanco.
 */
export async function sembrarSiVacio(): Promise<void> {
  if (sembrado) return;
  sembrado = true;

  const { count } = await sb()
    .from('jugadores')
    .select('id', { count: 'exact', head: true });

  const { count: cuentaAjustes } = await sb()
    .from('ajustes')
    .select('id', { count: 'exact', head: true });

  const semilla = baseInicial(''); // sin copiar fotos: las subimos aparte

  if (cuentaAjustes === 0) {
    const a = semilla.ajustes;
    await sb().from('ajustes').insert({
      id: 1,
      whatsapp: a.whatsapp,
      whatsapp_visible: a.whatsappVisible,
      email: a.email,
      instagram: a.instagram,
      clubes_extra: a.clubesExtra,
    });
  }

  if (count && count > 0) return;

  const fotos = await subirFotosSemilla();

  await sb()
    .from('jugadores')
    .insert(
      semilla.jugadores.map((j, i) => ({
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
        imagen: fotos[j.slug] ?? null,
        publicado: true,
        orden: i,
      })),
    );

  const { count: cuentaTesti } = await sb()
    .from('testimonios')
    .select('id', { count: 'exact', head: true });
  if (cuentaTesti === 0) {
    await sb()
      .from('testimonios')
      .insert(
        semilla.testimonios.map((t, i) => ({
          texto: t.texto,
          firma: t.firma,
          publicado: true,
          orden: i,
        })),
      );
  }

  const { count: cuentaClubes } = await sb()
    .from('clubes')
    .select('id', { count: 'exact', head: true });
  if (cuentaClubes === 0) {
    await sb()
      .from('clubes')
      .insert(semilla.clubes.map((c, i) => ({ nombre: c.nombre, publicado: true, orden: i })));
  }
}

/** Sube al cubo las tres fotos que vienen en el repositorio. */
async function subirFotosSemilla(): Promise<Record<string, Imagen>> {
  const fs = await import('node:fs');
  const path = await import('node:path');
  const { leerImagen } = await import('@/lib/imagen');

  const dir = path.join(process.cwd(), 'seed', 'jugadores');
  const archivos: Record<string, string> = {
    hussein: 'hussein-ahmed.jpg',
    yacouba: 'yacouba-kone.jpg',
    samso: 'samso.jpg',
  };

  const salida: Record<string, Imagen> = {};

  for (const [slug, archivo] of Object.entries(archivos)) {
    try {
      const buf = fs.readFileSync(path.join(dir, archivo));
      const medidas = leerImagen(buf);
      if (!medidas) continue;

      const { error } = await sb()
        .storage.from(CUBO)
        .upload(archivo, buf, { contentType: 'image/jpeg', upsert: true });
      if (error) {
        console.warn(`[supabase] no se ha podido subir ${archivo}: ${error.message}`);
        continue;
      }

      salida[slug] = { archivo, ancho: medidas.ancho, alto: medidas.alto };
    } catch (error) {
      console.warn(`[supabase] semilla ${archivo}:`, error);
    }
  }

  return salida;
}

/* ── fotos ────────────────────────────────────────────────────── */

export async function subirFoto(nombre: string, datos: Buffer, tipo: string): Promise<void> {
  const { error } = await sb()
    .storage.from(CUBO)
    .upload(nombre, datos, { contentType: tipo, upsert: true });
  if (error) throw new Error(`Supabase — subir foto: ${error.message}`);
}

export async function borrarFotoRemota(nombre: string): Promise<void> {
  const { error } = await sb().storage.from(CUBO).remove([nombre]);
  if (error) console.warn(`[supabase] no se ha podido borrar ${nombre}: ${error.message}`);
}

/* ── jugadores ────────────────────────────────────────────────── */

export async function listarJugadores(soloPublicados: boolean): Promise<Jugador[]> {
  await sembrarSiVacio();
  let q = sb().from('jugadores').select('*').order('orden', { ascending: true });
  if (soloPublicados) q = q.eq('publicado', true);
  return (comprobar(await q, 'listar jugadores') as FilaJugador[]).map(aJugador);
}

export async function obtenerJugadorPorSlug(slug: string): Promise<Jugador | undefined> {
  await sembrarSiVacio();
  const res = await sb()
    .from('jugadores')
    .select('*')
    .eq('slug', slug)
    .eq('publicado', true)
    .maybeSingle();
  const fila = comprobar(res, 'buscar jugador') as FilaJugador | null;
  return fila ? aJugador(fila) : undefined;
}

export async function obtenerJugador(id: string): Promise<Jugador | undefined> {
  const res = await sb().from('jugadores').select('*').eq('id', id).maybeSingle();
  const fila = comprobar(res, 'buscar jugador') as FilaJugador | null;
  return fila ? aJugador(fila) : undefined;
}

async function slugLibre(base: string, ignorarId?: string): Promise<string> {
  const raiz = base || 'jugador';
  let slug = raiz;
  let n = 2;

  for (;;) {
    let q = sb().from('jugadores').select('id').eq('slug', slug);
    if (ignorarId) q = q.neq('id', ignorarId);
    const filas = comprobar(await q, 'comprobar slug') as { id: string }[];
    if (filas.length === 0) return slug;
    slug = `${raiz}-${n++}`;
  }
}

export async function crearJugador(
  datos: DatosJugador,
  imagen: Imagen | null,
  slugBase: string,
): Promise<Jugador> {
  const { count } = await sb().from('jugadores').select('id', { count: 'exact', head: true });
  const res = await sb()
    .from('jugadores')
    .insert({ ...datos, imagen, slug: await slugLibre(slugBase), orden: count ?? 0 })
    .select()
    .single();
  return aJugador(comprobar(res, 'crear jugador') as FilaJugador);
}

export async function actualizarJugador(
  id: string,
  datos: DatosJugador,
  imagen: Imagen | null | undefined,
  slugBase: string,
): Promise<Jugador | null> {
  const actual = await obtenerJugador(id);
  if (!actual) return null;

  const cambios: Record<string, unknown> = { ...datos, actualizado: new Date().toISOString() };
  if (actual.nombre !== datos.nombre) cambios.slug = await slugLibre(slugBase, id);
  if (imagen !== undefined) cambios.imagen = imagen;

  const res = await sb().from('jugadores').update(cambios).eq('id', id).select().single();
  return aJugador(comprobar(res, 'actualizar jugador') as FilaJugador);
}

export async function borrarJugador(id: string): Promise<Jugador | null> {
  const res = await sb().from('jugadores').delete().eq('id', id).select().maybeSingle();
  const fila = comprobar(res, 'borrar jugador') as FilaJugador | null;
  if (fila) await reordenar('jugadores');
  return fila ? aJugador(fila) : null;
}

/** Deja los `orden` como 0,1,2… después de borrar o mover. */
async function reordenar(tabla: string): Promise<void> {
  const filas = comprobar(
    await sb().from(tabla).select('id').order('orden', { ascending: true }),
    `reordenar ${tabla}`,
  ) as { id: string }[];

  await Promise.all(
    filas.map((f, i) => sb().from(tabla).update({ orden: i }).eq('id', f.id)),
  );
}

async function mover(tabla: string, id: string, salto: number): Promise<void> {
  const filas = comprobar(
    await sb().from(tabla).select('id, orden').order('orden', { ascending: true }),
    `mover en ${tabla}`,
  ) as { id: string; orden: number }[];

  const i = filas.findIndex((f) => f.id === id);
  const destino = i + salto;
  if (i === -1 || destino < 0 || destino >= filas.length) return;

  await sb().from(tabla).update({ orden: filas[destino].orden }).eq('id', filas[i].id);
  await sb().from(tabla).update({ orden: filas[i].orden }).eq('id', filas[destino].id);
}

export const moverJugador = (id: string, salto: number) => mover('jugadores', id, salto);

/* ── testimonios ──────────────────────────────────────────────── */

export async function listarTestimonios(soloPublicados: boolean): Promise<Testimonio[]> {
  await sembrarSiVacio();
  let q = sb().from('testimonios').select('*').order('orden', { ascending: true });
  if (soloPublicados) q = q.eq('publicado', true);
  return comprobar(await q, 'listar testimonios') as Testimonio[];
}

export async function crearTestimonio(datos: DatosTestimonio): Promise<Testimonio> {
  const { count } = await sb().from('testimonios').select('id', { count: 'exact', head: true });
  const res = await sb()
    .from('testimonios')
    .insert({ ...datos, orden: count ?? 0 })
    .select()
    .single();
  return comprobar(res, 'crear testimonio') as Testimonio;
}

export async function actualizarTestimonio(
  id: string,
  datos: DatosTestimonio,
): Promise<Testimonio | null> {
  const res = await sb().from('testimonios').update(datos).eq('id', id).select().maybeSingle();
  return comprobar(res, 'actualizar testimonio') as Testimonio | null;
}

export async function borrarTestimonio(id: string): Promise<void> {
  comprobar(await sb().from('testimonios').delete().eq('id', id).select(), 'borrar testimonio');
  await reordenar('testimonios');
}

export const moverTestimonio = (id: string, salto: number) => mover('testimonios', id, salto);

/* ── clubes ───────────────────────────────────────────────────── */

export async function listarClubes(soloPublicados: boolean): Promise<Club[]> {
  await sembrarSiVacio();
  let q = sb().from('clubes').select('*').order('orden', { ascending: true });
  if (soloPublicados) q = q.eq('publicado', true);
  return comprobar(await q, 'listar clubes') as Club[];
}

export async function crearClub(nombre: string, publicado: boolean): Promise<Club> {
  const { count } = await sb().from('clubes').select('id', { count: 'exact', head: true });
  const res = await sb()
    .from('clubes')
    .insert({ nombre, publicado, orden: count ?? 0 })
    .select()
    .single();
  return comprobar(res, 'crear club') as Club;
}

export async function actualizarClub(
  id: string,
  nombre: string,
  publicado: boolean,
): Promise<void> {
  comprobar(
    await sb().from('clubes').update({ nombre, publicado }).eq('id', id).select(),
    'actualizar club',
  );
}

export async function borrarClub(id: string): Promise<void> {
  comprobar(await sb().from('clubes').delete().eq('id', id).select(), 'borrar club');
  await reordenar('clubes');
}

export const moverClub = (id: string, salto: number) => mover('clubes', id, salto);

/* ── candidaturas ─────────────────────────────────────────────── */

export async function listarCandidaturas(estado?: EstadoCandidatura): Promise<Candidatura[]> {
  let q = sb().from('candidaturas').select('*').order('recibida', { ascending: false });
  if (estado) q = q.eq('estado', estado);
  return comprobar(await q, 'listar candidaturas') as Candidatura[];
}

export async function crearCandidatura(datos: DatosCandidatura): Promise<Candidatura> {
  const res = await sb()
    .from('candidaturas')
    .insert({ ...datos, estado: 'pendiente', notas: '', leida: false })
    .select()
    .single();
  return comprobar(res, 'guardar candidatura') as Candidatura;
}

export async function actualizarCandidatura(
  id: string,
  cambios: Partial<Pick<Candidatura, 'estado' | 'notas' | 'leida'>>,
): Promise<void> {
  comprobar(
    await sb().from('candidaturas').update(cambios).eq('id', id).select(),
    'actualizar candidatura',
  );
}

export async function borrarCandidatura(id: string): Promise<void> {
  comprobar(
    await sb().from('candidaturas').delete().eq('id', id).select(),
    'borrar candidatura',
  );
}

export async function contarCandidaturas() {
  const total = await sb().from('candidaturas').select('id', { count: 'exact', head: true });
  const pend = await sb()
    .from('candidaturas')
    .select('id', { count: 'exact', head: true })
    .eq('estado', 'pendiente');
  const sinLeer = await sb()
    .from('candidaturas')
    .select('id', { count: 'exact', head: true })
    .eq('leida', false);

  return {
    total: total.count ?? 0,
    pendientes: pend.count ?? 0,
    sinLeer: sinLeer.count ?? 0,
  };
}

/* ── ajustes ──────────────────────────────────────────────────── */

export async function obtenerAjustes(): Promise<Ajustes> {
  await sembrarSiVacio();
  const res = await sb().from('ajustes').select('*').eq('id', 1).maybeSingle();
  const fila = comprobar(res, 'leer ajustes') as FilaAjustes | null;
  return fila ? aAjustes(fila) : baseInicial('').ajustes;
}

export async function actualizarAjustes(cambios: Partial<Ajustes>): Promise<void> {
  const fila: Record<string, unknown> = { id: 1 };
  if (cambios.whatsapp !== undefined) fila.whatsapp = cambios.whatsapp;
  if (cambios.whatsappVisible !== undefined) fila.whatsapp_visible = cambios.whatsappVisible;
  if (cambios.email !== undefined) fila.email = cambios.email;
  if (cambios.instagram !== undefined) fila.instagram = cambios.instagram;
  if (cambios.clubesExtra !== undefined) fila.clubes_extra = cambios.clubesExtra;

  comprobar(await sb().from('ajustes').upsert(fila).select(), 'guardar ajustes');
}

/* ── usuarios ─────────────────────────────────────────────────── */

export async function buscarUsuarioPorEmail(email: string): Promise<Usuario | undefined> {
  const res = await sb()
    .from('usuarios')
    .select('*')
    .eq('email', email.trim().toLowerCase())
    .maybeSingle();
  return (comprobar(res, 'buscar usuario') as Usuario | null) ?? undefined;
}

export async function obtenerUsuario(id: string): Promise<Usuario | undefined> {
  const res = await sb().from('usuarios').select('*').eq('id', id).maybeSingle();
  return (comprobar(res, 'buscar usuario') as Usuario | null) ?? undefined;
}

export async function contarUsuarios(): Promise<number> {
  const { count } = await sb().from('usuarios').select('id', { count: 'exact', head: true });
  return count ?? 0;
}

export async function crearUsuario(
  email: string,
  nombre: string,
  clave: string,
): Promise<Usuario> {
  const res = await sb()
    .from('usuarios')
    .insert({ email: email.trim().toLowerCase(), nombre, clave })
    .select()
    .single();
  return comprobar(res, 'crear usuario') as Usuario;
}

export async function cambiarClave(id: string, clave: string): Promise<void> {
  comprobar(await sb().from('usuarios').update({ clave }).eq('id', id).select(), 'cambiar clave');
}
