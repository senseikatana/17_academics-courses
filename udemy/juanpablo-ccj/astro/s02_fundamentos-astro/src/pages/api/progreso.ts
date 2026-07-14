import type { APIRoute } from 'astro';
import { db, ProgresoLeccion, and, eq } from 'astro:db';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { seccionSlug, leccionId, completada } = await request.json();
    const cursoId = 'astro-ccj-udemy';

    if (!seccionSlug || !leccionId) {
      return new Response(JSON.stringify({ error: 'Faltan parámetros requeridos.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Asegurar el prefijo del curso en el ID de la lección
    const dbLeccionId = leccionId.startsWith(cursoId) ? leccionId : `${cursoId}-${leccionId}`;

    if (completada) {
      // Verificar si ya existe
      const existing = await db
        .select()
        .from(ProgresoLeccion)
        .where(
          and(
            eq(ProgresoLeccion.cursoId, cursoId),
            eq(ProgresoLeccion.seccionSlug, seccionSlug),
            eq(ProgresoLeccion.leccionId, dbLeccionId)
          )
        );

      if (existing.length === 0) {
        await db.insert(ProgresoLeccion).values({ cursoId, seccionSlug, leccionId: dbLeccionId });
      }
    } else {
      // Eliminar el registro
      await db
        .delete(ProgresoLeccion)
        .where(
          and(
            eq(ProgresoLeccion.cursoId, cursoId),
            eq(ProgresoLeccion.seccionSlug, seccionSlug),
            eq(ProgresoLeccion.leccionId, dbLeccionId)
          )
        );
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
