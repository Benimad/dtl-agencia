import { CabeceraSeccion } from '@/components/ui/CabeceraSeccion';
import { testimonios } from '@/data/testimonios';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/types';

export function Testimonios({ locale, dic }: { locale: Locale; dic: Dictionary }) {
  return (
    <section id="testimonios">
      <div className="wrap">
        <CabeceraSeccion titulo={dic.testimonios.titulo} sub={dic.testimonios.sub} />
        <div className="testimonios">
          {testimonios.map((t, i) => (
            <div className="testimonio cristal rev" key={i}>
              <span className="comillas" aria-hidden="true">
                “
              </span>
              <p>{t.texto[locale] ?? t.texto.es}</p>
              <span className="firma">{t.firma[locale] ?? t.firma.es}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
