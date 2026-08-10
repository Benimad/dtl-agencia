import { almacenamientoPersistente } from '@/lib/db';
import { secretoConfigurado } from '@/lib/auth/sesion';

/**
 * En serverless (Vercel y similares) el disco de cada instancia es temporal:
 * lo que edite la agencia se pierde en cuanto se publique una versión nueva.
 * Mejor decirlo en la cara que dejar que se enteren perdiendo veinte fichas.
 */
export function AvisoAlmacenamiento() {
  const guarda = almacenamientoPersistente();
  const claveFijada = secretoConfigurado();

  if (guarda && claveFijada) return null;

  return (
    <>
      {!guarda && (
        <div className="tarjeta aviso-serio">
          <h2>⚠ Este panel está sobre almacenamiento temporal</h2>
          <p className="pista" style={{ margin: 0 }}>
            Este servidor no guarda los archivos de forma permanente: los borra en cada
            despliegue y no los comparte entre instancias. Puedes trastear para ver cómo
            funciona el panel, pero <b>no metas aquí las fichas buenas todavía</b>: se
            perderían. Para que sea definitivo hay que alojar la web en un servidor con
            disco propio o conectar una base de datos y un almacén de imágenes.
          </p>
        </div>
      )}

      {!claveFijada && (
        <div className="tarjeta aviso-serio">
          <h2>⚠ Falta la clave de sesión (AUTH_SECRET)</h2>
          <p className="pista" style={{ margin: 0 }}>
            El panel funciona, pero la clave con la que se firman las sesiones se está
            derivando del despliegue: cada vez que se publique una versión nueva habrá que
            volver a entrar. Define <code>AUTH_SECRET</code> en las variables de entorno del
            servidor y esto desaparece.
          </p>
        </div>
      )}
    </>
  );
}
