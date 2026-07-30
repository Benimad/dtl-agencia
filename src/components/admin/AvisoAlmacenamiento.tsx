/**
 * Vercel no guarda archivos entre despliegues: el disco de cada instancia es
 * temporal. Si el panel corre ahí, lo que edite la agencia se pierde en cuanto
 * Vercel reinicie o se publique una versión nueva. Mejor decirlo en la cara
 * que dejar que se enteren perdiendo veinte fichas.
 */
export function AvisoAlmacenamiento() {
  if (!process.env.VERCEL) return null;

  return (
    <div className="tarjeta aviso-serio">
      <h2>⚠ Este panel está sobre almacenamiento temporal</h2>
      <p className="pista" style={{ margin: 0 }}>
        La web está desplegada en Vercel, que borra los archivos del servidor en cada
        despliegue. Puedes trastear para ver cómo funciona, pero <b>no metas aquí las fichas
        buenas todavía</b>: se perderían al publicar la siguiente versión. Para que sea
        definitivo hay que conectar una base de datos y un almacén de imágenes, o alojar la
        web en un servidor con disco propio.
      </p>
    </div>
  );
}
