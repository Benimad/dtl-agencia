'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getDictionary } from '@/i18n';
import { defaultLocale, isLocale } from '@/i18n/config';
import { href } from '@/i18n/routes';

export default function NoEncontrado() {
  const pathname = usePathname();
  const primero = pathname.split('/').filter(Boolean)[0] ?? '';
  const locale = isLocale(primero) ? primero : defaultLocale;
  const dic = getDictionary(locale);

  return (
    <section className="wrap">
      <div className="perdido">
        <span className="codigo" aria-hidden="true">
          404
        </span>
        <h1>{dic.noEncontrado.titulo}</h1>
        <p className="tenue">{dic.noEncontrado.texto}</p>
        <div>
          <Link className="btn btn-primario" href={href(locale, 'inicio')}>
            {dic.noEncontrado.boton}
          </Link>
        </div>
      </div>
    </section>
  );
}
