'use client';

import { useActionState } from 'react';
import { BotonEnvio } from './BotonEnvio';
import { guardarClub, type EstadoFormulario } from '@/acciones/contenido';
import type { Club } from '@/lib/db/esquema';

const INICIAL: EstadoFormulario = {};

export function FormularioClub({ club }: { club?: Club }) {
  const [estado, accion] = useActionState(guardarClub, INICIAL);

  if (club) {
    return (
      <form action={accion} className="acciones-fila">
        <input type="hidden" name="id" value={club.id} />
        <input
          name="nombre"
          type="text"
          defaultValue={club.nombre}
          aria-label="Nombre del club"
          style={{ maxWidth: 240 }}
        />
        <label className="interruptor">
          <input type="checkbox" name="publicado" defaultChecked={club.publicado} />
          Visible
        </label>
        <BotonEnvio className="mini verde" ocupado="…">
          Guardar
        </BotonEnvio>
        {estado.error && <p className="mensaje error">{estado.error}</p>}
      </form>
    );
  }

  return (
    <form action={accion} className="tarjeta">
      <h2>Añadir club</h2>
      <p className="pista">
        Sale en la fila «Clubes con los que hemos cerrado», en la portada y en la página de
        mercados.
      </p>
      <div className="rejilla-campos">
        <div className="campo">
          <label htmlFor="nombre-club">Nombre del club</label>
          <input id="nombre-club" name="nombre" type="text" placeholder="AD Lobón" required />
        </div>
      </div>
      <div className="acciones-form">
        <BotonEnvio className="mini verde" ocupado="Añadiendo…">
          Añadir club
        </BotonEnvio>
        {estado.error && <p className="mensaje error">{estado.error}</p>}
        {estado.ok && <p className="mensaje ok">{estado.ok}</p>}
      </div>
    </form>
  );
}
