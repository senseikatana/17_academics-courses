import { defineDb, defineTable, column } from 'astro:db';

const ProgresoLeccion = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    seccionSlug: column.text(),
    leccionId: column.text(),
  }
});

export default defineDb({
  tables: {
    ProgresoLeccion,
  }
});
