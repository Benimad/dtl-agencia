import 'server-only';

import { createHash, createHmac, randomBytes, timingSafeEqual } from 'node:crypto';
import os from 'node:os';
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

let secretoCache: string | null = null;
let secretoPropio = false;

/**
 * Clave con la que se firman las sesiones.
 *
 * Lo correcto es definir AUTH_SECRET. Si no está, no tiramos el panel abajo:
 * derivamos una clave estable a partir de lo que identifica a este despliegue.
 * Las sesiones funcionan, pero se invalidan al publicar una versión nueva —
 * mejor eso que un 500 en la cara del cliente.
 */
function secreto(): string {
  if (secretoCache) return secretoCache;

  const definido = process.env.AUTH_SECRET;
  if (definido && definido.length >= 32) {
    secretoCache = definido;
    secretoPropio = true;
    return secretoCache;
  }

  const huella = [
    process.env.VERCEL_DEPLOYMENT_ID,
    process.env.VERCEL_GIT_COMMIT_SHA,
    process.env.VERCEL_URL,
    process.env.NEXT_PUBLIC_SITE_URL,
    os.hostname(),
    process.cwd(),
  ]
    .filter(Boolean)
    .join('|');

  secretoCache = createHash('sha256').update(`dtl-agencia:${huella}`).digest('base64url');
  secretoPropio = false;

  console.warn(
    '[auth] AUTH_SECRET no está definida: se usa una clave derivada del despliegue. ' +
      'Las sesiones del panel se cerrarán en cada publicación. Define AUTH_SECRET en el entorno.',
  );

  return secretoCache;
}

/** ¿La clave de sesión es la que se ha configurado a mano? Lo usa el panel para avisar. */
export function secretoConfigurado(): boolean {
  secreto();
  return secretoPropio;
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
