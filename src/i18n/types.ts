/** Forma de un diccionario. Los tres idiomas deben cumplirla al 100 %. */

export interface MetaEntrada {
  titulo: string;
  descripcion: string;
}

export interface ItemServicio {
  etiqueta: string;
  titulo: string;
  texto: string;
  detalle: string[];
}

export interface ItemPaso {
  titulo: string;
  texto: string;
  detalle: string;
}

export interface ItemMercado {
  bandera: string;
  titulo: string;
  texto: string;
  etiquetas: string[];
}

export interface BloqueLegal {
  titulo: string;
  parrafos?: string[];
  lista?: string[];
}

export interface DocumentoLegal {
  titulo: string;
  intro: string;
  bloques: BloqueLegal[];
}

export interface Dictionary {
  nav: {
    inicio: string;
    fichajes: string;
    servicios: string;
    proceso: string;
    mercados: string;
    candidatura: string;
    contacto: string;
    abrirMenu: string;
    cerrarMenu: string;
    idioma: string;
    saltar: string;
  };
  meta: {
    inicio: MetaEntrada;
    fichajes: MetaEntrada;
    servicios: MetaEntrada;
    proceso: MetaEntrada;
    mercados: MetaEntrada;
    candidatura: MetaEntrada;
    contacto: MetaEntrada;
    avisoLegal: MetaEntrada;
    privacidad: MetaEntrada;
  };
  hero: {
    eyebrow: string;
    titulo1: string;
    titulo2: string;
    lead: string;
    cta1: string;
    cta2: string;
  };
  marcador: { valor: string; etiqueta: string }[];
  led: { fichaje: string; mercado: string; mercadoTexto: string };
  clubes: { titulo: string; mas: string };
  cartelera: {
    titulo: string;
    sub: string;
    sello: string;
    ver: string;
    verTodos: string;
    libreT: string;
    libreP: string;
    libreB: string;
  };
  ficha: {
    posicion: string;
    nacimiento: string;
    pie: string;
    altura: string;
    pais: string;
    temporada: string;
    video: string;
    volver: string;
    sinDatos: string;
    otros: string;
  };
  servicios: { titulo: string; sub: string; verTodos: string; items: ItemServicio[] };
  proceso: { titulo: string; sub: string; verTodos: string; pasos: ItemPaso[] };
  mercados: { titulo: string; sub: string; verTodos: string; items: ItemMercado[] };
  testimonios: { titulo: string; sub: string };
  form: {
    etiqueta: string;
    titulo: string;
    lead: string;
    check1: string;
    check2: string;
    check3: string;
    nombre: string;
    nacimiento: string;
    posicion: string;
    pie: string;
    club: string;
    pais: string;
    video: string;
    mensaje: string;
    selecciona: string;
    posiciones: {
      portero: string;
      lateral: string;
      central: string;
      medio: string;
      extremo: string;
      delantero: string;
    };
    pies: { derecho: string; izquierdo: string; ambidiestro: string };
    rgpd: string;
    rgpdEnlace: string;
    enviar: string;
    enviando: string;
    ok: string;
    errores: {
      campos: string;
      rgpd: string;
      nombre: string;
      nacimiento: string;
      posicion: string;
      video: string;
      red: string;
    };
    cabecera: string;
  };
  contacto: {
    etiqueta: string;
    titulo: string;
    lead: string;
    whatsapp: string;
    email: string;
    scouts: string;
    horario: string;
  };
  cta: { titulo: string; texto: string; boton: string; secundario: string };
  pie: {
    descripcion: string;
    sobre: string;
    navegacion: string;
    legal: string;
    contacto: string;
    avisoLegal: string;
    privacidad: string;
    derechos: string;
  };
  flotante: string;
  noEncontrado: { titulo: string; texto: string; boton: string };
  legal: {
    actualizado: string;
    aviso: DocumentoLegal;
    privacidad: DocumentoLegal;
  };
}
