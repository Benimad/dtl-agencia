import Link from 'next/link';
import { FotoJugador } from './FotoJugador';
import type { Jugador } from '@/lib/db/esquema';
import { href } from '@/i18n/routes';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/types';

interface Props {
  jugador: Jugador;
  locale: Locale;
  dic: Dictionary;
  /** Las dos primeras tarjetas se cargan sin esperar al scroll. */
  prioridad?: boolean;
}

export function CartelJugador({ jugador, locale, dic, prioridad = false }: Props) {
  return (
    <Link
      className="cartel cristal rev"
      href={href(locale, 'fichajes', jugador.slug)}
      aria-label={`${jugador.nombre} — ${dic.cartelera.ver}`}
    >
      <span className="sello">{dic.cartelera.sello}</span>
      <div className="marco">
        <FotoJugador
          imagen={jugador.imagen}
          alt={jugador.nombre}
          sizes="(max-width: 700px) 100vw, (max-width: 1180px) 50vw, 33vw"
          prioridad={prioridad}
        />
      </div>
      <div className="placa">
        <h3>{jugador.nombre}</h3>
        <div className="meta">
          <span>{jugador.club}</span>
          <b>{jugador.temporada}</b>
        </div>
        <div className="ver">{dic.cartelera.ver} →</div>
      </div>
    </Link>
  );
}
