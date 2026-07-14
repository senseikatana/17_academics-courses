import type { APIRoute } from 'astro';
import fs from 'fs';
import path from 'path';

export const prerender = false;

// Helper to slugify titles for filenames
function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove accents
    .replace(/\s+/g, '-')           // replace spaces with -
    .replace(/[^\w\-]+/g, '')       // remove all non-word chars
    .replace(/\-\-+/g, '-')         // replace multiple - with single -
    .replace(/^-+/, '')             // trim - from start
    .replace(/-+$/, '');            // trim - from end
}

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify({ message: "El endpoint de creación está activo en modo desarrollo." }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { tipo } = body;

    if (tipo === 'seccion') {
      const { id, titulo, slug, orden } = body;
      if (!id || !titulo || !slug || orden === undefined) {
        return new Response(JSON.stringify({ error: "Faltan campos obligatorios para la sección." }), { status: 400 });
      }

      const fileName = `${slug}.md`;
      const filePath = path.join(process.cwd(), 'src/content/secciones', fileName);

      const content = `---
id: "${id}"
titulo: "${titulo}"
slug: "${slug}"
orden: ${Number(orden)}
---
`;

      fs.writeFileSync(filePath, content, 'utf8');
      return new Response(JSON.stringify({ success: true, message: `Sección creada en ${fileName}` }), { status: 200 });

    } else if (tipo === 'leccion') {
      const { seccionId, lessonNumber, titulo, duracion } = body;
      if (!seccionId || !lessonNumber || !titulo) {
        return new Response(JSON.stringify({ error: "Faltan campos obligatorios para la lección." }), { status: 400 });
      }

      const lessonPad = String(lessonNumber).padStart(2, '0');
      const fullTitle = `${lessonNumber}. ${titulo}${duracion ? ` (${duracion})` : ''}`;
      const slugifiedTitle = slugify(titulo);
      const fileName = `${seccionId}-${lessonPad}_${slugifiedTitle}.md`;
      const filePath = path.join(process.cwd(), 'src/content/lecciones', fileName);

      const content = `---
id: "${seccionId}-${lessonPad}"
titulo: "${fullTitle}"
seccionId: "${seccionId}"
orden: ${Number(lessonNumber)}
---
`;

      fs.writeFileSync(filePath, content, 'utf8');
      return new Response(JSON.stringify({ success: true, message: `Lección creada en ${fileName}` }), { status: 200 });
    }

    return new Response(JSON.stringify({ error: "Tipo de creación no reconocido." }), { status: 400 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
