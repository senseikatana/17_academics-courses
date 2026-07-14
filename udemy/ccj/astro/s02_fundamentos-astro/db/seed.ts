import { db, Curso, Seccion, Leccion, ProgresoLeccion } from 'astro:db';

export default async function seed() {
  // 1. Semillar Cursos
  await db.insert(Curso).values([
    {
      id: 'astro-ccj-udemy',
      titulo: 'Aprende Astro y Headless WordPress desde Cero con Proyectos',
      instructor: 'Juan Pablo de la Torre',
      plataforma: 'Udemy',
      slug: 'astro-ccj-udemy'
    }
  ]);

  // 2. Semillar Secciones
  await db.insert(Seccion).values([
    { id: 'astro-ccj-udemy-01', cursoId: 'astro-ccj-udemy', titulo: 'Introducción', slug: '01_introduccion', orden: 1 },
    { id: 'astro-ccj-udemy-02', cursoId: 'astro-ccj-udemy', titulo: 'Fundamentos de Astro', slug: '02_fundamentos', orden: 2 },
  ]);

  // 3. Semillar Lecciones
  await db.insert(Leccion).values([
    // Sección 01
    { id: 'astro-ccj-udemy-01-01', seccionId: 'astro-ccj-udemy-01', titulo: '1. ¿Qué es Astro y por qué usarlo?', orden: 1 },
    { id: 'astro-ccj-udemy-01-02', seccionId: 'astro-ccj-udemy-01', titulo: '2. ¿Qué es Headless WordPress?', orden: 2 },
    { id: 'astro-ccj-udemy-01-03', seccionId: 'astro-ccj-udemy-01', titulo: '3. Requisitos e Instalaciones Necesarias', orden: 3 },
    { id: 'astro-ccj-udemy-01-04', seccionId: 'astro-ccj-udemy-01', titulo: '4. Creando Nuestro Primer Proyecto', orden: 4 },
    
    // Sección 02
    { id: 'astro-ccj-udemy-02-03', seccionId: 'astro-ccj-udemy-02', titulo: '3. ¿Qué es Astro? (2 min)', orden: 3 },
    { id: 'astro-ccj-udemy-02-04', seccionId: 'astro-ccj-udemy-02', titulo: '4. Creando Nuestro Proyecto (Windows) (5 min)', orden: 4 },
    { id: 'astro-ccj-udemy-02-05', seccionId: 'astro-ccj-udemy-02', titulo: '5. Creando Nuestro Proyecto (Mac) (4 min)', orden: 5 },
    { id: 'astro-ccj-udemy-02-06', seccionId: 'astro-ccj-udemy-02', titulo: '6. El Frontmatter de Astro y pasar variables hacia el HTML (7 min)', orden: 6 },
    { id: 'astro-ccj-udemy-02-07', seccionId: 'astro-ccj-udemy-02', titulo: '7. Pages o Páginas en Astro y routing (9 min)', orden: 7 },
    { id: 'astro-ccj-udemy-02-08', seccionId: 'astro-ccj-udemy-02', titulo: '8. Añadiendo Tailwind al Proyecto (4 min)', orden: 8 },
    { id: 'astro-ccj-udemy-02-09', seccionId: 'astro-ccj-udemy-02', titulo: '9. Layouts en Astro (10 min)', orden: 9 },
    { id: 'astro-ccj-udemy-02-10', seccionId: 'astro-ccj-udemy-02', titulo: '10. Componentes en Astro (12 min)', orden: 10 },
    { id: 'astro-ccj-udemy-02-11', seccionId: 'astro-ccj-udemy-02', titulo: '11. Props en Componentes (10 min)', orden: 11 },
    { id: 'astro-ccj-udemy-02-12', seccionId: 'astro-ccj-udemy-02', titulo: '12. Añadiendo Interfaces a Props para mejor DX (14 min)', orden: 12 },
    { id: 'astro-ccj-udemy-02-13', seccionId: 'astro-ccj-udemy-02', titulo: '13. Assets y Public ¿Donde colocar las imágenes en Astro? (5 mins)', orden: 13 },
    { id: 'astro-ccj-udemy-02-14', seccionId: 'astro-ccj-udemy-02', titulo: '14. El componente Image de Astro (6 mins.)', orden: 14 },
  ]);

  // 4. Semillar ProgresoLeccion
  await db.insert(ProgresoLeccion).values([
    // Sección 01 (completada al 100%)
    { cursoId: 'astro-ccj-udemy', seccionSlug: '01_introduccion', leccionId: 'astro-ccj-udemy-01-01' },
    { cursoId: 'astro-ccj-udemy', seccionSlug: '01_introduccion', leccionId: 'astro-ccj-udemy-01-02' },
    { cursoId: 'astro-ccj-udemy', seccionSlug: '01_introduccion', leccionId: 'astro-ccj-udemy-01-03' },
    { cursoId: 'astro-ccj-udemy', seccionSlug: '01_introduccion', leccionId: 'astro-ccj-udemy-01-04' },
    
    // Sección 02 (completada hasta la lección 11)
    { cursoId: 'astro-ccj-udemy', seccionSlug: '02_fundamentos', leccionId: 'astro-ccj-udemy-02-03' },
    { cursoId: 'astro-ccj-udemy', seccionSlug: '02_fundamentos', leccionId: 'astro-ccj-udemy-02-04' },
    { cursoId: 'astro-ccj-udemy', seccionSlug: '02_fundamentos', leccionId: 'astro-ccj-udemy-02-05' },
    { cursoId: 'astro-ccj-udemy', seccionSlug: '02_fundamentos', leccionId: 'astro-ccj-udemy-02-06' },
    { cursoId: 'astro-ccj-udemy', seccionSlug: '02_fundamentos', leccionId: 'astro-ccj-udemy-02-07' },
    { cursoId: 'astro-ccj-udemy', seccionSlug: '02_fundamentos', leccionId: 'astro-ccj-udemy-02-08' },
    { cursoId: 'astro-ccj-udemy', seccionSlug: '02_fundamentos', leccionId: 'astro-ccj-udemy-02-09' },
    { cursoId: 'astro-ccj-udemy', seccionSlug: '02_fundamentos', leccionId: 'astro-ccj-udemy-02-10' },
    { cursoId: 'astro-ccj-udemy', seccionSlug: '02_fundamentos', leccionId: 'astro-ccj-udemy-02-11' },
  ]);
}
