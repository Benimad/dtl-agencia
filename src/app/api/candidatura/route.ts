import { NextResponse } from 'next/server';
import { candidaturaSchema } from '@/lib/candidatura';

export const runtime = 'nodejs';

/**
 * Recibe la candidatura, la valida en el servidor y —si hay webhook
 * configurado— la reenvía a la herramienta que use la agencia.
 * El envío por WhatsApp lo sigue haciendo el jugador desde su móvil:
 * aquí no se guarda nada en disco ni en base de datos.
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
  const webhook = process.env.CANDIDATURA_WEBHOOK_URL;

  if (webhook) {
    try {
      await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...ficha, recibida: new Date().toISOString() }),
      });
    } catch (error) {
      // El webhook es un extra: si falla, el jugador no debe enterarse.
      console.error('[candidatura] webhook falló:', error);
    }
  } else {
    console.info('[candidatura]', {
      nombre: ficha.nombre,
      posicion: ficha.posicion,
      nacimiento: ficha.nacimiento,
      idioma: ficha.idioma,
    });
  }

  return NextResponse.json({ ok: true });
}
