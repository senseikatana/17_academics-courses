import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const secciones = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/secciones" }),
  schema: z.object({
    id: z.string(),
    titulo: z.string(),
    slug: z.string(),
    orden: z.number(),
  }),
});

const lecciones = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/lecciones" }),
  schema: z.object({
    id: z.string(),
    titulo: z.string(),
    seccionId: z.string(),
    orden: z.number(),
  }),
});

const curso = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/curso" }),
  schema: z.object({
    titulo: z.string(),
    instructor: z.string(),
  }),
});

export const collections = { secciones, lecciones, curso };
