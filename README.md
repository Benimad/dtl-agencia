# DTL Agencia — web + panel de gestión

Web de representación de futbolistas construida con **Next.js 16 (App Router) + React 19 +
TypeScript**, corriendo sobre **Node.js**. Mismo diseño que el `dtl-agencia.html` original,
pero con rutas reales, tres idiomas con URL propia y —lo importante— un **panel de
administración** para que la agencia edite el contenido sin tocar el código.

## Arrancar

```bash
npm install
cp .env.example .env.local     # y rellena AUTH_SECRET
npm run dev                    # http://localhost:3000
```

La primera vez que entres en `/es/admin` te pedirá **crear la cuenta de administración**.
Esa pantalla solo aparece mientras no exista ninguna cuenta: después pide contraseña.

Otros comandos:

```bash
npm run build      # compila para producción
npm start          # sirve la build (Node)
npm run lint       # ESLint
npm run typecheck  # TypeScript sin emitir
```

| Variable | Para qué |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Dominio real. SEO, sitemap y Open Graph. |
| `AUTH_SECRET` | Firma las sesiones del panel. **Obligatoria en producción**, mínimo 32 caracteres. |
| `CANDIDATURA_WEBHOOK_URL` | Opcional. Webhook al que se reenvía cada candidatura. |

## El panel — `/[idioma]/admin`

| Sección | Qué se puede hacer |
| --- | --- |
| Resumen | Cifras, avisos de lo que falta y últimas candidaturas |
| Fichajes | Crear, editar, borrar, reordenar, publicar/ocultar; subir el cartel |
| Candidaturas | Bandeja de los jugadores que rellenan el formulario: ver vídeo, abrir WhatsApp, aceptar/rechazar, notas internas |
| Testimonios | Alta, edición y orden, en los tres idiomas |
| Clubes | La fila de «clubes con los que hemos cerrado» |
| Ajustes | WhatsApp, email, Instagram y contraseña de acceso |

Todo lo que se guarda sale en la web **al momento**: las páginas públicas leen de la base en
cada visita, no hay que volver a desplegar.

**Seguridad:** contraseñas con `scrypt` (nunca en claro), sesión en cookie `httpOnly` firmada
con HMAC-SHA256, y toda acción de escritura vuelve a comprobar la sesión en el servidor —
nunca se fía de lo que llegue en el formulario. El panel va con `noindex`.

## ⚠️ Dónde se guardan los datos (léelo antes de desplegar)

El contenido vive en `data/db.json` y las fotos en `data/uploads/`, en el disco del servidor.
Va perfecto en local y en cualquier VPS o contenedor con disco propio.

**En Vercel no sirve para producción.** Vercel borra el disco en cada despliegue: la agencia
metería veinte fichas y las perdería al publicar la siguiente versión. El panel detecta que
está en Vercel y muestra el aviso, pero conviene saberlo antes:

- **Para enseñar la web y probar el panel** → Vercel vale.
- **Para trabajar de verdad** → o se aloja en un servidor con disco (VPS, Railway, Render,
  Fly.io…), o se cambia el almacén por una base de datos gestionada.

Cambiarlo es acotado a propósito: todo el acceso a datos pasa por `src/lib/db/`. Hay que
reescribir `almacen.ts` (Postgres en vez de archivo) y `src/acciones/subir.ts` (S3, Vercel
Blob, Cloudinary… en vez de disco). El resto del código no se entera.

## Páginas públicas

| Ruta | Qué es |
| --- | --- |
| `/es` · `/fr` · `/ar` | Portada con todas las secciones |
| `/[idioma]/fichajes` | La cartelera completa |
| `/[idioma]/fichajes/[slug]` | Ficha de un jugador |
| `/[idioma]/servicios` | Servicios, cada uno con su detalle |
| `/[idioma]/proceso` | Los cuatro pasos, explicados a fondo |
| `/[idioma]/mercados` | España, Marruecos y Europa |
| `/[idioma]/candidatura` | Formulario de jugador |
| `/[idioma]/contacto` | WhatsApp, email e Instagram |
| `/[idioma]/legal/aviso-legal` · `/legal/privacidad` | Textos legales |

`/` redirige al idioma del navegador si es uno de los tres; si no, a español.
`sitemap.xml` y `robots.txt` se generan solos, con `hreflang` para los tres idiomas.

## Qué se toca en el código

| Quiero… | Dónde |
| --- | --- |
| Cambiar textos fijos de la web (secciones, servicios, legales) | `src/i18n/dictionaries/{es,fr,ar}.ts` |
| Cambiar colores o tipografías | `src/styles/tokens.css` |
| Añadir un idioma | `src/i18n/config.ts` + un diccionario nuevo |
| Cambiar dónde se guardan los datos | `src/lib/db/almacen.ts` |
| Cambiar dónde se guardan las fotos | `src/acciones/subir.ts` |

Los fichajes, testimonios, clubes y datos de contacto **ya no están en el código**: se
editan desde el panel.

Los tres diccionarios cumplen el mismo tipo (`src/i18n/types.ts`): si añades una clave en
español y te olvidas del francés o del árabe, **el build falla**. Es a propósito.

## Cómo está montado

```
src/
├── app/
│   ├── [lang]/
│   │   ├── layout.tsx        raíz: <html>, tipografías
│   │   ├── (sitio)/          web pública (cabecera, pie, botón flotante)
│   │   └── admin/            panel — login fuera del guardia, resto dentro
│   ├── api/candidatura/      recibe la ficha del jugador y la guarda
│   └── media/[archivo]/      sirve las fotos subidas
├── acciones/                 server actions (sesión, contenido, subidas)
├── components/
│   ├── admin/                panel
│   ├── layout/ sections/ ui/ jugadores/ formulario/ legal/
├── data/site.ts              lo que nunca cambia (marca, países)
├── i18n/                     idiomas, rutas y diccionarios
├── lib/
│   ├── auth/                 contraseñas, sesión y guardia
│   ├── db/                   esquema, almacén, semilla y repositorio
│   └── imagen.ts             medidas de JPG/PNG/WebP sin dependencias
└── styles/                   tokens → base → layout → componentes → secciones → admin
```

## Detalles que conviene saber

- **El formulario sigue terminando en WhatsApp**, pero además la ficha queda guardada en el
  panel. Antes se perdía todo lo que el jugador rellenaba y no llegaba a enviar.
- **Las fotos ya no van en base64.** El HTML original pesaba 405 KB con las imágenes dentro;
  ahora las sirve `next/image` en AVIF/WebP.
- **Tipografías self-hosted** con `next/font`. Ninguna petición a Google.
- **Árabe con RTL de verdad:** `dir="rtl"` en el `<html>`, no solo texto traducido.
- **Accesibilidad:** enlace de salto, foco visible, `aria-current`, errores anunciados y
  respeto por `prefers-reduced-motion`.

## Antes de enseñar la web a un club

- [ ] Sustituir los testimonios de ejemplo por frases reales (panel → Testimonios).
- [ ] Completar los datos del titular en el aviso legal y la política de privacidad: los
      `[completar]` de `src/i18n/dictionaries/`.
- [ ] Poner `NEXT_PUBLIC_SITE_URL` con el dominio definitivo.
- [ ] Decidir el alojamiento definitivo (ver el aviso sobre `data/` más arriba).
- [ ] Si hay licencia FIFA/RFEF, descomentar la línea del pie en
      `src/components/layout/Footer.tsx`.

`dtl-agencia.html` se conserva en la raíz como referencia del diseño original. No forma
parte de la aplicación.
