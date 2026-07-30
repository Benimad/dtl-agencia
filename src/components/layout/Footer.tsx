import Link from 'next/link';
import { NOMBRE_SITIO, type Contacto } from '@/data/site';
import { href } from '@/i18n/routes';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/types';

interface Props {
  locale: Locale;
  dic: Dictionary;
  contacto: Contacto;
}

export function Footer({ locale, dic, contacto }: Props) {
  const anio = new Date().getFullYear();

  return (
    <footer>
      <div className="wrap">
        <div className="pie-rejilla">
          <div className="pie-marca">
            <h4>{NOMBRE_SITIO}</h4>
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
                <a href={contacto.whatsappUrl} target="_blank" rel="noopener noreferrer">
                  {contacto.whatsappVisible}
                </a>
              </li>
              <li>
                <a href={`mailto:${contacto.email}`}>{contacto.email}</a>
              </li>
              <li>
                <a href={contacto.instagramUrl} target="_blank" rel="noopener noreferrer">
                  @{contacto.instagram}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pie">
          <p>
            © {anio} {NOMBRE_SITIO} · {dic.pie.descripcion}
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
