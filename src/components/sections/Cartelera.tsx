import { CabeceraSeccion } from '@/components/ui/CabeceraSeccion';
import { CartelJugador } from '@/components/jugadores/CartelJugador';
import { CartelLibre } from '@/components/jugadores/CartelLibre';
import { jugadores as todos } from '@/data/players';
import { href } from '@/i18n/routes';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/types';

interface Props {
  locale: Locale;
  dic: Dictionary;
  /** En la portada mostramos la cabecera con enlace; en la página interior, no. */
  conCabecera?: boolean;
}

export function Cartelera({ locale, dic, conCabecera = true }: Props) {
  return (
    <section id="cartelera">
      <div className="wrap">
        {conCabecera && (
          <CabeceraSeccion
            titulo={dic.cartelera.titulo}
            sub={dic.cartelera.sub}
            enlace={{ href: href(locale, 'fichajes'), texto: dic.cartelera.verTodos }}
          />
        )}
        <div className="cartelera">
          {todos.map((j, i) => (
            <CartelJugador
              key={j.id}
              jugador={j}
              locale={locale}
              dic={dic}
              prioridad={i < 2}
            />
          ))}
          <CartelLibre locale={locale} dic={dic} />
        </div>
      </div>
    </section>
  );
}
