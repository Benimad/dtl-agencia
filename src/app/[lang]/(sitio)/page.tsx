import { BandaLed } from '@/components/sections/BandaLed';
import { Cartelera } from '@/components/sections/Cartelera';
import { Clubes } from '@/components/sections/Clubes';
import { Hero } from '@/components/sections/Hero';
import { Mercados } from '@/components/sections/Mercados';
import { Proceso } from '@/components/sections/Proceso';
import { Servicios } from '@/components/sections/Servicios';
import { Testimonios } from '@/components/sections/Testimonios';
import { BloqueCandidatura } from '@/components/sections/BloqueCandidatura';
import { BloqueContacto } from '@/components/sections/BloqueContacto';
import { getDictionary } from '@/i18n';
import type { Locale } from '@/i18n/config';
import { listarClubes, listarJugadores, listarTestimonios } from '@/lib/db';
import { obtenerContacto } from '@/lib/contacto';

// El contenido lo edita la agencia desde el panel: se lee en cada visita.
export const dynamic = 'force-dynamic';

export default async function Portada({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dic = getDictionary(lang);
  const jugadores = await listarJugadores();
  const contacto = await obtenerContacto();

  return (
    <>
      <Hero locale={lang} dic={dic} />
      <BandaLed dic={dic} jugadores={jugadores} />
      <Clubes
        locale={lang}
        dic={dic}
        clubes={await listarClubes()}
        extra={contacto.clubesExtra[lang]}
      />
      <Cartelera locale={lang} dic={dic} jugadores={jugadores} />
      <Servicios locale={lang} dic={dic} />
      <Proceso locale={lang} dic={dic} />
      <Mercados locale={lang} dic={dic} />
      <Testimonios locale={lang} dic={dic} testimonios={await listarTestimonios()} />
      <BloqueCandidatura locale={lang} dic={dic} whatsapp={contacto.whatsapp} />
      <BloqueContacto dic={dic} contacto={contacto} />
    </>
  );
}
