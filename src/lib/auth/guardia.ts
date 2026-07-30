import 'server-only';

import { redirect } from 'next/navigation';
import { usuarioActual } from './sesion';
import type { Usuario } from '@/lib/db';

/** Para páginas: sin sesión, al login. */
export async function exigirSesion(lang: string): Promise<Usuario> {
  const usuario = await usuarioActual();
  if (!usuario) redirect(`/${lang}/admin/login`);
  return usuario;
}

/**
 * Para acciones de servidor. Lanza si no hay sesión: una acción nunca debe
 * tocar los datos fiándose de lo que venga en el formulario.
 */
export async function exigirSesionAccion(): Promise<Usuario> {
  const usuario = await usuarioActual();
  if (!usuario) throw new Error('Sesión caducada. Vuelve a entrar en el panel.');
  return usuario;
}
