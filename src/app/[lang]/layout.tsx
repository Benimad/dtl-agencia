import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { clasesFuentes } from '../fuentes';
import '@/styles/globals.css';
import logo from '@/assets/brand/logo.jpg';

import { Ambiente } from '@/components/layout/Ambiente';
import { BotonFlotante } from '@/components/layout/BotonFlotante';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { RevealObserver } from '@/components/ui/RevealObserver';
import { site } from '@/data/site';
import { getDictionary } from '@/i18n';
import { dirOf, isLocale, localeOgTag, locales, type Locale } from '@/i18n/config';

const FAVICON =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%23071012'/%3E%3Cpath d='M8 46V18h10c8 0 13 5 13 14s-5 14-13 14z' fill='%231e5e4a'/%3E%3Cpath d='M32 18h24v7h-8v21h-8V25h-8z' fill='%23eef3ee'/%3E%3C/svg%3E";

export const viewport: Viewport = {
  themeColor: '#06090b',
  width: 'device-width',
  initialScale: 1,
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dic = getDictionary(lang);
  const locale = (isLocale(lang) ? lang : 'es') as Locale;

  return {
    metadataBase: new URL(site.url),
    title: {
      default: dic.meta.inicio.titulo,
      template: `%s — ${site.nombre}`,
    },
    description: dic.meta.inicio.descripcion,
    robots: { index: true, follow: true },
    icons: { icon: FAVICON },
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])),
    },
    openGraph: {
      type: 'website',
      siteName: site.nombre,
      locale: localeOgTag[locale],
      url: `${site.url}/${locale}`,
      title: dic.meta.inicio.titulo,
      description: dic.meta.inicio.descripcion,
    },
    twitter: {
      card: 'summary_large_image',
      title: dic.meta.inicio.titulo,
      description: dic.meta.inicio.descripcion,
    },
  };
}

export default async function LayoutIdioma({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const locale = lang;
  const dic = getDictionary(locale);

  const datosEstructurados = {
    '@context': 'https://schema.org',
    '@type': 'SportsOrganization',
    name: site.nombre,
    description: dic.meta.inicio.descripcion,
    url: `${site.url}/${locale}`,
    logo: `${site.url}${logo.src}`,
    email: site.email,
    telephone: `+${site.whatsapp}`,
    areaServed: site.paises,
    sameAs: [site.instagramUrl],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: `+${site.whatsapp}`,
      contactType: 'customer service',
      availableLanguage: site.idiomasAtencion,
    },
  };

  return (
    <html lang={locale} dir={dirOf(locale)} className={clasesFuentes}>
      <body>
        <script
          type="application/ld+json"
          // Datos estructurados propios, sin entrada de usuario.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(datosEstructurados) }}
        />
        <a className="saltar" href="#contenido">
          {dic.nav.saltar}
        </a>
        <Ambiente />
        <Header locale={locale} dic={dic} />
        <main id="contenido">{children}</main>
        <Footer locale={locale} dic={dic} />
        <BotonFlotante texto={dic.flotante} />
        <RevealObserver />
      </body>
    </html>
  );
}
