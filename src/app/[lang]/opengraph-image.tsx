import { ImageResponse } from 'next/og';
import { getDictionary } from '@/i18n';
import { locales, type Locale } from '@/i18n/config';

export const alt = 'DTL Agencia — Representación de futbolistas';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

/** Tarjeta que se ve al compartir el enlace en WhatsApp, X o Instagram. */
export default async function OgImage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  // La tarjeta se dibuja con la tipografía del sistema del generador, que no
  // cubre el árabe: en ese idioma usamos el titular latino de la marca.
  const dic = getDictionary(lang === 'ar' ? 'es' : lang);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: '#06090b',
          color: '#eef3ee',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -260,
            left: -160,
            width: 760,
            height: 760,
            borderRadius: 999,
            background: 'radial-gradient(circle at center, rgba(30,94,74,0.72), rgba(6,9,11,0) 68%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -300,
            right: -180,
            width: 720,
            height: 720,
            borderRadius: 999,
            background: 'radial-gradient(circle at center, rgba(34,52,122,0.65), rgba(6,9,11,0) 68%)',
          }}
        />

        <div style={{ display: 'flex', fontSize: 26, letterSpacing: 8, color: '#3ea882' }}>
          DTL AGENCIA
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', fontSize: 104, lineHeight: 1, fontWeight: 700 }}>
            {dic.hero.titulo1}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 104,
              lineHeight: 1,
              fontWeight: 700,
              color: '#3ea882',
            }}
          >
            {dic.hero.titulo2}
          </div>
        </div>

        <div style={{ display: 'flex', fontSize: 30, color: 'rgba(238,243,238,0.62)' }}>
          {dic.pie.descripcion} · España ≈ Marruecos ≈ Europa
        </div>
      </div>
    ),
    size,
  );
}
