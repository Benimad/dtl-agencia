import { CabeceraSeccion } from '@/components/ui/CabeceraSeccion';
import { href } from '@/i18n/routes';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/types';

interface Props {
  locale: Locale;
  dic: Dictionary;
  conCabecera?: boolean;
  /** En la página de servicios ampliamos cada tarjeta con su lista de detalle. */
  conDetalle?: boolean;
}

export function Servicios({ locale, dic, conCabecera = true, conDetalle = false }: Props) {
  return (
    <section id="servicios">
      <div className="wrap">
        {conCabecera && (
          <CabeceraSeccion
            titulo={dic.servicios.titulo}
            sub={dic.servicios.sub}
            enlace={{ href: href(locale, 'servicios'), texto: dic.servicios.verTodos }}
          />
        )}
        <div className="servicios">
          {dic.servicios.items.map((s) => (
            <div className="servicio cristal rev" key={s.titulo}>
              <span className="num">{s.etiqueta}</span>
              <h3>{s.titulo}</h3>
              <p>{s.texto}</p>
              {conDetalle && (
                <ul className="lista-check">
                  {s.detalle.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
