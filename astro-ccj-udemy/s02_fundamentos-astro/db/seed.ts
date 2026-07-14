import { db, Seccion, Leccion, ProgresoLeccion } from 'astro:db';

export default async function seed() {
  // 1. Semillar Secciones
  await db.insert(Seccion).values([
    { id: '01', titulo: 'Introducción', slug: '01_introduccion', orden: 1 },
    { id: '02', titulo: 'Fundamentos de Astro', slug: '02_fundamentos', orden: 2 },
  ]);

  // 2. Semillar Lecciones
  await db.insert(Leccion).values([
    // Sección 01
    { id: '01-01', titulo: '1. ¿Qué es Astro y por qué usarlo?', seccionId: '01', orden: 1 },
    { id: '01-02', titulo: '2. ¿Qué es Headless WordPress?', seccionId: '01', orden: 2 },
    { id: '01-03', titulo: '3. Requisitos e Instalaciones Necesarias', seccionId: '01', orden: 3 },
    { id: '01-04', titulo: '4. Creando Nuestro Primer Proyecto', seccionId: '01', orden: 4 },
    
    // Sección 02
    { id: '02-03', titulo: '3. ¿Qué es Astro? (2 min)', seccionId: '02', orden: 3 },
    { id: '02-04', titulo: '4. Creando Nuestro Proyecto (Windows) (5 min)', seccionId: '02', orden: 4 },
    { id: '02-05', titulo: '5. Creando Nuestro Proyecto (Mac) (4 min)', seccionId: '02', orden: 5 },
    { id: '02-06', titulo: '6. El Frontmatter de Astro y pasar variables hacia el HTML (7 min)', seccionId: '02', orden: 6 },
    { id: '02-07', titulo: '7. Pages o Páginas en Astro y routing (9 min)', seccionId: '02', orden: 7 },
    { id: '02-08', titulo: '8. Añadiendo Tailwind al Proyecto (4 min)', seccionId: '02', orden: 8 },
    { id: '02-09', titulo: '9. Layouts en Astro (10 min)', seccionId: '02', orden: 9 },
    { id: '02-10', titulo: '10. Componentes en Astro (12 min)', seccionId: '02', orden: 10 },
    { id: '02-11', titulo: '11. Props en Componentes (10 min)', seccionId: '02', orden: 11 },
    { id: '02-12', titulo: '12. Añadiendo Interfaces a Props para mejor DX (14 min)', seccionId: '02', orden: 12 },
    { id: '02-13', titulo: '13. Assets y Public ¿Donde colocar las imágenes en Astro? (5 mins)', seccionId: '02', orden: 13 },
    { id: '02-14', titulo: '14. El componente Image de Astro (6 mins.)', seccionId: '02', orden: 14 },
  ]);

  // 3. Semillar ProgresoLeccion
  await db.insert(ProgresoLeccion).values([
    // Sección 01 (completada al 100%)
    { seccionSlug: '01_introduccion', leccionId: '01-01' },
    { seccionSlug: '01_introduccion', leccionId: '01-02' },
    { seccionSlug: '01_introduccion', leccionId: '01-03' },
    { seccionSlug: '01_introduccion', leccionId: '01-04' },
    
    // Sección 02 (completada hasta la lección 11)
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
