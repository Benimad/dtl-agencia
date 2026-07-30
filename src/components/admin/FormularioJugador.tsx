'use client';

import { useActionState, useState } from 'react';
import Link from 'next/link';
import { BotonEnvio } from './BotonEnvio';
import { guardarJugador, type EstadoFormulario } from '@/acciones/contenido';
import type { Jugador } from '@/lib/db/esquema';

const INICIAL: EstadoFormulario = {};

const POSICIONES = [
  'Portero',
  'Lateral',
  'Central',
  'Centrocampista',
  'Extremo',
  'Delantero',
];
const PIES = ['Derecho', 'Izquierdo', 'Ambidiestro'];

export function FormularioJugador({
  lang,
  jugador,
}: {
  lang: string;
  jugador?: Jugador;
}) {
  const [estado, accion] = useActionState(guardarJugador, INICIAL);
  const [previa, setPrevia] = useState<string | null>(
    jugador?.imagen ? `/media/${jugador.imagen.archivo}` : null,
  );
  const [quitar, setQuitar] = useState(false);

  function elegirFoto(archivo: File | undefined) {
    if (!archivo) return;
    setPrevia(URL.createObjectURL(archivo));
    setQuitar(false);
  }

  return (
    <form action={accion}>
      <input type="hidden" name="lang" value={lang} />
      {jugador && <input type="hidden" name="id" value={jugador.id} />}

      <div className="tarjeta">
        <h2>Cartel del fichaje</h2>
        <p className="pista">
          Es la imagen que sale en la cartelera. Vertical queda mejor: la tarjeta la muestra
          en formato póster. JPG, PNG o WebP, hasta 8 MB.
        </p>

        <div className="previa">
          {/* Vista previa local (blob:) mientras se elige el archivo:
              next/image no puede optimizar algo que aún no existe en el servidor. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {previa && !quitar && <img src={previa} alt="Vista previa del cartel" />}
          <div style={{ flex: 1, minWidth: 220 }}>
            <div className="campo">
              <label htmlFor="foto">Subir cartel</label>
              <input
                id="foto"
                name="foto"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={(ev) => elegirFoto(ev.target.files?.[0])}
              />
            </div>

            {jugador?.imagen && (
              <label className="interruptor" style={{ marginTop: 12 }}>
                <input
                  type="checkbox"
                  name="quitarFoto"
                  checked={quitar}
                  onChange={(ev) => setQuitar(ev.target.checked)}
                />
                Quitar el cartel actual
              </label>
            )}
          </div>
        </div>
      </div>

      <div className="tarjeta">
        <h2>Datos del jugador</h2>
        <p className="pista">
          Solo el nombre es obligatorio. Lo que dejes vacío no aparece en la ficha: mejor un
          hueco que un dato inventado.
        </p>

        <div className="rejilla-campos">
          <div className="campo ancho">
            <label htmlFor="nombre">Nombre y apellidos *</label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              defaultValue={jugador?.nombre}
              required
            />
          </div>

          <div className="campo">
            <label htmlFor="club">Club o titular del cartel</label>
            <input
              id="club"
              name="club"
              type="text"
              placeholder="AD Lobón"
              defaultValue={jugador?.club}
            />
          </div>

          <div className="campo">
            <label htmlFor="temporada">Temporada</label>
            <input
              id="temporada"
              name="temporada"
              type="text"
              placeholder="2026 / 2027"
              defaultValue={jugador?.temporada}
            />
          </div>

          <div className="campo">
            <label htmlFor="posicion">Posición</label>
            <select id="posicion" name="posicion" defaultValue={jugador?.posicion ?? ''}>
              <option value="">Sin especificar</option>
              {POSICIONES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div className="campo">
            <label htmlFor="pie">Pie</label>
            <select id="pie" name="pie" defaultValue={jugador?.pie ?? ''}>
              <option value="">Sin especificar</option>
              {PIES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div className="campo">
            <label htmlFor="nacimiento">Año de nacimiento</label>
            <input
              id="nacimiento"
              name="nacimiento"
              type="text"
              placeholder="2006"
              defaultValue={jugador?.nacimiento}
            />
          </div>

          <div className="campo">
            <label htmlFor="altura">Altura</label>
            <input
              id="altura"
              name="altura"
              type="text"
              placeholder="1,82 m"
              defaultValue={jugador?.altura}
            />
          </div>

          <div className="campo">
            <label htmlFor="pais">País</label>
            <input
              id="pais"
              name="pais"
              type="text"
              placeholder="Marruecos"
              defaultValue={jugador?.pais}
            />
          </div>

          <div className="campo ancho">
            <label htmlFor="video">Enlace al vídeo (YouTube, Drive, Instagram)</label>
            <input
              id="video"
              name="video"
              type="url"
              placeholder="https://"
              defaultValue={jugador?.video}
            />
          </div>

          <div className="ancho">
            <label className="interruptor">
              <input
                type="checkbox"
                name="publicado"
                defaultChecked={jugador ? jugador.publicado : true}
              />
              Publicado en la web
            </label>
          </div>
        </div>

        <div className="acciones-form">
          <BotonEnvio ocupado="Guardando…">
            {jugador ? 'Guardar cambios' : 'Crear fichaje'}
          </BotonEnvio>
          <Link className="mini" href={`/${lang}/admin/jugadores`}>
            Cancelar
          </Link>
          {estado.error && <p className="mensaje error">{estado.error}</p>}
        </div>
      </div>
    </form>
  );
}
