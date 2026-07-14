# 🎓 Sección 02: Fundamentos de Astro

Este proyecto corresponde a la **Sección 02: Fundamentos de Astro** del curso de Udemy *"Aprende Astro y Headless WordPress desde Cero con Proyectos"*. Sirve para registrar y persistir las lecciones completadas, calculando automáticamente el progreso individual de la sección y el avance global del curso.

---

## ✨ Características Principales

1. **🌗 Cambiador de Tema (Theme Switcher)**
   - Soporte para modo claro y modo oscuro.
   - Sincronización e hidratación inmediata para evitar destellos blancos (*flashing*) en la carga inicial.
   - Persistencia automática de las preferencias en `localStorage`.
   - Compatibilidad total con la navegación por transiciones del cliente de Astro (`astro:page-load`).
   - Atajo de teclado global: cambia el tema presionando `Ctrl + L`.

2. **📊 Rastreo de Lecciones y Progreso con Astro DB y SSR**
   - Persistencia robusta en el servidor mediante **Astro DB** con base de datos SQLite local para desarrollo y soporte de libSQL.
   - Sincronización en tiempo real a través de endpoints de API dinámica (`/api/progreso`).
   - Reactividad inmediata implementada en el cliente con **React** bajo el modelo de **Astro Islands (Isla de Astro)** hidratada (`SeccionProgressTracker.tsx`).
   - Renderizado del lado del servidor (**SSR**) con el adaptador `@astrojs/node` que asegura que el HTML inicial ya contenga las tarjetas pintadas y el progreso real.

3. **🎨 Estética y Diseño Moderno**
   - **Paletas Nativas de Tailwind CSS**: Mapeo completo en `global.css` usando tonalidades Slate, Indigo, Pink, Green (éxito), Amber (advertencia) y Red (error).
   - **Bento Grid**: Tarjetas limpias de color sólido (`bg-[var(--color-card)]`) con bordes sutiles y sombreados suaves que optimizan la lectura y jerarquía.
   - **Estado Completado Enriquecido**: Cuando una sección o lección se completa, toda la tarjeta (bordes de 2px, títulos, textos y barras de progreso) adopta colores verdes integrados con el cambio de tema para evitar destellos y Layout Shift.

4. **⚙️ Estructura del Código y TypeScript**
   - **Content Collections**: Gestión de datos de `curso`, `secciones` y `lecciones` a través del sistema de colecciones estáticas de Astro con validaciones de esquema con Zod ([src/content.config.ts](file:///home/senseikatana/Proyectos/17_academics-courses/astro-ccj-udemy/s02_fundamentos-astro/src/content.config.ts)).
   - **Carpeta de Tipos Unificada**: Todo el tipado estricto se encuentra bajo la carpeta `src/types/` ([course.ts](file:///home/senseikatana/Proyectos/17_academics-courses/astro-ccj-udemy/s02_fundamentos-astro/src/types/course.ts) y [layout.ts](file:///home/senseikatana/Proyectos/17_academics-courses/astro-ccj-udemy/s02_fundamentos-astro/src/types/layout.ts)).
   - **Patrón Barrel (Archivos index.ts)**: Se implementó exportación barrel en todos los directorios principales (`components`, `layouts`, `data`, `types`) para simplificar y limpiar las importaciones del proyecto. Se excluye la carpeta `pages` para evitar conflictos en el enrutamiento físico de Astro y `content` para no interferir con las colecciones.
   - **Gestor de Paquetes**: Uso de **pnpm** para un manejo rápido y eficiente de las dependencias.

---

## 📂 Estructura del Proyecto

```text
├── db/                  # Configuración y semillado de Astro DB
│   ├── config.ts        # Definición de tablas (ProgresoLeccion)
│   └── seed.ts          # Semillado de progreso del estudiante
├── src/
│   ├── components/          # Componentes de UI
│   │   ├── index.ts         # Barrel de componentes
│   │   ├── ThemeSwitcher.astro
│   │   └── SeccionProgressTracker.tsx # React Island para interactividad
│   ├── content/             # Datos del curso (Markdown)
│   │   ├── curso/
│   │   ├── lecciones/       # Lecciones (Secciones 1 y 2)
│   │   └── secciones/       # Metadatos de Secciones
│   ├── data/                # Datos auxiliares
│   │   └── index.ts         # Barrel de datos
│   ├── layouts/             # Plantillas base de página
│   │   ├── index.ts         # Barrel de layouts
│   │   └── BaseLayout.astro
│   ├── pages/               # Páginas y enrutamiento (Excluidos de Barrel)
│   │   ├── api/
│   │   │   ├── crear.ts     # API local para crear archivos Markdown
│   │   │   └── progreso.ts  # API local para registrar progreso en Astro DB
│   │   ├── index.astro      # Cuadro de mandos principal (Bento Grid)
│   │   └── secciones/
│   │       └── [slug].astro # Vista detallada de lecciones de la sección
│   ├── styles/              # Hojas de estilo globales
│   │   └── global.css
│   └── types/               # Tipados TypeScript
│       ├── index.ts         # Barrel de tipos
│       ├── course.ts        # Tipos de contenido (Curso, Sección, Lección)
│       └── layout.ts        # Tipos de layout props
```
## 🛠️ Historial de Tareas y Cambios Realizados

A continuación se detallan las tareas, mejoras y correcciones aplicadas al proyecto en esta sesión:

1. **🌗 Corrección e Integración del Cambiador de Tema (Theme Switcher)**
   - Corregida la pérdida de eventos `onclick` al navegar con View Transitions mediante el registro en `astro:page-load`.
   - Implementado atajo de teclado global `Ctrl + L` para alternar entre temas rápidamente.
   - Guardado y recuperación del estado del tema en `localStorage` bajo la llave `theme-preference`.

2. **📈 Motor de Progreso Dinámico y Sincronización**
   - Implementado cálculo reactivo de progreso porcentual individual por sección y progreso global de avance en el bento grid de la página principal.
   - Sincronizado automáticamente el progreso real del estudiante (Sección 01 completada al 100% y Sección 02 completada hasta la lección 11) en `localStorage` al iniciar la app.
   - Persistencia completa y en tiempo real del estado de cada checkbox bajo el namespace `progreso-astro-wordpress-[slug]`, reactivo a cambios en múltiples pestañas del navegador.

3. **➕ Creador de Contenidos Local (API & Formulario)**
   - Diseñado un endpoint API local en `src/pages/api/crear.ts` (con soporte para compilaciones estáticas de Astro mediante adaptador de Node y opción `prerender = false`).
   - Creado el componente de botón flotante y modal emergente `CreatorButton.astro` que permite registrar secciones y lecciones físicamente en disco (en formato Markdown en `src/content/`) directamente desde la interfaz web sin manipular archivos manualmente.

4. **🎨 Diseño y Estética con Paletas Nativas de Tailwind**
   - Convertidos todos los colores hexadecimales a formato flexible `hsla()` en `global.css`.
   - Mapeado el diseño a la paleta nativa de Tailwind CSS (Slate para grises, Indigo para primarios, Pink para secundarios, Green para éxito, Amber para advertencias y Red para errores).
   - Establecido un borde estático de `2px` en todas las tarjetas para evitar saltos bruscos de maquetación (Layout Shift) al cambiar de estado.
   - Diseñado un estado completado enriquecido en verde: al alcanzar el 100% de progreso o marcar una lección, toda la tarjeta (textos, títulos, barras y checkboxes) adopta variantes armónicas de verde (`green-50` / `green-950` de fondo, `green-800` / `green-200` de texto).
   - Aplicado la propiedad de CSS moderno `accent-color` para teñir los checkboxes de verde success al estar seleccionados.

5. **🔍 Tipado y Limpieza de Errores (TypeScript & Linter)**
   - Añadidas dependencias de desarrollo (`@astrojs/check`, `typescript@~5.7.0`, `@types/node`).
   - Resueltos el 100% de los errores del compilador (`astro check` retorna 0 errores, 0 warnings).
   - Corregidos errores de referencias nulas (`modal possibly null`) en los scripts de la UI.
   - Depurada la carpeta `.agents/`, eliminando archivos mal formateados y configurando 5 perfiles de agentes de IA especializados en el stack del proyecto (`astro-specialist`, `tailwind-styling-expert`, `wordpress-integration-agent`, `content-manager-agent` y `typescript-type-safety-agent`).

6. **📁 Estructura Limpia del Plan de Estudios**
   - Eliminados todos los archivos Markdown de lecciones y secciones que servían como ejemplo o que corresponden a clases no alcanzadas aún por el estudiante.
   - Añadidos enlaces directos relativos en este README.md para acceder y editar rápidamente los archivos locales del plan de estudios.
   - Limpieza de ramas en git (worktree removido y rama local de desarrollo `opencode/lucky-river` borrada).

7. **🗄️ Migración a Astro DB, React Island y SSR (Servidor Híbrido/Dinámico)**
   - Migración completa de persistencia desde `localStorage` en cliente hacia **Astro DB** en servidor.
   - Integración de **React** y creación de la isla hidratada `SeccionProgressTracker.tsx` que maneja el listado de lecciones y la barra de progreso de forma interactiva y sin Layout Shifts.
   - Desarrollo del endpoint API `/api/progreso` para registrar y revertir el estado de completado en la tabla SQLite de Astro DB.
   - Configuración de compilación transparente (zero-config) en `astro.config.mjs` que establece automáticamente `process.env.ASTRO_DATABASE_FILE = 'local.db'` para builds locales en producción sin necesidad de especificar variables de entorno de forma manual.
   - Migración definitiva de dependencias de `bun` a **pnpm**.

---

## 🧞 Comandos de Desarrollo

Todos los comandos se ejecutan desde la raíz del proyecto usando `pnpm`:

| Comando | Acción |
| :--- | :--- |
| `pnpm install` | Instala las dependencias necesarias. |
| `pnpm run dev` | Inicia el servidor de desarrollo local en `localhost:4321`. |
| `pnpm exec astro dev --background` | Arranca el servidor de desarrollo de Astro en segundo plano. |
| `pnpm exec astro dev stop` | Detiene el servidor de desarrollo en segundo plano. |
| `pnpm exec astro dev status` | Verifica el estado del servidor en segundo plano. |
| `pnpm run build` | Compila el servidor de producción de Astro en la carpeta `./dist/` usando la DB local. |
| `pnpm run preview` | Previsualiza localmente el build de producción generado. |

---

## 📝 Contenido de las Secciones y Lecciones

A continuación se detallan los enlaces a los archivos físicos de cada sección y lección registrados en el proyecto:

### 📦 [Sección 01: Introducción](src/content/secciones/01_introduccion.md)
- [Lección 1: ¿Qué es Astro?](src/content/lecciones/01-01_que-es-astro.md)
- [Lección 2: Headless WordPress](src/content/lecciones/01-02_headless-wordpress.md)
- [Lección 3: Requisitos de Instalación](src/content/lecciones/01-03_requisitos-instalacion.md)
- [Lección 4: Primer Proyecto](src/content/lecciones/01-04_primer-proyecto.md)

### 📦 [Sección 02: Fundamentos de Astro](src/content/secciones/02_fundamentos.md)
- [Lección 3: ¿Qué es Astro?](src/content/lecciones/02-03_que-es-astro.md)
- [Lección 4: Creando Nuestro Proyecto (Windows)](src/content/lecciones/02-04_creando-proyecto-windows.md)
- [Lección 5: Creando Nuestro Proyecto (Mac)](src/content/lecciones/02-05_creando-proyecto-mac.md)
- [Lección 6: El Frontmatter de Astro y pasar variables hacia el HTML](src/content/lecciones/02-06_frontmatter-astro-variables.md)
- [Lección 7: Pages o Páginas en Astro y routing](src/content/lecciones/02-07_pages-paginas-routing.md)
- [Lección 8: Añadiendo Tailwind al Proyecto](src/content/lecciones/02-08_anadiendo-tailwind.md)
- [Lección 9: Layouts en Astro](src/content/lecciones/02-09_layouts-astro.md)
- [Lección 10: Componentes en Astro](src/content/lecciones/02-10_componentes-astro.md)
- [Lección 11: Props en Componentes](src/content/lecciones/02-11_props-componentes.md)
- [Lección 12: Añadiendo Interfaces a Props para mejor DX](src/content/lecciones/02-12_anadiendo-interfaces-props-dx.md)
