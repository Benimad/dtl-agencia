'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import logo from '@/assets/brand/logo.jpg';
import { IconoWhatsApp } from '@/components/ui/Icons';
import { href, switchLocale, type RouteKey } from '@/i18n/routes';
import { localeLabel, localeName, locales, type Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/types';

const ENLACES: RouteKey[] = [
  'fichajes',
  'servicios',
  'proceso',
  'mercados',
  'contacto',
];

interface Props {
  locale: Locale;
  dic: Dictionary;
  whatsappUrl: string;
}

export function Header({ locale, dic, whatsappUrl }: Props) {
  const pathname = usePathname();
  const [abierto, setAbierto] = useState(false);
  const [rutaPrevia, setRutaPrevia] = useState(pathname);

  // El menú móvil se cierra solo al navegar (patrón de ajuste durante el render).
  if (rutaPrevia !== pathname) {
    setRutaPrevia(pathname);
    setAbierto(false);
  }

  useEffect(() => {
    document.body.classList.toggle('bloqueado', abierto);
    return () => document.body.classList.remove('bloqueado');
  }, [abierto]);

  const activo = (key: RouteKey) => {
    const destino = href(locale, key);
    if (key === 'inicio') return pathname === destino;
    return pathname === destino || pathname.startsWith(`${destino}/`);
  };

  const etiqueta: Record<string, string> = {
    fichajes: dic.nav.fichajes,
    servicios: dic.nav.servicios,
    proceso: dic.nav.proceso,
    mercados: dic.nav.mercados,
    contacto: dic.nav.contacto,
  };

  return (
    <header>
      <div className="wrap">
        <div className="nav cristal">
          <Link className="marca" href={href(locale, 'inicio')}>
            <Image src={logo} alt="DTL Agencia" width={50} height={50} priority />
            <span>
              DTL
              <br />
              AGENCIA
            </span>
          </Link>

          <nav aria-label={dic.nav.inicio}>
            {ENLACES.map((key) => (
              <Link
                key={key}
                href={href(locale, key)}
                aria-current={activo(key) ? 'page' : undefined}
              >
                {etiqueta[key]}
              </Link>
            ))}
          </nav>

          <div className="idiomas" role="group" aria-label={dic.nav.idioma}>
            {locales.map((l) => (
              <Link
                key={l}
                href={switchLocale(pathname, l)}
                hrefLang={l}
                lang={l}
                aria-current={l === locale ? 'true' : undefined}
                title={localeName[l]}
              >
                {localeLabel[l]}
              </Link>
            ))}
          </div>

          <a
            className="btn btn-primario"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconoWhatsApp />
            WhatsApp
          </a>

          <button
            className="hamburguesa"
            type="button"
            aria-expanded={abierto}
            aria-controls="menu-movil"
            aria-label={abierto ? dic.nav.cerrarMenu : dic.nav.abrirMenu}
            onClick={() => setAbierto((v) => !v)}
          >
            <i />
            <i />
            <i />
          </button>
        </div>

        <div
          id="menu-movil"
          className={`panel-movil cristal${abierto ? ' abierto' : ''}`}
          hidden={!abierto}
        >
          <Link href={href(locale, 'inicio')} aria-current={activo('inicio') ? 'page' : undefined}>
            {dic.nav.inicio}
          </Link>
          {ENLACES.map((key) => (
            <Link
              key={key}
              href={href(locale, key)}
              aria-current={activo(key) ? 'page' : undefined}
            >
              {etiqueta[key]}
            </Link>
          ))}
          <Link className="btn btn-primario" href={href(locale, 'candidatura')}>
            {dic.nav.candidatura}
          </Link>
        </div>
      </div>
    </header>
  );
}
