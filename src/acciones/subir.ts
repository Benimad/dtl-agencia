import 'server-only';

import { randomUUID } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import {
  borrarFotoRemota,
  dirSubidas,
  subirFoto as subirASupabase,
  supabaseActivo,
  type Imagen,
} from '@/lib/db';
import { EXTENSIONES, leerImagen, TIPOS_MIME } from '@/lib/imagen';

const MAX_BYTES = 8 * 1024 * 1024;

export class ErrorSubida extends Error {}

/**
 * Guarda una foto y devuelve su nombre y sus medidas. Va al Storage de
 * Supabase si está configurado; si no, al disco del servidor.
 *
 * Comprueba el contenido real del archivo, no la extensión: alguien puede
 * llamar `foto.jpg` a cualquier cosa.
 */
export async function guardarFoto(archivo: File): Promise<Imagen> {
  if (archivo.size === 0) throw new ErrorSubida('El archivo está vacío.');
  if (archivo.size > MAX_BYTES) {
    throw new ErrorSubida('La foto pesa más de 8 MB. Redúcela antes de subirla.');
  }

  const buf = Buffer.from(await archivo.arrayBuffer());
  const leida = leerImagen(buf);
  if (!leida) {
    throw new ErrorSubida('Solo se aceptan imágenes JPG, PNG o WebP.');
  }

  const extension = EXTENSIONES[leida.formato];
  const nombre = `${randomUUID()}${extension}`;

  if (supabaseActivo()) {
    await subirASupabase(nombre, buf, TIPOS_MIME[extension] ?? 'image/jpeg');
  } else {
    const destino = dirSubidas();
    fs.mkdirSync(destino, { recursive: true });
    fs.writeFileSync(path.join(destino, nombre), buf);
  }

  return { archivo: nombre, ancho: leida.ancho, alto: leida.alto };
}

/** Borra una foto. Da igual si ya no está. */
export async function borrarFoto(imagen: Imagen | null): Promise<void> {
  if (!imagen) return;

  if (supabaseActivo()) {
    await borrarFotoRemota(imagen.archivo);
    return;
  }

  try {
    fs.rmSync(path.join(dirSubidas(), path.basename(imagen.archivo)), { force: true });
  } catch (error) {
    console.error('[subida] no se pudo borrar', imagen.archivo, error);
  }
}
