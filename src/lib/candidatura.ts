import { z } from 'zod';

const AHORA = new Date().getFullYear();

/** Esquema compartido por el formulario (cliente) y /api/candidatura (servidor). */
export const candidaturaSchema = z.object({
  nombre: z.string().trim().min(3).max(80),
  nacimiento: z
    .coerce.number()
    .int()
    .min(1975)
    .max(Math.min(2016, AHORA - 9)),
  posicion: z.string().trim().min(1).max(40),
  pie: z.string().trim().max(40).optional().or(z.literal('')),
  club: z.string().trim().max(80).optional().or(z.literal('')),
  pais: z.string().trim().max(60).optional().or(z.literal('')),
  video: z
    .string()
    .trim()
    .url()
    .refine((v) => /^https?:\/\//i.test(v), 'Debe empezar por http(s)://'),
  mensaje: z.string().trim().max(1200).optional().or(z.literal('')),
  rgpd: z.literal(true),
  idioma: z.enum(['es', 'fr', 'ar']),
});

export type Candidatura = z.infer<typeof candidaturaSchema>;

/** Campos obligatorios, en el orden en que aparecen en el formulario. */
export const camposObligatorios = ['nombre', 'nacimiento', 'posicion', 'video'] as const;
export type CampoObligatorio = (typeof camposObligatorios)[number];
