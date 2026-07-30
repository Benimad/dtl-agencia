'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SECCIONES = [
  { ruta: '', texto: 'Resumen' },
  { ruta: '/jugadores', texto: 'Fichajes' },
  { ruta: '/candidaturas', texto: 'Candidaturas' },
  { ruta: '/testimonios', texto: 'Testimonios' },
  { ruta: '/clubes', texto: 'Clubes' },
  { ruta: '/ajustes', texto: 'Ajustes' },
];

export function MenuAdmin({ lang, sinLeer }: { lang: string; sinLeer: number }) {
  const pathname = usePathname();
  const base = `/${lang}/admin`;

  return (
    <nav className="admin-menu" aria-label="Secciones del panel">
      {SECCIONES.map((s) => {
        const destino = `${base}${s.ruta}`;
        const activo = s.ruta === '' ? pathname === destino : pathname.startsWith(destino);
        return (
          <Link key={s.ruta} href={destino} aria-current={activo ? 'page' : undefined}>
            {s.texto}
            {s.ruta === '/candidaturas' && sinLeer > 0 && (
              <span className="cuenta">{sinLeer}</span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
