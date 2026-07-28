import { clubes } from '@/data/site';
import type { Dictionary } from '@/i18n/types';

export function Clubes({ dic }: { dic: Dictionary }) {
  return (
    <section className="clubes">
      <div className="wrap">
        <p className="eyebrow rev" style={{ marginBottom: 16 }}>
          {dic.clubes.titulo}
        </p>
        <div className="clubes-lista rev">
          {clubes.map((c) => (
            <span className="club" key={c}>
              {c}
            </span>
          ))}
          <span className="club">{dic.clubes.mas}</span>
        </div>
      </div>
    </section>
  );
}
