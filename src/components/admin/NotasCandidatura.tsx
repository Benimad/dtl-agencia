'use client';

import { useActionState } from 'react';
import { BotonEnvio } from './BotonEnvio';
import { guardarNotas, type EstadoFormulario } from '@/acciones/contenido';

const INICIAL: EstadoFormulario = {};

export function NotasCandidatura({ id, notas }: { id: string; notas: string }) {
  const [estado, accion] = useActionState(guardarNotas, INICIAL);

  return (
    <form action={accion}>
      <input type="hidden" name="id" value={id} />
      <div className="campo">
        <label htmlFor={`notas-${id}`}>Notas internas (no las ve el jugador)</label>
        <textarea
          id={`notas-${id}`}
          name="notas"
          rows={2}
          defaultValue={notas}
          placeholder="Nivel, con quién hablar, si ya se le ha contestado…"
        />
      </div>
      <div className="acciones-form" style={{ marginTop: 10, paddingTop: 0, borderTop: 0 }}>
        <BotonEnvio className="mini" ocupado="Guardando…">
          Guardar nota
        </BotonEnvio>
        {estado.ok && <p className="mensaje ok">{estado.ok}</p>}
        {estado.error && <p className="mensaje error">{estado.error}</p>}
      </div>
    </form>
  );
}
