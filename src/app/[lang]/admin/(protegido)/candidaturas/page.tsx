import Link from 'next/link';
import { BotonEnvio } from '@/components/admin/BotonEnvio';
import { NotasCandidatura } from '@/components/admin/NotasCandidatura';
import { cambiarEstadoCandidatura, eliminarCandidatura } from '@/acciones/contenido';
import { listarCandidaturas, type EstadoCandidatura } from '@/lib/db';
import { enlaceWa } from '@/data/site';
import { obtenerContacto } from '@/lib/contacto';

export const dynamic = 'force-dynamic';

const FILTROS: { valor: string; texto: string }[] = [
  { valor: '', texto: 'Todas' },
  { valor: 'pendiente', texto: 'Pendientes' },
  { valor: 'aceptada', texto: 'Aceptadas' },
  { valor: 'rechazada', texto: 'Rechazadas' },
];

const ESTADOS: EstadoCandidatura[] = ['pendiente', 'aceptada', 'rechazada'];

export default async function AdminCandidaturas({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ estado?: string }>;
}) {
  const { lang } = await params;
  const { estado: filtro } = await searchParams;
  const base = `/${lang}/admin/candidaturas`;

  const activo = ESTADOS.includes(filtro as EstadoCandidatura)
    ? (filtro as EstadoCandidatura)
    : undefined;
  const candidaturas = await listarCandidaturas(activo);
  const contacto = await obtenerContacto();

  return (
    <>
      <div className="admin-cabecera">
        <div>
          <h1>Candidaturas</h1>
          <p>
            Cada jugador que rellena el formulario de la web queda aquí, aunque luego no os
            escriba por WhatsApp. Marca lo que vas resolviendo para no repetir trabajo.
          </p>
        </div>
      </div>

      <div className="filtros">
        {FILTROS.map((f) => (
          <Link
            key={f.valor}
            className={`mini${(activo ?? '') === f.valor ? ' verde' : ''}`}
            href={f.valor ? `${base}?estado=${f.valor}` : base}
          >
            {f.texto}
          </Link>
        ))}
      </div>

      {candidaturas.length === 0 ? (
        <div className="vacio">
          <p>
            {activo
              ? 'No hay candidaturas en este estado.'
              : 'Todavía no ha llegado ninguna candidatura.'}
          </p>
        </div>
      ) : (
        <div className="filas">
          {candidaturas.map((c) => {
            const saludo = `Hola ${c.nombre.split(' ')[0]}, somos DTL Agencia. Hemos visto tu ficha.`;
            return (
              <article className="candidatura-admin" key={c.id}>
                <div className="arriba">
                  <div>
                    <h3>{c.nombre}</h3>
                    <div className="meta" style={{ marginTop: 4 }}>
                      {new Date(c.recibida).toLocaleString('es-ES', {
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      })}
                      {' · '}
                      {c.idioma.toUpperCase()}
                    </div>
                  </div>
                  <div className="acciones-fila">
                    {!c.leida && <span className="estado nueva">Nueva</span>}
                    <span className={`estado ${c.estado}`}>{c.estado}</span>
                  </div>
                </div>

                <div className="datos-linea">
                  <span>
                    Posición <b>{c.posicion || '—'}</b>
                  </span>
                  <span>
                    Nacimiento <b>{c.nacimiento || '—'}</b>
                  </span>
                  {c.pie && (
                    <span>
                      Pie <b>{c.pie}</b>
                    </span>
                  )}
                  {c.club && (
                    <span>
                      Club <b>{c.club}</b>
                    </span>
                  )}
                  {c.pais && (
                    <span>
                      País <b>{c.pais}</b>
                    </span>
                  )}
                </div>

                {c.mensaje && <p className="recado">{c.mensaje}</p>}

                <div className="acciones-fila" style={{ justifyContent: 'flex-start' }}>
                  <a className="mini verde" href={c.video} target="_blank" rel="noopener noreferrer">
                    Ver el vídeo ↗
                  </a>
                  <a
                    className="mini"
                    href={enlaceWa(contacto.whatsapp, saludo)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Abrir WhatsApp
                  </a>

                  {ESTADOS.filter((e) => e !== c.estado).map((e) => (
                    <form action={cambiarEstadoCandidatura} key={e}>
                      <input type="hidden" name="id" value={c.id} />
                      <input type="hidden" name="estado" value={e} />
                      <BotonEnvio className="mini" ocupado="…">
                        Marcar {e}
                      </BotonEnvio>
                    </form>
                  ))}

                  <form action={eliminarCandidatura}>
                    <input type="hidden" name="id" value={c.id} />
                    <BotonEnvio
                      className="mini roja"
                      confirmar={`¿Borrar la candidatura de ${c.nombre}?`}
                    >
                      Borrar
                    </BotonEnvio>
                  </form>
                </div>

                <NotasCandidatura id={c.id} notas={c.notas} />
              </article>
            );
          })}
        </div>
      )}
    </>
  );
}
