import Link from 'next/link';
import { Texto } from '@/components/ui/Texto';
import { href } from '@/i18n/routes';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/types';

/** El hueco vacío de la cartelera: el sitio del próximo fichaje. */
export function CartelLibre({ locale, dic }: { locale: Locale; dic: Dictionary }) {
  return (
    <article className="cartel cristal libre rev">
      <span className="eyebrow">{dic.cartelera.sello}</span>
      <Texto as="h3">{dic.cartelera.libreT}</Texto>
      <p>{dic.cartelera.libreP}</p>
      <Link className="btn btn-primario" href={href(locale, 'candidatura')}>
        {dic.cartelera.libreB}
      </Link>
    </article>
  );
}
