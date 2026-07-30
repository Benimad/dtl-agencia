import { randomBytes, scrypt, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';

const scryptAsync = promisify(scrypt) as (
  clave: string | Buffer,
  sal: string | Buffer,
  largo: number,
) => Promise<Buffer>;

const LARGO = 64;

/**
 * Hash de contraseña con scrypt. Formato guardado: `sal:hash` en hexadecimal.
 * scrypt viene en Node, así que no hace falta bcrypt ni argon2 como dependencia.
 */
export async function cifrarClave(clave: string): Promise<string> {
  const sal = randomBytes(16).toString('hex');
  const hash = await scryptAsync(clave.normalize('NFKC'), sal, LARGO);
  return `${sal}:${hash.toString('hex')}`;
}

/** Comparación en tiempo constante: no filtra información por lo que tarda. */
export async function verificarClave(clave: string, guardado: string): Promise<boolean> {
  const [sal, hashHex] = guardado.split(':');
  if (!sal || !hashHex) return false;

  const esperado = Buffer.from(hashHex, 'hex');
  if (esperado.length !== LARGO) return false;

  const calculado = await scryptAsync(clave.normalize('NFKC'), sal, LARGO);
  return timingSafeEqual(esperado, calculado);
}

/** Requisitos mínimos: cortita y obvia no entra. */
export function claveDebil(clave: string): string | null {
  if (clave.length < 8) return 'La contraseña necesita al menos 8 caracteres.';
  if (!/[a-zA-Z]/.test(clave) || !/[0-9]/.test(clave))
    return 'La contraseña debe mezclar letras y números.';
  return null;
}
