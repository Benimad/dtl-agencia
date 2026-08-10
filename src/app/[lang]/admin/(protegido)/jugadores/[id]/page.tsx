import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FormularioJugador } from '@/components/admin/FormularioJugador';
import { obtenerJugador } from '@/lib/db';
import { href } from '@/i18n/routes';
import { isLocale, defaultLocale } from '@/i18n/config';

export const dynamic = 'force-dynamic';

export default async function EditarJugador({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { lang, id } = await params;
  const jugador = await obtenerJugador(id);
  if (!jugador) notFound();

  const locale = isLocale(lang) ? lang : defaultLocale;

  return (
    <>
      <div className="admin-cabecera">
        <div>
          <h1>{jugador.nombre}</h1>
          <p>
            Ficha pública:{' '}
            <Link href={href(locale, 'fichajes', jugador.slug)} target="_blank">
              /{lang}/fichajes/{jugador.slug} ↗
            </Link>
            {!jugador.publicado && ' — ahora mismo está oculta.'}
          </p>
        </div>
      </div>
      <FormularioJugador lang={lang} jugador={jugador} />
    </>
  );
}
