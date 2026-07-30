import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CabeceraPagina } from '@/components/ui/CabeceraPagina';
import { CintaCta } from '@/components/ui/CintaCta';
import { CartelJugador } from '@/components/jugadores/CartelJugador';
import { FotoJugador, rutaMedia } from '@/components/jugadores/FotoJugador';
import { NOMBRE_SITIO, urlSitio } from '@/data/site';
import { getDictionary } from '@/i18n';
import { href } from '@/i18n/routes';
import { locales, type Locale } from '@/i18n/config';
import { listarJugadores, obtenerJugadorPorSlug } from '@/lib/db';
import { obtenerContacto } from '@/lib/contacto';

interface Props {
  params: Promise<{ lang: Locale; id: string }>;
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, id } = await params;
  const jugador = obtenerJugadorPorSlug(id);
  if (!jugador) return {};

  const dic = getDictionary(lang);
  const titulo = `${jugador.nombre} — ${jugador.club}`;
  const descripcion = `${jugador.nombre} · ${jugador.club} · ${dic.ficha.temporada} ${jugador.temporada}. ${dic.meta.fichajes.descripcion}`;
  const ruta = href(lang, 'fichajes', jugador.slug);

  return {
    title: titulo,
    description: descripcion,
    alternates: {
      canonical: ruta,
      languages: Object.fromEntries(
        locales.map((l) => [l, href(l, 'fichajes', jugador.slug)]),
      ),
    },
    openGraph: {
      title: `${titulo} — ${NOMBRE_SITIO}`,
      description: descripcion,
      url: `${urlSitio()}${ruta}`,
      images: jugador.imagen
        ? [
            {
              url: rutaMedia(jugador.imagen),
              width: jugador.imagen.ancho,
              height: jugador.imagen.alto,
            },
          ]
        : undefined,
    },
  };
}

export default async function PaginaJugador({ params }: Props) {
  const { lang, id } = await params;
  const jugador = obtenerJugadorPorSlug(id);
  if (!jugador) notFound();

  const dic = getDictionary(lang);
  const contacto = obtenerContacto();
  const otros = listarJugadores().filter((j) => j.id !== jugador.id);

  const datos = (
    [
      [dic.ficha.posicion, jugador.posicion],
      [dic.ficha.nacimiento, jugador.nacimiento],
      [dic.ficha.pie, jugador.pie],
      [dic.ficha.altura, jugador.altura],
      [dic.ficha.pais, jugador.pais],
      [dic.ficha.temporada, jugador.temporada],
    ] as [string, string][]
  ).filter(([, valor]) => Boolean(valor));

  return (
    <>
      <CabeceraPagina
        locale={lang}
        inicio={dic.nav.inicio}
        migas={[
          { texto: dic.nav.fichajes, href: href(lang, 'fichajes') },
          { texto: jugador.nombre },
        ]}
        eyebrow={dic.cartelera.sello}
        titulo={jugador.nombre}
      />

      <section>
        <div className="wrap">
          <div className="ficha ficha-pagina cristal rev">
            <FotoJugador
              imagen={jugador.imagen}
              alt={jugador.nombre}
              sizes="(max-width: 900px) 100vw, 40vw"
              prioridad
            />
            <div>
              <p className="club-linea">
                {[jugador.club, jugador.temporada].filter(Boolean).join(' · ')}
              </p>

              {datos.length > 0 ? (
                <div className="datos">
                  {datos.map(([etiqueta, valor]) => (
                    <div key={etiqueta}>
                      <small>{etiqueta}</small>
                      <b>{valor}</b>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="tenue">{dic.ficha.sinDatos}</p>
              )}

              <div className="ficha-acciones">
                {jugador.video && (
                  <a
                    className="btn btn-primario"
                    href={jugador.video}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {dic.ficha.video}
                  </a>
                )}
                <Link className="btn btn-fantasma" href={href(lang, 'fichajes')}>
                  {dic.ficha.volver}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {otros.length > 0 && (
        <section>
          <div className="wrap">
            <div className="cabecera rev">
              <h2>{dic.ficha.otros}</h2>
            </div>
            <div className="cartelera">
              {otros.map((j) => (
                <CartelJugador key={j.id} jugador={j} locale={lang} dic={dic} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CintaCta locale={lang} dic={dic} whatsappUrl={contacto.whatsappUrl} />
    </>
  );
}
