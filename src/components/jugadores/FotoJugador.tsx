import Image from 'next/image';
import type { Imagen } from '@/lib/db/esquema';

/**
 * Dónde vive una foto. Con Supabase, en su Storage público; sin él, la
 * sirve nuestra propia ruta /media desde el disco del servidor.
 */
export function rutaMedia(imagen: Imagen): string {
  const supabase = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (supabase) {
    const cubo = process.env.NEXT_PUBLIC_SUPABASE_BUCKET || 'carteles';
    return `${supabase.replace(/\/$/, '')}/storage/v1/object/public/${cubo}/${imagen.archivo}`;
  }
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
