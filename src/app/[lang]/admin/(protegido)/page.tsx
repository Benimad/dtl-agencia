import Link from 'next/link';
import { contarCandidaturas, listarCandidaturas, listarClubes, listarJugadores, listarTestimonios } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function Resumen({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const base = `/${lang}/admin`;

  const jugadores = listarJugadores(false);
  const publicados = jugadores.filter((j) => j.publicado).length;
  const candidaturas = contarCandidaturas();
  const ultimas = listarCandidaturas().slice(0, 5);

  const sinFoto = jugadores.filter((j) => !j.imagen).length;
  const placeholders = listarTestimonios(false).filter((t) => t.texto.es.startsWith('['));

  return (
    <>
      <div className="admin-cabecera">
        <div>
          <h1>Resumen</h1>
          <p>
            Todo lo que cambies aquí sale en la web al momento. No hace falta volver a
            publicar nada.
          </p>
        </div>
      </div>

      <div className="cifras">
        <Link className="cifra" href={`${base}/jugadores`}>
          <b>{publicados}</b>
          <span>Fichajes publicados</span>
        </Link>
        <Link
          className={`cifra${candidaturas.pendientes > 0 ? ' aviso' : ''}`}
          href={`${base}/candidaturas`}
        >
          <b>{candidaturas.pendientes}</b>
          <span>Candidaturas pendientes</span>
        </Link>
        <Link className="cifra" href={`${base}/testimonios`}>
          <b>{listarTestimonios(false).length}</b>
          <span>Testimonios</span>
        </Link>
        <Link className="cifra" href={`${base}/clubes`}>
          <b>{listarClubes(false).length}</b>
          <span>Clubes</span>
        </Link>
      </div>

      {(sinFoto > 0 || placeholders.length > 0) && (
        <div className="tarjeta">
          <h2>Pendiente antes de presumir de la web</h2>
          <p className="pista">Esto es lo único que se nota a simple vista.</p>
          <ul className="lista-check">
            {sinFoto > 0 && (
              <li>
                {sinFoto === 1
                  ? 'Hay 1 fichaje sin cartel: la tarjeta sale con las iniciales.'
                  : `Hay ${sinFoto} fichajes sin cartel: sus tarjetas salen con las iniciales.`}
              </li>
            )}
            {placeholders.length > 0 && (
              <li>
                {placeholders.length === 1
                  ? 'Queda 1 testimonio de ejemplo sin sustituir por una frase real.'
                  : `Quedan ${placeholders.length} testimonios de ejemplo sin sustituir por frases reales.`}
              </li>
            )}
          </ul>
        </div>
      )}

      <div className="tarjeta">
        <h2>Últimas candidaturas</h2>
        <p className="pista">
          Cada jugador que rellena el formulario de la web aparece aquí, aunque no llegue a
          enviarte el WhatsApp.
        </p>

        {ultimas.length === 0 ? (
          <div className="vacio">
            <p>Todavía no ha llegado ninguna candidatura.</p>
          </div>
        ) : (
          <div className="filas">
            {ultimas.map((c) => (
              <div className="fila" key={c.id} style={{ gridTemplateColumns: '1fr auto' }}>
                <div>
                  <h3>{c.nombre}</h3>
                  <div className="meta">
                    <span>{c.posicion || '—'}</span>
                    <span>{c.nacimiento}</span>
                    <span>{c.pais || '—'}</span>
                    <span>{new Date(c.recibida).toLocaleDateString('es-ES')}</span>
                  </div>
                </div>
                <div className="acciones-fila">
                  {!c.leida && <span className="estado nueva">Nueva</span>}
                  <span className={`estado ${c.estado}`}>{c.estado}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="acciones-form">
          <Link className="mini" href={`${base}/candidaturas`}>
            Ver todas
          </Link>
          <Link className="mini verde" href={`${base}/jugadores/nuevo`}>
            + Nuevo fichaje
          </Link>
        </div>
      </div>
    </>
  );
}
