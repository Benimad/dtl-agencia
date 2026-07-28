import Link from 'next/link';
import { href } from '@/i18n/routes';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/types';

export function Hero({ locale, dic }: { locale: Locale; dic: Dictionary }) {
  return (
    <section className="hero" id="inicio">
      <div className="circulo-central" aria-hidden="true" />
      <div className="wrap">
        <p className="eyebrow rev">{dic.hero.eyebrow}</p>
        <h1 className="rev">
          <span>{dic.hero.titulo1}</span>
          <em>{dic.hero.titulo2}</em>
        </h1>

        <div className="hero-pie">
          <p className="rev">{dic.hero.lead}</p>
          <div className="acciones rev">
            <Link className="btn btn-primario" href={href(locale, 'candidatura')}>
              {dic.hero.cta1}
            </Link>
            <Link className="btn btn-fantasma" href={href(locale, 'fichajes')}>
              {dic.hero.cta2}
            </Link>
          </div>
        </div>

        <div className="marcador cristal rev">
          {dic.marcador.map((m) => (
            <div key={m.etiqueta}>
              <strong>{m.valor}</strong>
              <span>{m.etiqueta}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
