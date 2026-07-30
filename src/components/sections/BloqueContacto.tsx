import { IconoEmail, IconoInstagram, IconoWhatsApp } from '@/components/ui/Icons';
import { Texto } from '@/components/ui/Texto';
import type { Contacto } from '@/data/site';
import type { Dictionary } from '@/i18n/types';

interface Props {
  dic: Dictionary;
  contacto: Contacto;
  conTitular?: boolean;
}

export function BloqueContacto({ dic, contacto, conTitular = true }: Props) {
  return (
    <section id="contacto">
      <div className="wrap">
        <div className="contacto cristal rev">
          <div>
            <p className="eyebrow">{dic.contacto.etiqueta}</p>
            {conTitular && <Texto as="h2">{dic.contacto.titulo}</Texto>}
            <p className="lead">{dic.contacto.lead}</p>
            <p className="lead">{dic.contacto.horario}</p>
          </div>

          <div className="vias">
            <a
              className="via"
              href={contacto.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="icono">
                <IconoWhatsApp />
              </span>
              <span>
                <small>{dic.contacto.whatsapp}</small>
                <strong>{contacto.whatsappVisible}</strong>
              </span>
            </a>

            <a className="via" href={`mailto:${contacto.email}`}>
              <span className="icono">
                <IconoEmail />
              </span>
              <span>
                <small>{dic.contacto.email}</small>
                <strong>{contacto.email}</strong>
              </span>
            </a>

            <a
              className="via"
              href={contacto.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="icono">
                <IconoInstagram />
              </span>
              <span>
                <small>{dic.contacto.scouts}</small>
                <strong>@{contacto.instagram}</strong>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
