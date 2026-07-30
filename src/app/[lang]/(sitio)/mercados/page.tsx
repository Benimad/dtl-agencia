import type { Metadata } from 'next';
import { CabeceraPagina } from '@/components/ui/CabeceraPagina';
import { CintaCta } from '@/components/ui/CintaCta';
import { Mercados } from '@/components/sections/Mercados';
import { Clubes } from '@/components/sections/Clubes';
import { getDictionary } from '@/i18n';
import { metaDePagina } from '@/lib/meta';
import type { Locale } from '@/i18n/config';
import { listarClubes } from '@/lib/db';
import { obtenerContacto } from '@/lib/contacto';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return metaDePagina(lang, 'mercados', 'mercados');
}

export default async function PaginaMercados({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dic = getDictionary(lang);
  const contacto = obtenerContacto();

  return (
    <>
      <CabeceraPagina
        locale={lang}
        inicio={dic.nav.inicio}
        migas={[{ texto: dic.nav.mercados }]}
        eyebrow={dic.hero.eyebrow}
        titulo={dic.mercados.titulo}
        lead={dic.mercados.sub}
      />
      <Mercados locale={lang} dic={dic} conCabecera={false} conEtiquetas />
      <Clubes
        locale={lang}
        dic={dic}
        clubes={listarClubes()}
        extra={contacto.clubesExtra[lang]}
      />
      <CintaCta locale={lang} dic={dic} whatsappUrl={contacto.whatsappUrl} />
    </>
  );
}
