import { almacenamientoPersistente } from '@/lib/db';

/**
 * En serverless (Vercel y similares) el disco de cada instancia es temporal:
 * lo que edite la agencia se pierde en cuanto se publique una versión nueva.
 * Mejor decirlo en la cara que dejar que se enteren perdiendo veinte fichas.
 */
export function AvisoAlmacenamiento() {
  if (almacenamientoPersistente()) return null;

  return (
    <div className="tarjeta aviso-serio">
      <h2>⚠ Este panel está sobre almacenamiento temporal</h2>
      <p className="pista" style={{ margin: 0 }}>
        Este servidor no guarda los archivos de forma permanente: los borra en cada
        despliegue y no los comparte entre instancias. Puedes trastear para ver cómo
        funciona el panel, pero <b>no metas aquí las fichas buenas todavía</b>: se
        perderían. Para que sea definitivo hay que alojar la web en un servidor con disco
        propio o conectar una base de datos y un almacén de imágenes.
      </p>
    </div>
  );
}
