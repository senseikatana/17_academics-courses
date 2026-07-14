import type { APIRoute } from 'astro';
import { db, ProgresoLeccion, and, eq } from 'astro:db';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { seccionSlug, leccionId, completada } = await request.json();

    if (!seccionSlug || !leccionId) {
      return new Response(JSON.stringify({ error: 'Faltan parámetros requeridos.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (completada) {
      // Verificar si ya existe
      const existing = await db
        .select()
        .from(ProgresoLeccion)
        .where(
          and(
            eq(ProgresoLeccion.seccionSlug, seccionSlug),
            eq(ProgresoLeccion.leccionId, leccionId)
          )
        );

      if (existing.length === 0) {
        await db.insert(ProgresoLeccion).values({ seccionSlug, leccionId });
      }
    } else {
      // Eliminar el registro
      await db
        .delete(ProgresoLeccion)
        .where(
          and(
            eq(ProgresoLeccion.seccionSlug, seccionSlug),
            eq(ProgresoLeccion.leccionId, leccionId)
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
