import { FormularioCandidatura } from '@/components/formulario/FormularioCandidatura';
import { Texto } from '@/components/ui/Texto';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/types';

interface Props {
  locale: Locale;
  dic: Dictionary;
  whatsapp: string;
  /** En la página dedicada el titular ya está arriba, no lo repetimos. */
  conTitular?: boolean;
}

export function BloqueCandidatura({ locale, dic, whatsapp, conTitular = true }: Props) {
  return (
    <section id="candidatura">
      <div className="wrap">
        <div className="candidatura cristal rev">
          <div>
            <p className="eyebrow">{dic.form.etiqueta}</p>
            {conTitular && <Texto as="h2">{dic.form.titulo}</Texto>}
            <p className="lead">{dic.form.lead}</p>
            <ul className="lista-check">
              <li>{dic.form.check1}</li>
              <li>{dic.form.check2}</li>
              <li>{dic.form.check3}</li>
            </ul>
          </div>
          <FormularioCandidatura locale={locale} dic={dic} whatsapp={whatsapp} />
        </div>
      </div>
    </section>
  );
}
