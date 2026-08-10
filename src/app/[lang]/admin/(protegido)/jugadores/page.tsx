import Link from 'next/link';
import { BotonEnvio } from '@/components/admin/BotonEnvio';
import { eliminarJugador, ordenarJugador, publicarJugador } from '@/acciones/contenido';
import { listarJugadores } from '@/lib/db';
import { rutaMedia } from '@/components/jugadores/FotoJugador';

export const dynamic = 'force-dynamic';

export default async function AdminJugadores({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const base = `/${lang}/admin/jugadores`;
  const jugadores = await listarJugadores(false);

  return (
    <>
      <div className="admin-cabecera">
        <div>
          <h1>Fichajes</h1>
          <p>
            El orden de esta lista es el orden de la cartelera en la web. Lo que esté sin
            publicar no lo ve nadie de fuera.
          </p>
        </div>
        <Link className="btn btn-primario" href={`${base}/nuevo`}>
          + Nuevo fichaje
        </Link>
      </div>

      {jugadores.length === 0 ? (
        <div className="vacio">
          <p>Todavía no hay ningún fichaje.</p>
          <Link className="btn btn-primario" href={`${base}/nuevo`}>
            Añadir el primero
          </Link>
        </div>
      ) : (
        <div className="filas">
          {jugadores.map((j, i) => (
            <div className={`fila${j.publicado ? '' : ' oculta'}`} key={j.id}>
              <div className="miniatura">
                {j.imagen ? (
                  // Miniatura de gestión: no pasa por next/image a propósito,
                  // así el panel no genera versiones optimizadas que nadie más ve.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={rutaMedia(j.imagen)} alt="" />
                ) : (
                  <span className="estado">—</span>
                )}
              </div>

              <div>
                <h3>{j.nombre}</h3>
                <div className="meta">
                  <span>{j.club || 'sin club'}</span>
                  <span>{j.temporada || 'sin temporada'}</span>
                  <span>/{j.slug}</span>
                  {!j.publicado && <span>oculto</span>}
                </div>
              </div>

              <div className="acciones-fila">
                <form action={ordenarJugador}>
                  <input type="hidden" name="id" value={j.id} />
                  <input type="hidden" name="salto" value={-1} />
                  <button className="mini icono" type="submit" disabled={i === 0} title="Subir">
                    ↑
                  </button>
                </form>
                <form action={ordenarJugador}>
                  <input type="hidden" name="id" value={j.id} />
                  <input type="hidden" name="salto" value={1} />
                  <button
                    className="mini icono"
                    type="submit"
                    disabled={i === jugadores.length - 1}
                    title="Bajar"
                  >
                    ↓
                  </button>
                </form>

                <form action={publicarJugador}>
                  <input type="hidden" name="id" value={j.id} />
                  <BotonEnvio className="mini">
                    {j.publicado ? 'Ocultar' : 'Publicar'}
                  </BotonEnvio>
                </form>

                <Link className="mini verde" href={`${base}/${j.id}`}>
                  Editar
                </Link>

                <form action={eliminarJugador}>
                  <input type="hidden" name="id" value={j.id} />
                  <BotonEnvio
                    className="mini roja"
                    confirmar={`¿Borrar el fichaje de ${j.nombre}? No se puede deshacer.`}
                  >
                    Borrar
                  </BotonEnvio>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
