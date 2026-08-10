import type { Metadata } from 'next';
import { CabeceraPagina } from '@/components/ui/CabeceraPagina';
import { BloqueContacto } from '@/components/sections/BloqueContacto';
import { CintaCta } from '@/components/ui/CintaCta';
import { getDictionary } from '@/i18n';
import { metaDePagina } from '@/lib/meta';
import type { Locale } from '@/i18n/config';
import { obtenerContacto } from '@/lib/contacto';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return metaDePagina(lang, 'contacto', 'contacto');
}

export default async function PaginaContacto({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dic = getDictionary(lang);
  const contacto = await obtenerContacto();

  return (
    <>
      <CabeceraPagina
        locale={lang}
        inicio={dic.nav.inicio}
        migas={[{ texto: dic.nav.contacto }]}
        eyebrow={dic.contacto.etiqueta}
        titulo={dic.contacto.titulo}
        lead={dic.contacto.lead}
      />
      <BloqueContacto dic={dic} contacto={contacto} conTitular={false} />
      <CintaCta locale={lang} dic={dic} whatsappUrl={contacto.whatsappUrl} />
    </>
  );
}
