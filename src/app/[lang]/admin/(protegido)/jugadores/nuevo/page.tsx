import { FormularioJugador } from '@/components/admin/FormularioJugador';

export const dynamic = 'force-dynamic';

export default async function NuevoJugador({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  return (
    <>
      <div className="admin-cabecera">
        <div>
          <h1>Nuevo fichaje</h1>
          <p>Sube el cartel y rellena lo que tengas. Se puede completar más adelante.</p>
        </div>
      </div>
      <FormularioJugador lang={lang} />
    </>
  );
}
