import type { Metadata } from 'next';
import { CabeceraPagina } from '@/components/ui/CabeceraPagina';
import { CintaCta } from '@/components/ui/CintaCta';
import { Servicios } from '@/components/sections/Servicios';
import { Proceso } from '@/components/sections/Proceso';
import { getDictionary } from '@/i18n';
import { metaDePagina } from '@/lib/meta';
import type { Locale } from '@/i18n/config';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return metaDePagina(lang, 'servicios', 'servicios');
}

export default async function PaginaServicios({
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
        migas={[{ texto: dic.nav.servicios }]}
        eyebrow={dic.hero.eyebrow}
        titulo={dic.servicios.titulo}
        lead={dic.servicios.sub}
      />
      <Servicios locale={lang} dic={dic} conCabecera={false} conDetalle />
      <Proceso locale={lang} dic={dic} />
      <CintaCta locale={lang} dic={dic} />
    </>
  );
}
