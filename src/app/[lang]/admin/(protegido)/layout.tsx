import { AvisoAlmacenamiento } from '@/components/admin/AvisoAlmacenamiento';
import { MarcaAdmin } from '@/components/admin/Marca';
import { MenuAdmin } from '@/components/admin/MenuAdmin';
import { salir } from '@/acciones/sesion';
import { exigirSesion } from '@/lib/auth/guardia';
import { contarCandidaturas } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function LayoutPanel({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const usuario = await exigirSesion(lang);
  const { sinLeer } = await contarCandidaturas();

  return (
    <div className="admin">
      <aside className="admin-barra">
        <MarcaAdmin href={`/${lang}/admin`} />
        <MenuAdmin lang={lang} sinLeer={sinLeer} />

        <div className="admin-pie">
          <div>
            <strong>{usuario.nombre}</strong>
            {usuario.email}
          </div>
          <a href={`/${lang}`} target="_blank" rel="noopener noreferrer">
            Ver la web ↗
          </a>
          <form action={salir}>
            <input type="hidden" name="lang" value={lang} />
            <button type="submit">Cerrar sesión</button>
          </form>
        </div>
      </aside>

      <main className="admin-cuerpo">
        <AvisoAlmacenamiento />
        {children}
      </main>
    </div>
  );
}
