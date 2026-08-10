-- ═══════════════════════════════════════════════════════════════
-- DTL Agencia — esquema de la base
--
-- Cómo usarlo:
--   1. supabase.com → tu proyecto → SQL Editor → New query
--   2. Pega todo esto y dale a Run
--   3. Storage → New bucket → nombre "carteles" → marca "Public bucket"
--
-- Nadie llega a estas tablas desde el navegador: el servidor de la web
-- es el único que habla con ellas, con la service role key. Por eso RLS
-- queda activado y sin políticas — deja fuera a cualquier otra clave.
-- ═══════════════════════════════════════════════════════════════

create table if not exists jugadores (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null unique,
  nombre       text not null,
  club         text not null default '',
  temporada    text not null default '',
  posicion     text not null default '',
  nacimiento   text not null default '',
  pie          text not null default '',
  altura       text not null default '',
  pais         text not null default '',
  video        text not null default '',
  imagen       jsonb,
  publicado    boolean not null default true,
  orden        integer not null default 0,
  creado       timestamptz not null default now(),
  actualizado  timestamptz not null default now()
);

create table if not exists testimonios (
  id         uuid primary key default gen_random_uuid(),
  texto      jsonb not null,
  firma      jsonb not null,
  publicado  boolean not null default true,
  orden      integer not null default 0
);

create table if not exists clubes (
  id         uuid primary key default gen_random_uuid(),
  nombre     text not null,
  publicado  boolean not null default true,
  orden      integer not null default 0
);

create table if not exists candidaturas (
  id          uuid primary key default gen_random_uuid(),
  nombre      text not null,
  nacimiento  text not null default '',
  posicion    text not null default '',
  pie         text not null default '',
  club        text not null default '',
  pais        text not null default '',
  video       text not null default '',
  mensaje     text not null default '',
  idioma      text not null default 'es',
  estado      text not null default 'pendiente',
  notas       text not null default '',
  leida       boolean not null default false,
  recibida    timestamptz not null default now()
);

create table if not exists usuarios (
  id      uuid primary key default gen_random_uuid(),
  email   text not null unique,
  nombre  text not null,
  clave   text not null,
  creado  timestamptz not null default now()
);

-- Una sola fila con los datos de contacto de la agencia.
create table if not exists ajustes (
  id                integer primary key default 1,
  whatsapp          text not null default '212714346018',
  whatsapp_visible  text not null default '+212 714-346018',
  email             text not null default 'darkomagencia@gmail.com',
  instagram         text not null default 'yo.soyde.alcorcon',
  clubes_extra      jsonb not null default '{}'::jsonb,
  constraint ajustes_fila_unica check (id = 1)
);

create index if not exists jugadores_orden_idx on jugadores (orden);
create index if not exists testimonios_orden_idx on testimonios (orden);
create index if not exists clubes_orden_idx on clubes (orden);
create index if not exists candidaturas_recibida_idx on candidaturas (recibida desc);

-- Sin políticas: solo la service role key (que vive en el servidor) entra.
alter table jugadores    enable row level security;
alter table testimonios  enable row level security;
alter table clubes       enable row level security;
alter table candidaturas enable row level security;
alter table usuarios     enable row level security;
alter table ajustes      enable row level security;
