import { redirect } from 'next/navigation';
import Link from 'next/link';
import { MarcaAdmin } from '@/components/admin/Marca';
import { FormularioAcceso } from './FormularioAcceso';
import { contarUsuarios } from '@/lib/db';
import { usuarioActual } from '@/lib/auth/sesion';

export const dynamic = 'force-dynamic';

export default async function PaginaAcceso({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  // Si ya hay sesión no tiene sentido pedir la contraseña otra vez.
  if (await usuarioActual()) redirect(`/${lang}/admin`);

  const primeraVez = (await contarUsuarios()) === 0;

  return (
    <div className="acceso">
      <div className="ambiente" aria-hidden="true">
        <div className="foco a" />
        <div className="foco b" />
      </div>
      <div className="acceso-caja cristal">
        <MarcaAdmin href={`/${lang}`} />
        <FormularioAcceso lang={lang} primeraVez={primeraVez} />
        <Link className="acceso-volver" href={`/${lang}`}>
          ← Volver a la web
        </Link>
      </div>
    </div>
  );
}
