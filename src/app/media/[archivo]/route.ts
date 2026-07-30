import fs from 'node:fs';
import path from 'node:path';
import { NextResponse } from 'next/server';
import { DIR_SUBIDAS } from '@/lib/db';
import { TIPOS_MIME } from '@/lib/imagen';

export const runtime = 'nodejs';

/**
 * Sirve las fotos que sube la agencia desde data/uploads. No están en
 * public/ a propósito: así se pueden borrar y reemplazar sin tocar el
 * repositorio ni volver a compilar.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ archivo: string }> },
) {
  const { archivo } = await params;

  // Solo el nombre del archivo: nada de ../ ni rutas absolutas.
  const nombre = path.basename(archivo);
  const extension = path.extname(nombre).toLowerCase();
  const tipo = TIPOS_MIME[extension];
  if (!tipo) return new NextResponse('No encontrado', { status: 404 });

  const ruta = path.join(DIR_SUBIDAS, nombre);
  if (!ruta.startsWith(DIR_SUBIDAS) || !fs.existsSync(ruta)) {
    return new NextResponse('No encontrado', { status: 404 });
  }

  const datos = fs.readFileSync(ruta);
  const sello = fs.statSync(ruta).mtimeMs.toString(36);

  return new NextResponse(new Uint8Array(datos), {
    headers: {
      'Content-Type': tipo,
      'Content-Length': String(datos.length),
      'Cache-Control': 'public, max-age=31536000, immutable',
      ETag: `"${sello}"`,
    },
  });
}
