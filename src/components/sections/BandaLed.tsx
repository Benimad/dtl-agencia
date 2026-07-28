import { Fragment } from 'react';
import { jugadores } from '@/data/players';
import type { Dictionary } from '@/i18n/types';

/**
 * Banda tipo marcador LED. La lista se duplica porque la animación
 * desplaza justo la mitad del ancho: así el bucle no tiene costura.
 */
export function BandaLed({ dic }: { dic: Dictionary }) {
  const bloque = [
    ...jugadores.map((j) => ({
      etiqueta: dic.led.fichaje,
      texto: j.club === 'AD Lobón' ? `${j.nombre} · ${j.club}` : j.nombre,
    })),
    { etiqueta: dic.led.mercado, texto: dic.led.mercadoTexto },
  ];
  const pista = [...bloque, ...bloque];

  return (
    <div className="led" aria-hidden="true">
      <div className="led-pista">
        {pista.map((item, i) => (
          <Fragment key={i}>
            <span>
              <i>●</i> {item.etiqueta}
            </span>
            <span>{item.texto}</span>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
