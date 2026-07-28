import type { Dictionary } from '../types';

const es: Dictionary = {
  nav: {
    inicio: 'Inicio',
    fichajes: 'Cartelera',
    servicios: 'Servicios',
    proceso: 'Proceso',
    mercados: 'Mercados',
    candidatura: 'Enviar ficha',
    contacto: 'Contacto',
    abrirMenu: 'Abrir menú',
    cerrarMenu: 'Cerrar menú',
    idioma: 'Idioma',
    saltar: 'Ir al contenido',
  },

  meta: {
    inicio: {
      titulo: 'DTL Agencia — Representación de futbolistas · España, Marruecos y Europa',
      descripcion:
        'Agencia de representación de futbolistas. Negociación de contratos, scouting y marca personal dentro y fuera de España. Escríbenos por WhatsApp.',
    },
    fichajes: {
      titulo: 'La cartelera — fichajes cerrados',
      descripcion:
        'Cada cartel es un contrato firmado. Jugadores representados por DTL Agencia en España, Marruecos y Europa.',
    },
    servicios: {
      titulo: 'Servicios — contratos, scouting y marca personal',
      descripcion:
        'Representación, informes y pruebas, marca personal y movilidad internacional. Lo que hace DTL Agencia por un futbolista.',
    },
    proceso: {
      titulo: 'Cómo trabajamos — cuatro pasos',
      descripcion:
        'Envías tu ficha, te evaluamos, te movemos y firmamos. El método de DTL Agencia, sin promesas raras.',
    },
    mercados: {
      titulo: 'Mercados — España, Marruecos y Europa',
      descripcion:
        'Trabajamos dentro y fuera de España, con puente directo entre las dos orillas del Mediterráneo.',
    },
    candidatura: {
      titulo: 'Envía tu ficha — candidatura de jugador',
      descripcion:
        'Rellena tus datos y tu vídeo. Respondemos en 24 h y la evaluación es gratuita.',
    },
    contacto: {
      titulo: 'Contacto — hablamos hoy mismo',
      descripcion: 'WhatsApp, email e Instagram de DTL Agencia. Contestamos personalmente.',
    },
    avisoLegal: { titulo: 'Aviso legal', descripcion: 'Información legal de DTL Agencia.' },
    privacidad: {
      titulo: 'Política de privacidad',
      descripcion: 'Cómo tratamos los datos de los jugadores en DTL Agencia.',
    },
  },

  hero: {
    eyebrow: 'Agencia de representación · 🇪🇸 ≈ 🇲🇦 ≈ 🇪🇺',
    titulo1: 'Del campo',
    titulo2: 'al contrato',
    lead: 'Representamos futbolistas dentro y fuera de España. Negociamos con los clubes, movemos tu vídeo donde se decide y construimos el nombre que llega antes que tú.',
    cta1: 'Enviar mi ficha',
    cta2: 'Ver la cartelera',
  },

  marcador: [
    { valor: '3', etiqueta: 'Mercados abiertos' },
    { valor: '24 h', etiqueta: 'Respuesta a tu vídeo' },
    { valor: '360°', etiqueta: 'Contrato · scouting · marca' },
  ],

  led: {
    fichaje: 'Fichaje cerrado',
    mercado: 'Mercado abierto',
    mercadoTexto: 'España ≈ Marruecos ≈ Europa',
  },

  clubes: {
    titulo: 'Clubes con los que hemos cerrado',
    mas: '+ clubes en España, Marruecos y Europa',
  },

  cartelera: {
    titulo: 'La cartelera',
    sub: 'Cada cartel es un contrato firmado. Entra en una ficha para ver los datos del jugador.',
    sello: 'Fichaje',
    ver: 'Ver ficha',
    verTodos: 'Ver toda la cartelera',
    libreT: 'Tu cartel<br>aquí',
    libreP: 'Mándanos tu vídeo y tus datos. Si encajas, empezamos a moverte esta semana.',
    libreB: 'Quiero mi ficha',
  },

  ficha: {
    posicion: 'Posición',
    nacimiento: 'Nacimiento',
    pie: 'Pie',
    altura: 'Altura',
    pais: 'País',
    temporada: 'Temporada',
    video: 'Ver vídeo',
    volver: 'Volver a la cartelera',
    sinDatos:
      'Ficha en construcción: los datos completos de este jugador se publican cuando el club lo autoriza.',
    otros: 'Otros fichajes',
  },

  servicios: {
    titulo: 'Qué hacemos<br>por ti',
    sub: 'Un jugador solo negocia una vez. Nosotros negociamos todas las semanas.',
    verTodos: 'Ver los servicios',
    items: [
      {
        etiqueta: 'REPRESENTACIÓN',
        titulo: 'Contratos y fichajes',
        texto:
          'Negociamos con el club: ficha, duración, primas, cesiones, renovaciones y salidas. Tú entras al vestuario con todo cerrado.',
        detalle: [
          'Revisión de cláusulas antes de firmar nada.',
          'Negociación de ficha, primas y duración.',
          'Cesiones, renovaciones y rescisiones.',
          'Relación con el club durante toda la temporada.',
        ],
      },
      {
        etiqueta: 'SCOUTING',
        titulo: 'Informes y pruebas',
        texto:
          'Analizamos tu perfil y montamos el vídeo que ven los directores deportivos. Red de ojeadores con @yo.soyde.alcorcon.',
        detalle: [
          'Informe honesto de nivel y mercado posible.',
          'Vídeo de presentación con el metraje que importa.',
          'Pruebas concertadas con clubes reales.',
          'Seguimiento de tus minutos y tu progresión.',
        ],
      },
      {
        etiqueta: 'MARCA PERSONAL',
        titulo: 'Tu nombre antes que tú',
        texto:
          'Carteles, contenido y perfil público cuidado. El club te busca en Instagram antes de llamarte: que encuentre a un profesional.',
        detalle: [
          'Cartel de presentación en cada fichaje.',
          'Perfil público limpio y coherente.',
          'Contenido para redes sin inventar nada.',
          'Contacto con medios locales cuando toca.',
        ],
      },
      {
        etiqueta: 'MOVILIDAD',
        titulo: 'Fuera de España',
        texto:
          'Pruebas en el extranjero, documentación, permisos y aterrizaje: vuelo, alojamiento y primeras semanas resueltas.',
        detalle: [
          'Documentación, permisos y licencias federativas.',
          'Vuelo, alojamiento y primeras semanas.',
          'Acompañamiento con el idioma y el día a día.',
          'Puente permanente entre España y Marruecos.',
        ],
      },
    ],
  },

  proceso: {
    titulo: 'Cómo<br>trabajamos',
    sub: 'Cuatro pasos. Sin promesas raras y sin cobrarte por soñar.',
    verTodos: 'Ver el proceso completo',
    pasos: [
      {
        titulo: 'Envías tu ficha',
        texto:
          'Rellenas el formulario con tu vídeo y tus datos. Te llega a nuestro WhatsApp al instante.',
        detalle:
          'No hace falta representante previo ni contactos. Solo un vídeo que se vea y datos reales: si el año de nacimiento o el club no cuadran, el club lo descubre en dos llamadas y perdemos los dos.',
      },
      {
        titulo: 'Te evaluamos',
        texto:
          'Vemos minutos, nivel real y mercado posible. Si no encajas todavía, te decimos qué falta.',
        detalle:
          'La evaluación es gratuita y la respuesta llega en 24 h. Preferimos decirte que aún no que hacerte perder una temporada esperando una llamada que no va a llegar.',
      },
      {
        titulo: 'Te movemos',
        texto:
          'Presentamos tu perfil a clubes de España, Marruecos y Europa hasta cerrar prueba u oferta.',
        detalle:
          'Tu perfil llega al director deportivo, no a un correo genérico. Te contamos a qué clubes vamos y qué han respondido, aunque la respuesta sea que no.',
      },
      {
        titulo: 'Firmamos y seguimos',
        texto:
          'Contrato revisado, cartel de presentación y acompañamiento durante toda la temporada.',
        detalle:
          'Leemos el contrato entero antes de que lo firmes y te explicamos cada cláusula. Después seguimos ahí: renovación, salida o siguiente paso.',
      },
    ],
  },

  mercados: {
    titulo: 'Dónde<br>llegamos',
    sub: 'Trabajamos dentro y fuera de España, con puente directo entre las dos orillas.',
    verTodos: 'Ver los mercados',
    items: [
      {
        bandera: '🇪🇸',
        titulo: 'España',
        texto:
          'Clubes de categorías nacionales y regionales. Base de operaciones y red de ojeadores.',
        etiquetas: ['Base de operaciones', 'Categorías nacionales', 'Fútbol regional'],
      },
      {
        bandera: '🇲🇦',
        titulo: 'Marruecos',
        texto:
          'Puente para jugadores marroquíes hacia Europa y para clubes que buscan talento en el país.',
        etiquetas: ['Botola y cantera', 'Doble nacionalidad', 'Talento local'],
      },
      {
        bandera: '🇪🇺',
        titulo: 'Europa',
        texto:
          'Salidas al extranjero con toda la documentación y los trámites resueltos desde el primer día.',
        etiquetas: ['Permisos y visados', 'Pruebas concertadas', 'Aterrizaje resuelto'],
      },
    ],
  },

  testimonios: {
    titulo: 'Lo que dicen<br>los nuestros',
    sub: 'Jugadores representados por DTL Agencia.',
  },

  form: {
    etiqueta: 'Candidatura de jugador',
    titulo: 'Envía<br>tu ficha',
    lead: 'Rellena los datos y pulsa enviar: se abre WhatsApp con tu ficha ya escrita. Nosotros la leemos entera.',
    check1: 'Respondemos en 24 h, siempre.',
    check2: 'Si no encajas, te decimos por qué.',
    check3: 'No cobramos nada por evaluarte.',
    nombre: 'Nombre y apellidos *',
    nacimiento: 'Año de nacimiento *',
    posicion: 'Posición *',
    pie: 'Pie',
    club: 'Club actual',
    pais: 'País donde juegas',
    video: 'Enlace a tu vídeo (YouTube, Drive, Instagram) *',
    mensaje: 'Algo más que debamos saber',
    selecciona: 'Selecciona',
    posiciones: {
      portero: 'Portero',
      lateral: 'Lateral',
      central: 'Central',
      medio: 'Centrocampista',
      extremo: 'Extremo',
      delantero: 'Delantero',
    },
    pies: { derecho: 'Derecho', izquierdo: 'Izquierdo', ambidiestro: 'Ambidiestro' },
    rgpd: 'Acepto que DTL Agencia trate mis datos para valorar mi candidatura, según la',
    rgpdEnlace: 'política de privacidad',
    enviar: 'Enviar por WhatsApp',
    enviando: 'Preparando tu ficha…',
    ok: 'Ficha lista: se ha abierto WhatsApp con tu mensaje. Si no se abre, pulsa de nuevo.',
    errores: {
      campos: 'Rellena los campos obligatorios (*).',
      rgpd: 'Debes aceptar la política de privacidad.',
      nombre: 'Escribe tu nombre completo.',
      nacimiento: 'Año entre 1975 y 2016.',
      posicion: 'Elige tu posición.',
      video: 'Pega un enlace que empiece por https://',
      red: 'No hemos podido validar la ficha, pero puedes enviarla igual por WhatsApp.',
    },
    cabecera: 'Candidatura',
  },

  contacto: {
    etiqueta: 'Contacto directo',
    titulo: 'Hablamos<br>hoy mismo',
    lead: 'Si prefieres escribir sin formulario, aquí nos tienes. Contestamos personalmente.',
    whatsapp: 'WhatsApp',
    email: 'Email',
    scouts: 'Scouts',
    horario: 'Escribimos y contestamos todos los días. Respuesta media: menos de 24 h.',
  },

  cta: {
    titulo: '¿Listo para que un club te vea?',
    texto: 'Mándanos tu vídeo y tus datos. Si encajas, empezamos a moverte esta semana.',
    boton: 'Enviar mi ficha',
    secundario: 'Escribir por WhatsApp',
  },

  pie: {
    descripcion: 'Representación de futbolistas',
    sobre:
      'Agencia de representación de futbolistas. Contratos, scouting y marca personal entre España, Marruecos y Europa.',
    navegacion: 'Navegación',
    legal: 'Legal',
    contacto: 'Contacto',
    avisoLegal: 'Aviso legal',
    privacidad: 'Política de privacidad',
    derechos: 'Todos los derechos reservados',
  },

  flotante: 'Escríbenos',

  noEncontrado: {
    titulo: 'Página fuera de juego',
    texto: 'Este enlace no existe o ha cambiado de sitio. Vuelve al inicio y sigue desde ahí.',
    boton: 'Volver al inicio',
  },

  legal: {
    actualizado: 'Última actualización: julio de 2026',
    aviso: {
      titulo: 'Aviso legal',
      intro: 'Información general en cumplimiento de la Ley 34/2002 (LSSI-CE).',
      bloques: [
        {
          titulo: 'Titular del sitio',
          parrafos: [
            'DTL Agencia — [nombre completo o razón social]<br>NIF/NIE: [completar]<br>Domicilio: [completar]<br>Email: darkomagencia@gmail.com<br>Teléfono: +212 714-346018',
          ],
        },
        {
          titulo: 'Objeto',
          parrafos: [
            'Este sitio informa sobre los servicios de representación, asesoramiento y promoción de futbolistas que presta DTL Agencia. El acceso es gratuito y no implica relación contractual alguna: cualquier representación se formaliza siempre por contrato escrito e independiente.',
          ],
        },
        {
          titulo: 'Propiedad intelectual',
          parrafos: [
            'Los carteles y fotografías de jugadores pertenecen a sus clubes o autores respectivos y se muestran a título informativo. El resto de textos, marca y diseño pertenecen a DTL Agencia.',
          ],
        },
        {
          titulo: 'Responsabilidad',
          parrafos: [
            'DTL Agencia no garantiza resultado deportivo ni contractual alguno. La información publicada puede modificarse sin aviso previo.',
          ],
        },
        {
          titulo: 'Legislación aplicable',
          parrafos: ['Las relaciones derivadas de este sitio se rigen por la legislación española.'],
        },
      ],
    },
    privacidad: {
      titulo: 'Política de privacidad',
      intro: 'Conforme al Reglamento (UE) 2016/679 (RGPD) y a la LOPDGDD 3/2018.',
      bloques: [
        {
          titulo: 'Responsable',
          parrafos: [
            'DTL Agencia — [nombre completo o razón social], NIF [completar]. Contacto: darkomagencia@gmail.com',
          ],
        },
        {
          titulo: 'Qué datos recogemos',
          parrafos: [
            'Los que tú nos envías: nombre, año de nacimiento, posición, pie, club, país, enlace a tu vídeo y el mensaje que escribas. Si es un menor de edad, necesitamos autorización de su padre, madre o tutor.',
          ],
        },
        {
          titulo: 'Para qué',
          parrafos: [
            'Para valorar tu candidatura como jugador representado y, si procede, presentarte a clubes. No usamos tus datos para publicidad de terceros ni los vendemos.',
          ],
        },
        {
          titulo: 'Base legal',
          parrafos: [
            'Tu consentimiento expreso al marcar la casilla del formulario, y el interés legítimo en gestionar la relación profesional.',
          ],
        },
        {
          titulo: 'Cómo se envían',
          parrafos: [
            'El formulario abre WhatsApp en tu dispositivo con el mensaje escrito, y eres tú quien decide enviarlo. Antes, el servidor valida los campos para avisarte de errores; si has configurado un webhook propio, la ficha se reenvía a esa herramienta. El tratamiento posterior queda en nuestro teléfono y correo.',
          ],
        },
        {
          titulo: 'Conservación',
          parrafos: [
            'Mantenemos tu candidatura mientras siga siendo de interés y, como máximo, dos años desde el último contacto.',
          ],
        },
        {
          titulo: 'Destinatarios',
          parrafos: [
            'Clubes y responsables deportivos a los que presentemos tu perfil, siempre con tu conocimiento. Proveedores tecnológicos (WhatsApp, correo electrónico) como encargados de tratamiento.',
          ],
        },
        {
          titulo: 'Tus derechos',
          lista: [
            'Acceder, rectificar y suprimir tus datos.',
            'Limitar u oponerte al tratamiento y solicitar su portabilidad.',
            'Retirar el consentimiento en cualquier momento.',
            'Reclamar ante la Agencia Española de Protección de Datos (aepd.es).',
          ],
          parrafos: ['Escríbenos a darkomagencia@gmail.com y lo resolvemos.'],
        },
      ],
    },
  },
};

export default es;
