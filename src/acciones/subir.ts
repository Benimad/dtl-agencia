import 'server-only';

import { randomUUID } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { dirSubidas, type Imagen } from '@/lib/db';
import { EXTENSIONES, leerImagen } from '@/lib/imagen';

const MAX_BYTES = 8 * 1024 * 1024;

export class ErrorSubida extends Error {}

/**
 * Guarda una foto en data/uploads y devuelve su nombre y sus medidas.
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

  const destino = dirSubidas();
  fs.mkdirSync(destino, { recursive: true });
  const nombre = `${randomUUID()}${EXTENSIONES[leida.formato]}`;
  fs.writeFileSync(path.join(destino, nombre), buf);

  return { archivo: nombre, ancho: leida.ancho, alto: leida.alto };
}

/** Borra una foto del disco. Da igual si ya no está. */
export function borrarFoto(imagen: Imagen | null) {
  if (!imagen) return;
  const ruta = path.join(dirSubidas(), path.basename(imagen.archivo));
  try {
    fs.rmSync(ruta, { force: true });
  } catch (error) {
    console.error('[subida] no se pudo borrar', imagen.archivo, error);
  }
}
