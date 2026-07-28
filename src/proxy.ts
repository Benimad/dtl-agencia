import { NextResponse, type NextRequest } from 'next/server';
import { defaultLocale, locales } from '@/i18n/config';

const PUBLICO = /^\/(api|_next|favicon\.ico|robots\.txt|sitemap\.xml|og\.jpg|.*\..*)/;

/** Idioma preferido del navegador, si está entre los que hablamos. */
function idiomaPreferido(req: NextRequest): string {
  const cabecera = req.headers.get('accept-language') ?? '';
  const pedidos = cabecera
    .split(',')
    .map((trozo) => {
      const [etiqueta, q] = trozo.trim().split(';q=');
      return { etiqueta: etiqueta.toLowerCase().split('-')[0], q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  const encontrado = pedidos.find((p) => (locales as readonly string[]).includes(p.etiqueta));
  return encontrado?.etiqueta ?? defaultLocale;
}

export default function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (PUBLICO.test(pathname)) return NextResponse.next();

  const yaTieneIdioma = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (yaTieneIdioma) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = `/${idiomaPreferido(req)}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
