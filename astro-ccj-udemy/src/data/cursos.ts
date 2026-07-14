export interface Leccion {
  id: string;
  titulo: string;
  duracion?: string;
}

export interface Seccion {
  id: string;
  titulo: string;
  slug: string;
  lecciones: Leccion[];
}

export interface Curso {
  id: string;
  titulo: string;
  instructor: string;
  slug: string;
  secciones: Seccion[];
}

export const cursos: Curso[] = [
  {
    id: "astro-wordpress",
    titulo: "Aprende Astro y Headless WordPress desde Cero con Proyectos",
    instructor: "Juan Pablo de la Torre",
    slug: "astro-wordpress",
    secciones: [
      {
        id: "01",
        titulo: "Introducción",
        slug: "01_introduccion",
        lecciones: [
          { id: "01-01", titulo: "¿Qué es Astro y por qué usarlo?" },
          { id: "01-02", titulo: "¿Qué es Headless WordPress?" },
          { id: "01-03", titulo: "Requisitos e instalación del entorno" },
          { id: "01-04", titulo: "Primer proyecto con Astro" },
        ],
      },
      {
        id: "02",
        titulo: "Fundamentos de Astro",
        slug: "02_fundamentos",
        lecciones: [
          { id: "02-01", titulo: "Estructura de un proyecto Astro" },
          { id: "02-02", titulo: "Componentes Astro (.astro)" },
          { id: "02-03", titulo: "Páginas y rutas estáticas" },
          { id: "02-04", titulo: "Estilos con Tailwind CSS", completed: true },
          { id: "02-05", titulo: "Dark Mode y Theme Switcher" },
          { id: "02-06", titulo: "Layouts y slots" },
          { id: "02-07", titulo: "Curso Tracker con checkboxes" },
        ],
      },
      {
        id: "03",
        titulo: "Componentes y Templates",
        slug: "03_componentes",
        lecciones: [
          { id: "03-01", titulo: "Props y slots en componentes" },
          { id: "03-02", titulo: "Fragmentos y HTML dinámico" },
          { id: "03-03", titulo: "Estilos scoped vs globales" },
          { id: "03-04", titulo: "Scripts y manejo de eventos" },
        ],
      },
      {
        id: "04",
        titulo: "Routing y Navegación",
        slug: "04_routing",
        lecciones: [
          { id: "04-01", titulo: "Rutas dinámicas [param]" },
          { id: "04-02", titulo: "Rutas anidadas y catch-all" },
          { id: "04-03", titulo: "View Transitions entre páginas" },
          { id: "04-04", titulo: "Redirecciones y middleware" },
        ],
      },
      {
        id: "05",
        titulo: "Content Collections",
        slug: "05_content-collections",
        lecciones: [
          { id: "05-01", titulo: "¿Qué son Content Collections?" },
          { id: "05-02", titulo: "Definir esquemas con Zod" },
          { id: "05-03", titulo: "Consultar y renderizar colecciones" },
          { id: "05-04", titulo: "Blog con Content Collections" },
        ],
      },
      {
        id: "06",
        titulo: "Páginas Dinámicas y SSR",
        slug: "06_dinamic-pages",
        lecciones: [
          { id: "06-01", titulo: "Server-Side Rendering (SSR)" },
          { id: "06-02", titulo: "API Endpoints con Astro" },
          { id: "06-03", titulo: "Server Islands" },
          { id: "06-04", titulo: "Modo híbrido: estático + dinámico" },
        ],
      },
      {
        id: "07",
        titulo: "API Endpoints y Server Actions",
        slug: "07_api-endpoints",
        lecciones: [
          { id: "07-01", titulo: "Crear endpoints REST" },
          { id: "07-02", titulo: "Server Actions en formularios" },
          { id: "07-03", titulo: "Validación con Zod en Actions" },
          { id: "07-04", titulo: "Consumir APIs externas" },
        ],
      },
      {
        id: "08",
        titulo: "Autenticación y Autorización",
        slug: "08_autenticacion",
        lecciones: [
          { id: "08-01", titulo: "Registro e inicio de sesión" },
          { id: "08-02", titulo: "JWT y manejo de sesiones" },
          { id: "08-03", titulo: "Protección de rutas" },
          { id: "08-04", titulo: "OAuth con proveedores externos" },
        ],
      },
      {
        id: "09",
        titulo: "Integraciones: React y Vue",
        slug: "09_integraciones",
        lecciones: [
          { id: "09-01", titulo: "Añadir React a un proyecto Astro" },
          { id: "09-02", titulo: "Islas de React: interactividad parcial" },
          { id: "09-03", titulo: "Añadir Vue 3" },
          { id: "09-04", titulo: "Compartir estado entre frameworks" },
        ],
      },
      {
        id: "10",
        titulo: "Headless WordPress",
        slug: "10_headless-wordpress",
        lecciones: [
          { id: "10-01", titulo: "Configurar WordPress como Headless CMS" },
          { id: "10-02", titulo: "GraphQL vs REST API" },
          { id: "10-03", titulo: "Consumir contenido en Astro" },
          { id: "10-04", titulo: "Webhooks y revalidación" },
        ],
      },
      {
        id: "11",
        titulo: "Proyecto Final",
        slug: "11_proyecto-final",
        lecciones: [
          { id: "11-01", titulo: "Planificación del proyecto completo" },
          { id: "11-02", titulo: "Estructura y componentes" },
          { id: "11-03", titulo: "Integración con WordPress" },
          { id: "11-04", titulo: "Despliegue y producción" },
        ],
      },
    ],
  },
];

export function getSeccionPorSlug(
  cursoSlug: string,
  seccionSlug: string
): Seccion | undefined {
  const curso = cursos.find((c) => c.slug === cursoSlug);
  return curso?.secciones.find((s) => s.slug === seccionSlug);
}

export function getCursoPorSlug(slug: string): Curso | undefined {
  return cursos.find((c) => c.slug === slug);
}
