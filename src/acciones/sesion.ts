'use server';

import { redirect } from 'next/navigation';
import { cifrarClave, claveDebil, verificarClave } from '@/lib/auth/clave';
import { cerrarSesion, iniciarSesion } from '@/lib/auth/sesion';
import { buscarUsuarioPorEmail, contarUsuarios, crearUsuario } from '@/lib/db';
import { isLocale, defaultLocale } from '@/i18n/config';

export interface EstadoAcceso {
  error?: string;
}

function idiomaSeguro(valor: FormDataEntryValue | null): string {
  const lang = String(valor ?? '');
  return isLocale(lang) ? lang : defaultLocale;
}

/** Entrar al panel. Mensaje de error genérico: no decimos si el email existe. */
export async function entrar(
  _estado: EstadoAcceso,
  datos: FormData,
): Promise<EstadoAcceso> {
  const lang = idiomaSeguro(datos.get('lang'));
  const email = String(datos.get('email') ?? '').trim();
  const clave = String(datos.get('clave') ?? '');

  if (!email || !clave) return { error: 'Escribe tu email y tu contraseña.' };

  const usuario = buscarUsuarioPorEmail(email);
  if (!usuario || !(await verificarClave(clave, usuario.clave))) {
    return { error: 'Email o contraseña incorrectos.' };
  }

  await iniciarSesion(usuario);
  redirect(`/${lang}/admin`);
}

/**
 * Crea la primera cuenta. Solo funciona mientras no exista ninguna:
 * después, esta puerta queda cerrada para siempre.
 */
export async function crearPrimerAdmin(
  _estado: EstadoAcceso,
  datos: FormData,
): Promise<EstadoAcceso> {
  if (contarUsuarios() > 0) return { error: 'Ya existe una cuenta de administración.' };

  const lang = idiomaSeguro(datos.get('lang'));
  const nombre = String(datos.get('nombre') ?? '').trim();
  const email = String(datos.get('email') ?? '').trim();
  const clave = String(datos.get('clave') ?? '');
  const repetir = String(datos.get('repetir') ?? '');

  if (nombre.length < 2) return { error: 'Escribe tu nombre.' };
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return { error: 'Ese email no es válido.' };
  if (clave !== repetir) return { error: 'Las dos contraseñas no coinciden.' };

  const debil = claveDebil(clave);
  if (debil) return { error: debil };

  const usuario = crearUsuario(email, nombre, await cifrarClave(clave));
  await iniciarSesion(usuario);
  redirect(`/${lang}/admin`);
}

export async function salir(datos: FormData) {
  const lang = idiomaSeguro(datos.get('lang'));
  await cerrarSesion();
  redirect(`/${lang}/admin/login`);
}
