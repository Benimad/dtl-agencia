import { CabeceraSeccion } from '@/components/ui/CabeceraSeccion';
import type { Testimonio } from '@/lib/db/esquema';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/types';

interface Props {
  locale: Locale;
  dic: Dictionary;
  testimonios: Testimonio[];
}

export function Testimonios({ locale, dic, testimonios }: Props) {
  if (testimonios.length === 0) return null;

  return (
    <section id="testimonios">
      <div className="wrap">
        <CabeceraSeccion titulo={dic.testimonios.titulo} sub={dic.testimonios.sub} />
        <div className="testimonios">
          {testimonios.map((t) => (
            <div className="testimonio cristal rev" key={t.id}>
              <span className="comillas" aria-hidden="true">
                “
              </span>
              <p>{t.texto[locale] || t.texto.es}</p>
              <span className="firma">{t.firma[locale] || t.firma.es}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
