'use client';

import { useActionState } from 'react';
import { BotonEnvio } from './BotonEnvio';
import { guardarTestimonio, type EstadoFormulario } from '@/acciones/contenido';
import { localeName, locales } from '@/i18n/config';
import type { Testimonio } from '@/lib/db/esquema';

const INICIAL: EstadoFormulario = {};

export function FormularioTestimonio({ testimonio }: { testimonio?: Testimonio }) {
  const [estado, accion] = useActionState(guardarTestimonio, INICIAL);
  const nuevo = !testimonio;

  return (
    <form action={accion} className="tarjeta">
      {testimonio && <input type="hidden" name="id" value={testimonio.id} />}

      <h2>{nuevo ? 'Añadir testimonio' : (testimonio.firma.es || 'Testimonio')}</h2>
      <p className="pista">
        {nuevo
          ? 'El español es obligatorio. Si dejas el francés o el árabe vacíos, la web muestra el español en su lugar.'
          : 'Se muestra en la portada y en la página de fichajes.'}
      </p>

      <div className="idiomas-campos">
        {locales.map((l) => (
          <div className="campo" key={l}>
            <label htmlFor={`texto_${l}_${testimonio?.id ?? 'nuevo'}`}>
              <span className="bandera-campo">{localeName[l]}</span> — frase
              {l === 'es' ? ' *' : ''}
            </label>
            <textarea
              id={`texto_${l}_${testimonio?.id ?? 'nuevo'}`}
              name={`texto_${l}`}
              rows={2}
              dir={l === 'ar' ? 'rtl' : 'ltr'}
              defaultValue={testimonio?.texto[l] ?? ''}
            />
            <input
              name={`firma_${l}`}
              type="text"
              placeholder={`Firma en ${localeName[l]} — p. ej. «Jugador representado · 2025/26»`}
              dir={l === 'ar' ? 'rtl' : 'ltr'}
              defaultValue={testimonio?.firma[l] ?? ''}
            />
          </div>
        ))}
      </div>

      <div className="acciones-form">
        <label className="interruptor">
          <input
            type="checkbox"
            name="publicado"
            defaultChecked={testimonio ? testimonio.publicado : true}
          />
          Publicado
        </label>
        <BotonEnvio className="mini verde" ocupado="Guardando…">
          {nuevo ? 'Añadir' : 'Guardar'}
        </BotonEnvio>
        {estado.error && <p className="mensaje error">{estado.error}</p>}
        {estado.ok && <p className="mensaje ok">{estado.ok}</p>}
      </div>
    </form>
  );
}
