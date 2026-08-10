import { Ambiente } from '@/components/layout/Ambiente';
import { BotonFlotante } from '@/components/layout/BotonFlotante';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { IDIOMAS_ATENCION, NOMBRE_SITIO, PAISES, urlSitio } from '@/data/site';
import { getDictionary } from '@/i18n';
import type { Locale } from '@/i18n/config';
import { obtenerContacto } from '@/lib/contacto';
import logo from '@/assets/brand/logo.jpg';

export default async function LayoutSitio({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  // El layout de idioma ya ha rechazado cualquier valor que no sea es/fr/ar.
  const lang = (await params).lang as Locale;
  const dic = getDictionary(lang);
  const contacto = await obtenerContacto();

  const datosEstructurados = {
    '@context': 'https://schema.org',
    '@type': 'SportsOrganization',
    name: NOMBRE_SITIO,
    description: dic.meta.inicio.descripcion,
    url: `${urlSitio()}/${lang}`,
    logo: `${urlSitio()}${logo.src}`,
    email: contacto.email,
    telephone: `+${contacto.whatsapp}`,
    areaServed: PAISES,
    sameAs: [contacto.instagramUrl],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: `+${contacto.whatsapp}`,
      contactType: 'customer service',
      availableLanguage: IDIOMAS_ATENCION,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        // Datos estructurados propios, sin entrada de usuario.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datosEstructurados) }}
      />
      <a className="saltar" href="#contenido">
        {dic.nav.saltar}
      </a>
      <Ambiente />
      <Header locale={lang} dic={dic} whatsappUrl={contacto.whatsappUrl} />
      <main id="contenido">{children}</main>
      <Footer locale={lang} dic={dic} contacto={contacto} />
      <BotonFlotante texto={dic.flotante} whatsappUrl={contacto.whatsappUrl} />
    </>
  );
}
