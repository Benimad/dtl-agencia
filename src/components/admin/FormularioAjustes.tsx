'use client';

import { useActionState } from 'react';
import { BotonEnvio } from './BotonEnvio';
import { cambiarMiClave, guardarAjustes, type EstadoFormulario } from '@/acciones/contenido';
import { localeName, locales } from '@/i18n/config';
import type { Ajustes } from '@/lib/db/esquema';

const INICIAL: EstadoFormulario = {};

export function FormularioContacto({ ajustes }: { ajustes: Ajustes }) {
  const [estado, accion] = useActionState(guardarAjustes, INICIAL);

  return (
    <form action={accion} className="tarjeta">
      <h2>Contacto</h2>
      <p className="pista">
        Estos datos salen en la cabecera, en el pie, en el botón flotante y en el formulario
        de candidatura. Cámbialos aquí una vez y cambian en toda la web.
      </p>

      <div className="rejilla-campos">
        <div className="campo">
          <label htmlFor="whatsapp">WhatsApp (solo números, con prefijo)</label>
          <input
            id="whatsapp"
            name="whatsapp"
            type="text"
            inputMode="numeric"
            placeholder="212714346018"
            defaultValue={ajustes.whatsapp}
            required
          />
        </div>

        <div className="campo">
          <label htmlFor="whatsappVisible">Cómo se muestra el número</label>
          <input
            id="whatsappVisible"
            name="whatsappVisible"
            type="text"
            placeholder="+212 714-346018"
            defaultValue={ajustes.whatsappVisible}
          />
        </div>

        <div className="campo">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            defaultValue={ajustes.email}
            required
          />
        </div>

        <div className="campo">
          <label htmlFor="instagram">Instagram (sin @)</label>
          <input
            id="instagram"
            name="instagram"
            type="text"
            defaultValue={ajustes.instagram}
          />
        </div>
      </div>

      <h2 style={{ marginTop: 26 }}>Cierre de la lista de clubes</h2>
      <p className="pista">
        La última etiqueta de la fila de clubes. Se traduce a mano porque es texto de marca.
      </p>

      <div className="idiomas-campos">
        {locales.map((l) => (
          <div className="campo" key={l}>
            <label htmlFor={`clubesExtra_${l}`}>
              <span className="bandera-campo">{localeName[l]}</span>
            </label>
            <input
              id={`clubesExtra_${l}`}
              name={`clubesExtra_${l}`}
              type="text"
              dir={l === 'ar' ? 'rtl' : 'ltr'}
              defaultValue={ajustes.clubesExtra[l]}
            />
          </div>
        ))}
      </div>

      <div className="acciones-form">
        <BotonEnvio ocupado="Guardando…">Guardar contacto</BotonEnvio>
        {estado.error && <p className="mensaje error">{estado.error}</p>}
        {estado.ok && <p className="mensaje ok">{estado.ok}</p>}
      </div>
    </form>
  );
}

export function FormularioClave() {
  const [estado, accion] = useActionState(cambiarMiClave, INICIAL);

  return (
    <form action={accion} className="tarjeta">
      <h2>Cambiar mi contraseña</h2>
      <p className="pista">Mínimo 8 caracteres, con letras y números.</p>

      <div className="rejilla-campos">
        <div className="campo">
          <label htmlFor="actual">Contraseña actual</label>
          <input
            id="actual"
            name="actual"
            type="password"
            autoComplete="current-password"
            required
          />
        </div>
        <div className="campo">
          <label htmlFor="nueva">Nueva contraseña</label>
          <input
            id="nueva"
            name="nueva"
            type="password"
            autoComplete="new-password"
            required
          />
        </div>
        <div className="campo">
          <label htmlFor="repetir">Repite la nueva</label>
          <input
            id="repetir"
            name="repetir"
            type="password"
            autoComplete="new-password"
            required
          />
        </div>
      </div>

      <div className="acciones-form">
        <BotonEnvio className="mini verde" ocupado="Cambiando…">
          Cambiar contraseña
        </BotonEnvio>
        {estado.error && <p className="mensaje error">{estado.error}</p>}
        {estado.ok && <p className="mensaje ok">{estado.ok}</p>}
      </div>
    </form>
  );
}
