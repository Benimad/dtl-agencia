'use client';

import { useFormStatus } from 'react-dom';

/**
 * Botón de envío que se desactiva mientras la acción está en marcha.
 * Sin esto, en una conexión lenta la agencia pulsa tres veces y crea
 * tres fichas iguales.
 */
export function BotonEnvio({
  children,
  className = 'btn btn-primario',
  ocupado,
  confirmar,
}: {
  children: React.ReactNode;
  className?: string;
  ocupado?: string;
  confirmar?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={className}
      disabled={pending}
      onClick={(ev) => {
        if (confirmar && !window.confirm(confirmar)) ev.preventDefault();
      }}
    >
      {pending && ocupado ? ocupado : children}
    </button>
  );
}
