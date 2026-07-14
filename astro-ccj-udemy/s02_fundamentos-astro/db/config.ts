import { defineDb, defineTable, column } from 'astro:db';

const Seccion = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    titulo: column.text(),
    slug: column.text(),
    orden: column.number(),
  }
});

const Leccion = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    titulo: column.text(),
    seccionId: column.text({ references: () => Seccion.columns.id }),
    orden: column.number(),
  }
});

const ProgresoLeccion = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    seccionSlug: column.text(),
    leccionId: column.text({ references: () => Leccion.columns.id }),
  }
});

export default defineDb({
  tables: {
    Seccion,
    Leccion,
    ProgresoLeccion,
  }
});
