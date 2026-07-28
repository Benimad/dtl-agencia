import Link from 'next/link';
import { Texto } from './Texto';
import { href } from '@/i18n/routes';
import type { Locale } from '@/i18n/config';

export interface Miga {
  texto: string;
  href?: string;
}

interface Props {
  locale: Locale;
  inicio: string;
  migas: Miga[];
  eyebrow?: string;
  titulo: string;
  lead?: string;
}

/** Cabecera de las páginas interiores: migas + titular + entradilla. */
export function CabeceraPagina({ locale, inicio, migas, eyebrow, titulo, lead }: Props) {
  return (
    <section className="pagina-cabecera">
      <div className="wrap">
        <nav className="migas rev" aria-label={inicio}>
          <Link href={href(locale, 'inicio')}>{inicio}</Link>
          {migas.map((m, i) => (
            <span key={i}>
              <span aria-hidden="true">·&nbsp;</span>
              {m.href ? (
                <Link href={m.href}>{m.texto}</Link>
              ) : (
                <span aria-current="page">{m.texto}</span>
              )}
            </span>
          ))}
        </nav>
        {eyebrow && <p className="eyebrow rev">{eyebrow}</p>}
        <Texto as="h1" className="rev">
          {titulo}
        </Texto>
        {lead && <p className="lead rev">{lead}</p>}
      </div>
    </section>
  );
}
