import { Texto } from '@/components/ui/Texto';
import type { DocumentoLegal } from '@/i18n/types';

interface Props {
  documento: DocumentoLegal;
  actualizado: string;
}

export function VistaLegal({ documento, actualizado }: Props) {
  return (
    <section>
      <div className="wrap">
        <article className="prosa cristal rev">
          <p className="actualizado">{actualizado}</p>
          <p>{documento.intro}</p>

          {documento.bloques.map((bloque) => (
            <div key={bloque.titulo}>
              <h2>{bloque.titulo}</h2>
              {bloque.lista && (
                <ul>
                  {bloque.lista.map((li) => (
                    <li key={li}>{li}</li>
                  ))}
                </ul>
              )}
              {bloque.parrafos?.map((p, i) => (
                <Texto as="p" key={i}>
                  {p}
                </Texto>
              ))}
            </div>
          ))}
        </article>
      </div>
    </section>
  );
}
