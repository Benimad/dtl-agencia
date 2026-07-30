/* ══════════════════════════════════════════════════════════════
   Medidas de una imagen leyendo sus primeros bytes. next/image
   necesita ancho y alto para reservar el hueco y no dar saltos,
   y las fotos que sube la agencia no los traen de ninguna parte.

   Sin dependencias: JPEG, PNG y WebP cubren todo lo que sale de
   un móvil o de Photoshop.
   ══════════════════════════════════════════════════════════════ */

export interface Medidas {
  ancho: number;
  alto: number;
}

export type FormatoImagen = 'jpg' | 'png' | 'webp';

export interface ImagenLeida extends Medidas {
  formato: FormatoImagen;
}

function medidasPng(buf: Buffer): Medidas | null {
  // \x89PNG\r\n\x1a\n + IHDR con ancho y alto en big-endian.
  if (buf.length < 24) return null;
  if (buf.readUInt32BE(0) !== 0x89504e47) return null;
  return { ancho: buf.readUInt32BE(16), alto: buf.readUInt32BE(20) };
}

function medidasJpeg(buf: Buffer): Medidas | null {
  if (buf.length < 4 || buf[0] !== 0xff || buf[1] !== 0xd8) return null;

  let i = 2;
  while (i < buf.length - 9) {
    if (buf[i] !== 0xff) {
      i += 1;
      continue;
    }
    const marcador = buf[i + 1];
    // SOF0…SOF15 salvo los marcadores que no describen la trama.
    const esSof =
      marcador >= 0xc0 && marcador <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marcador);
    if (esSof) {
      return { alto: buf.readUInt16BE(i + 5), ancho: buf.readUInt16BE(i + 7) };
    }
    const largo = buf.readUInt16BE(i + 2);
    if (largo < 2) return null;
    i += 2 + largo;
  }
  return null;
}

function medidasWebp(buf: Buffer): Medidas | null {
  if (buf.length < 30) return null;
  if (buf.toString('ascii', 0, 4) !== 'RIFF') return null;
  if (buf.toString('ascii', 8, 12) !== 'WEBP') return null;

  const tipo = buf.toString('ascii', 12, 16);

  if (tipo === 'VP8X') {
    return {
      ancho: 1 + buf.readUIntLE(24, 3),
      alto: 1 + buf.readUIntLE(27, 3),
    };
  }
  if (tipo === 'VP8 ') {
    return {
      ancho: buf.readUInt16LE(26) & 0x3fff,
      alto: buf.readUInt16LE(28) & 0x3fff,
    };
  }
  if (tipo === 'VP8L') {
    const bits = buf.readUInt32LE(21);
    return {
      ancho: (bits & 0x3fff) + 1,
      alto: ((bits >> 14) & 0x3fff) + 1,
    };
  }
  return null;
}

/** Formato y medidas, o null si no reconocemos el archivo. */
export function leerImagen(buf: Buffer): ImagenLeida | null {
  const png = medidasPng(buf);
  if (png) return { ...png, formato: 'png' };

  const webp = medidasWebp(buf);
  if (webp) return { ...webp, formato: 'webp' };

  const jpeg = medidasJpeg(buf);
  if (jpeg) return { ...jpeg, formato: 'jpg' };

  return null;
}

export const EXTENSIONES: Record<FormatoImagen, string> = {
  jpg: '.jpg',
  png: '.png',
  webp: '.webp',
};

export const TIPOS_MIME: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
};
