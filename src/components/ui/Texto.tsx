import { Fragment, type ElementType } from 'react';

interface Props {
  /** Cadena del diccionario. Admite <br> para forzar un salto de línea. */
  children: string;
  as?: ElementType;
  className?: string;
  id?: string;
}

/**
 * Pinta una cadena traducida respetando los <br> del diccionario,
 * sin recurrir a dangerouslySetInnerHTML.
 */
export function Texto({ children, as: Etiqueta = 'span', className, id }: Props) {
  const partes = children.split(/<br\s*\/?>/i);
  return (
    <Etiqueta className={className} id={id}>
      {partes.map((parte, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          {parte}
        </Fragment>
      ))}
    </Etiqueta>
  );
}
