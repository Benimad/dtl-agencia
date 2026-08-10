import type { Metadata } from 'next';
import { CabeceraPagina } from '@/components/ui/CabeceraPagina';
import { BloqueCandidatura } from '@/components/sections/BloqueCandidatura';
import { Proceso } from '@/components/sections/Proceso';
import { BloqueContacto } from '@/components/sections/BloqueContacto';
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
  return metaDePagina(lang, 'candidatura', 'candidatura');
}

export default async function PaginaCandidatura({
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
        migas={[{ texto: dic.form.cabecera }]}
        eyebrow={dic.form.etiqueta}
        titulo={dic.form.titulo}
        lead={dic.form.lead}
      />
      <BloqueCandidatura
        locale={lang}
        dic={dic}
        whatsapp={contacto.whatsapp}
        conTitular={false}
      />
      <Proceso locale={lang} dic={dic} />
      <BloqueContacto dic={dic} contacto={contacto} />
    </>
  );
}
