import Link from 'next/link';
import { site, whatsappUrl } from '@/data/site';
import { href } from '@/i18n/routes';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/types';

interface Props {
  locale: Locale;
  dic: Dictionary;
}

export function Footer({ locale, dic }: Props) {
  const anio = new Date().getFullYear();

  return (
    <footer>
      <div className="wrap">
        <div className="pie-rejilla">
          <div className="pie-marca">
            <h4>{site.nombre}</h4>
            <p>{dic.pie.sobre}</p>
          </div>

          <div>
            <h4>{dic.pie.navegacion}</h4>
            <ul>
              <li>
                <Link href={href(locale, 'fichajes')}>{dic.nav.fichajes}</Link>
              </li>
              <li>
                <Link href={href(locale, 'servicios')}>{dic.nav.servicios}</Link>
              </li>
              <li>
                <Link href={href(locale, 'proceso')}>{dic.nav.proceso}</Link>
              </li>
              <li>
                <Link href={href(locale, 'mercados')}>{dic.nav.mercados}</Link>
              </li>
              <li>
                <Link href={href(locale, 'candidatura')}>{dic.nav.candidatura}</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4>{dic.pie.contacto}</h4>
            <ul>
              <li>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  {site.whatsappVisible}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>
                <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer">
                  @{site.instagram}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pie">
          <p>
            © {anio} {site.nombre} · {dic.pie.descripcion}
          </p>
          {/*
            ═══ LICENCIA ═══
            Si tienes licencia de agente FIFA / RFEF, descomenta esta línea
            y pon el número real.
            <p>Agente de fútbol · Licencia FIFA nº 0000000</p>
          */}
          <div className="pie-legal">
            <Link href={href(locale, 'avisoLegal')}>{dic.pie.avisoLegal}</Link>
            <Link href={href(locale, 'privacidad')}>{dic.pie.privacidad}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
