import { CabeceraSeccion } from '@/components/ui/CabeceraSeccion';
import { href } from '@/i18n/routes';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/types';

interface Props {
  locale: Locale;
  dic: Dictionary;
  conCabecera?: boolean;
  conEtiquetas?: boolean;
}

export function Mercados({ locale, dic, conCabecera = true, conEtiquetas = false }: Props) {
  return (
    <section id="mercados">
      <div className="wrap">
        {conCabecera && (
          <CabeceraSeccion
            titulo={dic.mercados.titulo}
            sub={dic.mercados.sub}
            enlace={{ href: href(locale, 'mercados'), texto: dic.mercados.verTodos }}
          />
        )}
        <div className="mercados">
          {dic.mercados.items.map((m) => (
            <div className="mercado cristal rev" key={m.titulo}>
              <span className="bandera" aria-hidden="true">
                {m.bandera}
              </span>
              <h3>{m.titulo}</h3>
              <p>{m.texto}</p>
              {conEtiquetas && (
                <ul>
                  {m.etiquetas.map((e) => (
                    <li key={e}>{e}</li>
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
