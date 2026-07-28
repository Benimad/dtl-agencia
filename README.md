# DTL Agencia — web

Web de representación de futbolistas construida con **Next.js 16 (App Router) + React 19 +
TypeScript**, corriendo sobre **Node.js**. Es la versión multipágina del `dtl-agencia.html`
original: mismo diseño, misma voz, mismos colores — pero con rutas reales, tres idiomas
con URL propia, imágenes optimizadas y una API para las candidaturas.

## Arrancar

```bash
npm install
npm run dev        # http://localhost:3000
```

Otros comandos:

```bash
npm run build      # compila para producción
npm start          # sirve la build (Node)
npm run lint       # ESLint
npm run typecheck  # TypeScript sin emitir
```

Copia `.env.example` a `.env.local` y rellena lo tuyo:

| Variable | Para qué |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Dominio real. Se usa en SEO, sitemap y Open Graph. |
| `NEXT_PUBLIC_WHATSAPP` | Número de WhatsApp, formato internacional sin `+`. |
| `CANDIDATURA_WEBHOOK_URL` | Opcional. Webhook (Zapier, Make, n8n…) al que llega cada ficha. |

## Páginas

| Ruta | Qué es |
| --- | --- |
| `/es` · `/fr` · `/ar` | Portada con todas las secciones |
| `/[idioma]/fichajes` | La cartelera completa |
| `/[idioma]/fichajes/[id]` | Ficha de un jugador (antes era un modal) |
| `/[idioma]/servicios` | Servicios, cada uno con su detalle |
| `/[idioma]/proceso` | Los cuatro pasos, explicados a fondo |
| `/[idioma]/mercados` | España, Marruecos y Europa |
| `/[idioma]/candidatura` | Formulario de jugador |
| `/[idioma]/contacto` | WhatsApp, email e Instagram |
| `/[idioma]/legal/aviso-legal` · `/legal/privacidad` | Textos legales |

`/` redirige al idioma del navegador si es uno de los tres; si no, a español.
`sitemap.xml` y `robots.txt` se generan solos, con `hreflang` para los tres idiomas.

## Qué se toca para actualizar la web

| Quiero… | Archivo |
| --- | --- |
| Añadir o editar un fichaje | `src/data/players.ts` (+ la foto en `src/assets/players/`) |
| Cambiar los testimonios | `src/data/testimonios.ts` |
| Teléfono, email, Instagram, clubes | `src/data/site.ts` |
| Cambiar cualquier texto | `src/i18n/dictionaries/{es,fr,ar}.ts` |
| Cambiar colores o tipografías | `src/styles/tokens.css` |
| Añadir un idioma | `src/i18n/config.ts` + un diccionario nuevo |

Los tres diccionarios cumplen el mismo tipo (`src/i18n/types.ts`): si añades una clave en
español y te olvidas del francés o del árabe, **el build falla**. Es a propósito.

## Cómo está montado

```
src/
├── app/                    rutas (App Router)
│   ├── [lang]/             layout raíz + todas las páginas por idioma
│   └── api/candidatura/    valida la ficha y la reenvía al webhook
├── components/
│   ├── layout/             cabecera, pie, atmósfera, botón flotante
│   ├── sections/           bloques reutilizables de página
│   ├── jugadores/          cartel y ficha
│   ├── formulario/         candidatura (cliente)
│   └── ui/                 botonera, cabeceras, revelado al scroll
├── data/                   contenido que no depende del idioma
├── i18n/                   idiomas, rutas y diccionarios
├── lib/                    validación (zod), mensaje de WhatsApp, metadatos
└── styles/                 tokens → base → layout → componentes → secciones
```

## Detalles que conviene saber

- **El formulario sigue terminando en WhatsApp.** Antes de abrirlo, la ficha pasa por
  `/api/candidatura`, que la valida en el servidor con zod y la reenvía al webhook si lo has
  configurado. Si esa llamada falla, el jugador puede enviar igualmente: no se le bloquea.
- **Las fotos ya no van en base64.** Están en `src/assets/` y las sirve `next/image` en
  AVIF/WebP con `blur` de carga. El HTML pesaba 405 KB; ahora el HTML no lleva ni una imagen.
- **Las tipografías se sirven desde el propio dominio** con `next/font` (Fraunces, Inter,
  IBM Plex Mono para el latín; Amiri y Noto Sans Arabic para el árabe). Ninguna petición a
  Google y ningún salto de fuente al cargar.
- **Árabe con RTL de verdad:** `dir="rtl"` en el `<html>`, no solo texto traducido.
- **Accesibilidad:** enlace de salto al contenido, foco visible, `aria-current` en la
  navegación, errores del formulario anunciados y respeto por `prefers-reduced-motion`.
- **Menú móvil:** el HTML original escondía la navegación por debajo de 900 px y no dejaba
  nada en su lugar. Ahora hay panel desplegable.

`dtl-agencia.html` se conserva en la raíz como referencia del diseño original. No forma
parte de la aplicación y puedes borrarlo cuando ya no lo necesites.

## Antes de publicar

- [ ] Sustituir los testimonios de ejemplo por frases reales (`src/data/testimonios.ts`).
- [ ] Completar los datos del titular en el aviso legal y la política de privacidad
      (los `[completar]` de los diccionarios).
- [ ] Poner `NEXT_PUBLIC_SITE_URL` con el dominio definitivo.
- [ ] Si hay licencia FIFA/RFEF, descomentar la línea del pie en
      `src/components/layout/Footer.tsx`.
