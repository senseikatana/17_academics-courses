import { defineDb, defineTable, column } from 'astro:db';

const Curso = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    titulo: column.text(),
    instructor: column.text(),
    plataforma: column.text(),
    slug: column.text(),
  }
});

const Seccion = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    cursoId: column.text({ references: () => Curso.columns.id }),
    titulo: column.text(),
    slug: column.text(),
    orden: column.number(),
  }
});

const Leccion = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    seccionId: column.text({ references: () => Seccion.columns.id }),
    titulo: column.text(),
    orden: column.number(),
  }
});

const ProgresoLeccion = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    cursoId: column.text({ references: () => Curso.columns.id }),
    seccionSlug: column.text(),
    leccionId: column.text({ references: () => Leccion.columns.id }),
  }
});

export default defineDb({
  tables: {
    Curso,
    Seccion,
    Leccion,
    ProgresoLeccion,
  }
});
