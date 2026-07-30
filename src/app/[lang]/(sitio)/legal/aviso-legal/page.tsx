import type { Metadata } from 'next';
import { CabeceraPagina } from '@/components/ui/CabeceraPagina';
import { VistaLegal } from '@/components/legal/VistaLegal';
import { getDictionary } from '@/i18n';
import { metaDePagina } from '@/lib/meta';
import type { Locale } from '@/i18n/config';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return metaDePagina(lang, 'avisoLegal', 'avisoLegal');
}

export default async function PaginaAvisoLegal({
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
        migas={[{ texto: dic.pie.legal }, { texto: dic.legal.aviso.titulo }]}
        titulo={dic.legal.aviso.titulo}
      />
      <VistaLegal documento={dic.legal.aviso} actualizado={dic.legal.actualizado} />
    </>
  );
}
