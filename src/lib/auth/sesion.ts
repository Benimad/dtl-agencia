import 'server-only';

import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';
import { obtenerUsuario, type Usuario } from '@/lib/db';

/* ══════════════════════════════════════════════════════════════
   Sesión en una cookie firmada con HMAC-SHA256. El contenido va
   en claro (id de usuario + caducidad) pero no se puede falsificar
   sin el secreto, y el servidor comprueba siempre que el usuario
   siga existiendo antes de dar acceso.
   ══════════════════════════════════════════════════════════════ */

export const COOKIE_SESION = 'dtl_sesion';
const DIAS = 7;

function secreto(): string {
  const s = process.env.AUTH_SECRET;
  if (s && s.length >= 32) return s;

  if (process.env.NODE_ENV === 'production') {
    throw new Error(
      'Falta AUTH_SECRET (mínimo 32 caracteres). Sin él las sesiones del panel no son seguras.',
    );
  }
  // En desarrollo no bloqueamos el arranque: secreto fijo y aviso claro.
  return 'desarrollo-inseguro-define-AUTH_SECRET-en-env-local';
}

function firmar(cuerpo: string): string {
  return createHmac('sha256', secreto()).update(cuerpo).digest('base64url');
}

export function generarSecreto(): string {
  return randomBytes(32).toString('base64url');
}

interface Contenido {
  id: string;
  exp: number;
}

function crearFicha(id: string): string {
  const contenido: Contenido = { id, exp: Date.now() + DIAS * 86_400_000 };
  const cuerpo = Buffer.from(JSON.stringify(contenido)).toString('base64url');
  return `${cuerpo}.${firmar(cuerpo)}`;
}

function leerFicha(ficha: string): Contenido | null {
  const [cuerpo, firma] = ficha.split('.');
  if (!cuerpo || !firma) return null;

  const esperada = Buffer.from(firmar(cuerpo));
  const recibida = Buffer.from(firma);
  if (esperada.length !== recibida.length || !timingSafeEqual(esperada, recibida)) return null;

  try {
    const contenido = JSON.parse(Buffer.from(cuerpo, 'base64url').toString()) as Contenido;
    if (!contenido.id || contenido.exp < Date.now()) return null;
    return contenido;
  } catch {
    return null;
  }
}

export async function iniciarSesion(usuario: Usuario) {
  const tarro = await cookies();
  tarro.set(COOKIE_SESION, crearFicha(usuario.id), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: DIAS * 86_400,
  });
}

export async function cerrarSesion() {
  const tarro = await cookies();
  tarro.delete(COOKIE_SESION);
}

/** Usuario de la sesión actual, o null. Es la única puerta al panel. */
export async function usuarioActual(): Promise<Usuario | null> {
  const tarro = await cookies();
  const ficha = tarro.get(COOKIE_SESION)?.value;
  if (!ficha) return null;

  const contenido = leerFicha(ficha);
  if (!contenido) return null;

  return obtenerUsuario(contenido.id) ?? null;
}
