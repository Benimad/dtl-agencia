import type { Metadata } from 'next';
import '@/styles/admin.css';

export const metadata: Metadata = {
  title: 'Panel',
  // El panel nunca debe aparecer en Google.
  robots: { index: false, follow: false, nocache: true },
};

/** Solo carga los estilos del panel: el acceso y el panel tienen su propio marco. */
export default function LayoutAdmin({ children }: { children: React.ReactNode }) {
  return children;
}
