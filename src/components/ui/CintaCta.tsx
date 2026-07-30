import Link from 'next/link';
import { IconoWhatsApp } from './Icons';
import { href } from '@/i18n/routes';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/types';

/** Cierre de página: la llamada a la acción que se repite en todas. */
export function CintaCta({
  locale,
  dic,
  whatsappUrl,
}: {
  locale: Locale;
  dic: Dictionary;
  whatsappUrl: string;
}) {
  return (
    <section>
      <div className="wrap">
        <div className="cinta-cta cristal rev">
          <div>
            <h2>{dic.cta.titulo}</h2>
            <p>{dic.cta.texto}</p>
          </div>
          <div className="acciones">
            <Link className="btn btn-primario" href={href(locale, 'candidatura')}>
              {dic.cta.boton}
            </Link>
            <a
              className="btn btn-fantasma"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconoWhatsApp />
              {dic.cta.secundario}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
