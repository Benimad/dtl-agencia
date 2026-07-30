'use client';

import { useActionState } from 'react';
import { BotonEnvio } from '@/components/admin/BotonEnvio';
import { crearPrimerAdmin, entrar, type EstadoAcceso } from '@/acciones/sesion';

const INICIAL: EstadoAcceso = {};

export function FormularioAcceso({
  lang,
  primeraVez,
}: {
  lang: string;
  primeraVez: boolean;
}) {
  const [estado, accion] = useActionState(primeraVez ? crearPrimerAdmin : entrar, INICIAL);

  return (
    <>
      <h1>{primeraVez ? 'Crea tu cuenta' : 'Entrar al panel'}</h1>
      <p>
        {primeraVez
          ? 'Es la primera vez que se abre el panel: crea la cuenta de administración de la agencia. Después, esta pantalla pedirá la contraseña.'
          : 'Este panel es solo para la agencia. Desde aquí se gestionan los fichajes, los testimonios y las candidaturas.'}
      </p>

      <form action={accion}>
        <input type="hidden" name="lang" value={lang} />
        <div className="acceso-campos">
          {primeraVez && (
            <div className="campo">
              <label htmlFor="nombre">Tu nombre</label>
              <input id="nombre" name="nombre" type="text" autoComplete="name" required />
            </div>
          )}

          <div className="campo">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="username"
              required
              autoFocus
            />
          </div>

          <div className="campo">
            <label htmlFor="clave">Contraseña</label>
            <input
              id="clave"
              name="clave"
              type="password"
              autoComplete={primeraVez ? 'new-password' : 'current-password'}
              required
            />
          </div>

          {primeraVez && (
            <div className="campo">
              <label htmlFor="repetir">Repite la contraseña</label>
              <input
                id="repetir"
                name="repetir"
                type="password"
                autoComplete="new-password"
                required
              />
            </div>
          )}

          {estado.error && <p className="mensaje error">{estado.error}</p>}

          <BotonEnvio ocupado="Comprobando…">
            {primeraVez ? 'Crear cuenta y entrar' : 'Entrar'}
          </BotonEnvio>
        </div>
      </form>
    </>
  );
}
