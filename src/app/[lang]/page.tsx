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

export default async function Portada({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const dic = getDictionary(lang);

  return (
    <>
      <Hero locale={lang} dic={dic} />
      <BandaLed dic={dic} />
      <Clubes dic={dic} />
      <Cartelera locale={lang} dic={dic} />
      <Servicios locale={lang} dic={dic} />
      <Proceso locale={lang} dic={dic} />
      <Mercados locale={lang} dic={dic} />
      <Testimonios locale={lang} dic={dic} />
      <BloqueCandidatura locale={lang} dic={dic} />
      <BloqueContacto dic={dic} />
    </>
  );
}
