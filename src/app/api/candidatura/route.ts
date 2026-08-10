import { NextResponse } from 'next/server';
import { candidaturaSchema } from '@/lib/candidatura';
import { crearCandidatura, ErrorSoloLectura } from '@/lib/db';

export const runtime = 'nodejs';

/**
 * Recibe la candidatura del jugador, la valida y la guarda en la bandeja
 * del panel (/admin/candidaturas). Si hay webhook configurado, además la
 * reenvía. El envío por WhatsApp lo sigue haciendo el jugador desde su móvil.
 */
export async function POST(request: Request) {
  let cuerpo: unknown;

  try {
    cuerpo = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'json-invalido' }, { status: 400 });
  }

  const resultado = candidaturaSchema.safeParse(cuerpo);
  if (!resultado.success) {
    return NextResponse.json(
      {
        ok: false,
        error: 'validacion',
        campos: resultado.error.issues.map((i) => i.path.join('.')),
      },
      { status: 422 },
    );
  }

  const ficha = resultado.data;

  const ficha_datos = {
    nombre: ficha.nombre,
    nacimiento: String(ficha.nacimiento),
    posicion: ficha.posicion,
    pie: ficha.pie ?? '',
    club: ficha.club ?? '',
    pais: ficha.pais ?? '',
    video: ficha.video,
    mensaje: ficha.mensaje ?? '',
    idioma: ficha.idioma,
  };

  // Si el servidor no puede guardar, el jugador no tiene por qué enterarse:
  // su ficha sigue llegando por WhatsApp y por el webhook.
  let guardada;
  try {
    guardada = await crearCandidatura(ficha_datos);
  } catch (error) {
    if (!(error instanceof ErrorSoloLectura)) throw error;
    console.warn('[candidatura] no se ha podido guardar en la base:', error.message);
    guardada = { ...ficha_datos, id: null, recibida: new Date().toISOString() };
  }

  const webhook = process.env.CANDIDATURA_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(guardada),
      });
    } catch (error) {
      // El webhook es un extra: la ficha ya está guardada, el jugador no debe enterarse.
      console.error('[candidatura] webhook falló:', error);
    }
  }

  return NextResponse.json({ ok: true, id: guardada.id });
}
