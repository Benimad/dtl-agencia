import type { Metadata } from 'next';
import { CabeceraPagina } from '@/components/ui/CabeceraPagina';
import { CintaCta } from '@/components/ui/CintaCta';
import { Proceso } from '@/components/sections/Proceso';
import { Mercados } from '@/components/sections/Mercados';
import { getDictionary } from '@/i18n';
import { metaDePagina } from '@/lib/meta';
import type { Locale } from '@/i18n/config';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return metaDePagina(lang, 'proceso', 'proceso');
}

export default async function PaginaProceso({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dic = getDictionary(lang);

  return (
    <>
      <CabeceraPagina
        locale={lang}
        inicio={dic.nav.inicio}
        migas={[{ texto: dic.nav.proceso }]}
        eyebrow={dic.form.etiqueta}
        titulo={dic.proceso.titulo}
        lead={dic.proceso.sub}
      />
      <Proceso locale={lang} dic={dic} conCabecera={false} conDetalle />
      <Mercados locale={lang} dic={dic} />
      <CintaCta locale={lang} dic={dic} />
    </>
  );
}
