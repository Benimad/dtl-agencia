import Link from 'next/link';
import { Texto } from './Texto';

interface Props {
  titulo: string;
  sub?: string;
  enlace?: { href: string; texto: string };
}

export function CabeceraSeccion({ titulo, sub, enlace }: Props) {
  return (
    <div className="cabecera rev">
      <Texto as="h2">{titulo}</Texto>
      <div className="cabecera-texto">
        {sub && <p className="tenue">{sub}</p>}
        {enlace && (
          <Link className="enlace-flecha" href={enlace.href}>
            {enlace.texto}
            <span className="flecha" aria-hidden="true">
              →
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}
