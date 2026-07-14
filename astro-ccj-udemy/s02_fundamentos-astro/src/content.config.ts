import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';

const secciones = defineCollection({
  schema: z.object({
    id: z.string(),
    titulo: z.string(),
    slug: z.string(),
    orden: z.number(),
  }),
});

const lecciones = defineCollection({
  schema: z.object({
    id: z.string(),
    titulo: z.string(),
    seccionId: z.string(),
    orden: z.number(),
  }),
});

const curso = defineCollection({
  schema: z.object({
    titulo: z.string(),
    instructor: z.string(),
  }),
});

export const collections = { secciones, lecciones, curso };
