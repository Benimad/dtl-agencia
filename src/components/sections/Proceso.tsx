import { CabeceraSeccion } from '@/components/ui/CabeceraSeccion';
import { href } from '@/i18n/routes';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/types';

interface Props {
  locale: Locale;
  dic: Dictionary;
  conCabecera?: boolean;
  conDetalle?: boolean;
}

export function Proceso({ locale, dic, conCabecera = true, conDetalle = false }: Props) {
  return (
    <section id="proceso">
      <div className="wrap">
        {conCabecera && (
          <CabeceraSeccion
            titulo={dic.proceso.titulo}
            sub={dic.proceso.sub}
            enlace={{ href: href(locale, 'proceso'), texto: dic.proceso.verTodos }}
          />
        )}
        <div className="proceso">
          {dic.proceso.pasos.map((p, i) => (
            <div className="paso rev" key={p.titulo}>
              <span className="n">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3>{p.titulo}</h3>
                <p>{p.texto}</p>
                {conDetalle && (
                  <p style={{ marginTop: 10 }} className="tenue">
                    {p.detalle}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
