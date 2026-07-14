import { db, ProgresoLeccion } from 'astro:db';

export default async function seed() {
  await db.insert(ProgresoLeccion).values([
    // Sección 01
    { seccionSlug: '01_introduccion', leccionId: '01-01' },
    { seccionSlug: '01_introduccion', leccionId: '01-02' },
    { seccionSlug: '01_introduccion', leccionId: '01-03' },
    { seccionSlug: '01_introduccion', leccionId: '01-04' },
    
    // Sección 02
    { seccionSlug: '02_fundamentos', leccionId: '02-03' },
    { seccionSlug: '02_fundamentos', leccionId: '02-04' },
    { seccionSlug: '02_fundamentos', leccionId: '02-05' },
    { seccionSlug: '02_fundamentos', leccionId: '02-06' },
    { seccionSlug: '02_fundamentos', leccionId: '02-07' },
    { seccionSlug: '02_fundamentos', leccionId: '02-08' },
    { seccionSlug: '02_fundamentos', leccionId: '02-09' },
    { seccionSlug: '02_fundamentos', leccionId: '02-10' },
    { seccionSlug: '02_fundamentos', leccionId: '02-11' },
  ]);
}
