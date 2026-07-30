import { BotonEnvio } from '@/components/admin/BotonEnvio';
import { FormularioTestimonio } from '@/components/admin/FormularioTestimonio';
import { eliminarTestimonio, ordenarTestimonio } from '@/acciones/contenido';
import { listarTestimonios } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function AdminTestimonios() {
  const testimonios = listarTestimonios(false);
  const ejemplos = testimonios.filter((t) => t.texto.es.startsWith('['));

  return (
    <>
      <div className="admin-cabecera">
        <div>
          <h1>Testimonios</h1>
          <p>
            Lo que dicen los jugadores y los clubes. Van en los tres idiomas: si no tienes la
            traducción, deja el campo vacío y se usa el español.
          </p>
        </div>
      </div>

      {ejemplos.length > 0 && (
        <div className="tarjeta">
          <h2>Ojo: hay texto de ejemplo publicado</h2>
          <p className="pista" style={{ margin: 0 }}>
            {ejemplos.length === 1
              ? 'Un testimonio sigue con el texto de relleno entre corchetes.'
              : `${ejemplos.length} testimonios siguen con el texto de relleno entre corchetes.`}{' '}
            Cámbialos por frases reales o quítalos antes de enseñar la web a un club.
          </p>
        </div>
      )}

      {testimonios.map((t, i) => (
        <div key={t.id}>
          <FormularioTestimonio testimonio={t} />
          <div className="acciones-form" style={{ marginTop: 0, borderTop: 0 }}>
            <form action={ordenarTestimonio}>
              <input type="hidden" name="id" value={t.id} />
              <input type="hidden" name="salto" value={-1} />
              <button className="mini icono" type="submit" disabled={i === 0} title="Subir">
                ↑
              </button>
            </form>
            <form action={ordenarTestimonio}>
              <input type="hidden" name="id" value={t.id} />
              <input type="hidden" name="salto" value={1} />
              <button
                className="mini icono"
                type="submit"
                disabled={i === testimonios.length - 1}
                title="Bajar"
              >
                ↓
              </button>
            </form>
            <form action={eliminarTestimonio}>
              <input type="hidden" name="id" value={t.id} />
              <BotonEnvio className="mini roja" confirmar="¿Borrar este testimonio?">
                Borrar
              </BotonEnvio>
            </form>
          </div>
        </div>
      ))}

      <FormularioTestimonio />
    </>
  );
}
