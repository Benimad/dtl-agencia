import { FormularioClave, FormularioContacto } from '@/components/admin/FormularioAjustes';
import { obtenerAjustes } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function AdminAjustes() {
  const ajustes = await obtenerAjustes();

  return (
    <>
      <div className="admin-cabecera">
        <div>
          <h1>Ajustes</h1>
          <p>Los datos de contacto de la agencia y tu contraseña de acceso al panel.</p>
        </div>
      </div>

      <FormularioContacto ajustes={ajustes} />
      <FormularioClave />

      <div className="tarjeta">
        <h2>Textos legales</h2>
        <p className="pista" style={{ margin: 0 }}>
          El aviso legal y la política de privacidad todavía tienen huecos por completar
          (razón social, NIF y domicilio). Están en el código, en{' '}
          <code>src/i18n/dictionaries/</code>: pásale los datos reales a quien lleve la web y
          los rellena en un minuto. Es lo único que la ley exige y que no se puede editar
          desde aquí.
        </p>
      </div>
    </>
  );
}
