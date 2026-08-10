import { BotonEnvio } from '@/components/admin/BotonEnvio';
import { FormularioClub } from '@/components/admin/FormularioClub';
import { eliminarClub, ordenarClub } from '@/acciones/contenido';
import { listarClubes } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function AdminClubes() {
  const clubes = await listarClubes(false);

  return (
    <>
      <div className="admin-cabecera">
        <div>
          <h1>Clubes</h1>
          <p>
            La lista de clubes con los que habéis cerrado. El texto de cierre («+ clubes en
            España, Marruecos y Europa») se edita en Ajustes.
          </p>
        </div>
      </div>

      {clubes.length === 0 ? (
        <div className="vacio">
          <p>Todavía no hay clubes en la lista.</p>
        </div>
      ) : (
        <div className="filas">
          {clubes.map((c, i) => (
            <div
              className={`fila${c.publicado ? '' : ' oculta'}`}
              key={c.id}
              style={{ gridTemplateColumns: '1fr auto' }}
            >
              <FormularioClub club={c} />
              <div className="acciones-fila">
                <form action={ordenarClub}>
                  <input type="hidden" name="id" value={c.id} />
                  <input type="hidden" name="salto" value={-1} />
                  <button className="mini icono" type="submit" disabled={i === 0} title="Subir">
                    ↑
                  </button>
                </form>
                <form action={ordenarClub}>
                  <input type="hidden" name="id" value={c.id} />
                  <input type="hidden" name="salto" value={1} />
                  <button
                    className="mini icono"
                    type="submit"
                    disabled={i === clubes.length - 1}
                    title="Bajar"
                  >
                    ↓
                  </button>
                </form>
                <form action={eliminarClub}>
                  <input type="hidden" name="id" value={c.id} />
                  <BotonEnvio className="mini roja" confirmar={`¿Quitar «${c.nombre}»?`}>
                    Borrar
                  </BotonEnvio>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}

      <FormularioClub />
    </>
  );
}
