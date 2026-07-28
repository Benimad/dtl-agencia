import type { Metadata } from 'next';
import { CabeceraPagina } from '@/components/ui/CabeceraPagina';
import { CintaCta } from '@/components/ui/CintaCta';
import { Cartelera } from '@/components/sections/Cartelera';
import { Testimonios } from '@/components/sections/Testimonios';
import { getDictionary } from '@/i18n';
import { metaDePagina } from '@/lib/meta';
import type { Locale } from '@/i18n/config';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return metaDePagina(lang, 'fichajes', 'fichajes');
}

export default async function PaginaFichajes({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dic = getDictionary(lang);

  return (
    <>
      <CabeceraPagina
        locale={lang}
        inicio={dic.nav.inicio}
        migas={[{ texto: dic.nav.fichajes }]}
        eyebrow={dic.clubes.titulo}
        titulo={dic.cartelera.titulo}
        lead={dic.cartelera.sub}
      />
      <Cartelera locale={lang} dic={dic} conCabecera={false} />
      <Testimonios locale={lang} dic={dic} />
      <CintaCta locale={lang} dic={dic} />
    </>
  );
}
