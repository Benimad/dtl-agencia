import type { Club } from '@/lib/db/esquema';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/types';

interface Props {
  locale: Locale;
  dic: Dictionary;
  clubes: Club[];
  extra: string;
}

export function Clubes({ dic, clubes, extra }: Props) {
  return (
    <section className="clubes">
      <div className="wrap">
        <p className="eyebrow rev" style={{ marginBottom: 16 }}>
          {dic.clubes.titulo}
        </p>
        <div className="clubes-lista rev">
          {clubes.map((c) => (
            <span className="club" key={c.id}>
              {c.nombre}
            </span>
          ))}
          {extra && <span className="club">{extra}</span>}
        </div>
      </div>
    </section>
  );
}
