import 'server-only';

import { enlaceWa, type Contacto } from '@/data/site';
import { obtenerAjustes } from '@/lib/db';

/** Datos de contacto tal y como están guardados en el panel. */
export async function obtenerContacto(): Promise<Contacto> {
  const a = await obtenerAjustes();
  return {
    whatsapp: a.whatsapp,
    whatsappVisible: a.whatsappVisible,
    whatsappUrl: enlaceWa(a.whatsapp),
    email: a.email,
    instagram: a.instagram,
    instagramUrl: `https://instagram.com/${a.instagram}`,
    clubesExtra: a.clubesExtra,
  };
}
