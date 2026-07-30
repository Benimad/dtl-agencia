import Image from 'next/image';
import type { Imagen } from '@/lib/db/esquema';

export function rutaMedia(imagen: Imagen): string {
  return `/media/${encodeURIComponent(imagen.archivo)}`;
}

interface Props {
  imagen: Imagen | null;
  alt: string;
  sizes: string;
  prioridad?: boolean;
}

/** Foto de un fichaje. Si todavía no hay imagen, deja el hueco marcado. */
export function FotoJugador({ imagen, alt, sizes, prioridad = false }: Props) {
  if (!imagen) {
    return (
      <div className="sin-foto" role="img" aria-label={alt}>
        <span>{alt.slice(0, 2).toUpperCase()}</span>
      </div>
    );
  }

  return (
    <Image
      src={rutaMedia(imagen)}
      alt={alt}
      width={imagen.ancho}
      height={imagen.alto}
      sizes={sizes}
      priority={prioridad}
    />
  );
}
