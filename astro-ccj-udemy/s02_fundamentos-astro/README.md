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

2. **📊 Rastreo de Lecciones y Progreso**
   - Selección dinámica de lecciones leídas mediante checkboxes.
   - Cálculo en tiempo real del progreso porcentual de cada sección.
   - Cálculo en tiempo real del porcentaje global completado del curso.
   - Persistencia instantánea del estado de las lecciones en `localStorage` (llaves formateadas por sección, ej: `progreso-astro-wordpress-02_fundamentos`).
   - Reactivo a múltiples pestañas gracias a la escucha activa del evento `storage`.

3. **🎨 Estética y Diseño Moderno**
   - **Fondos con degradados premium**:
     - *Modo Oscuro*: Degradado índigo-pizarra profundo y moderno (`linear-gradient(135deg, #2a3447 0%, #1a202c 100%)`).
     - *Modo Claro*: Degradado gris suave (`linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)`).
   - **Bento Grid**: Tarjetas limpias de color sólido (`bg-[var(--color-card)]`) con bordes sutiles y sombreados suaves que optimizan la lectura y jerarquía.
   - Animaciones micro-interactivas en el hover de las tarjetas y al marcar lecciones completadas.

4. **⚙️ Estructura del Código y TypeScript**
   - **Content Collections**: Gestión de datos de `curso`, `secciones` y `lecciones` a través del sistema de colecciones estáticas de Astro con validaciones de esquema con Zod ([src/content.config.ts](file:///home/senseikatana/Proyectos/17_academics-courses/astro-ccj-udemy/s02_fundamentos-astro/src/content.config.ts)).
   - **Carpeta de Tipos Unificada**: Todo el tipado estricto se encuentra bajo la carpeta `src/types/` ([course.ts](file:///home/senseikatana/Proyectos/17_academics-courses/astro-ccj-udemy/s02_fundamentos-astro/src/types/course.ts) y [layout.ts](file:///home/senseikatana/Proyectos/17_academics-courses/astro-ccj-udemy/s02_fundamentos-astro/src/types/layout.ts)).
   - **Patrón Barrel (Archivos index.ts)**: Se implementó exportación barrel en todos los directorios principales (`components`, `layouts`, `data`, `types`) para simplificar y limpiar las importaciones del proyecto. Se excluye la carpeta `pages` para evitar conflictos en el enrutamiento físico de Astro y `content` para no interferir con las colecciones.

---

## 📂 Estructura del Proyecto

```text
src/
├── components/          # Componentes de UI
│   ├── index.ts         # Barrel de componentes
│   └── ThemeSwitcher.astro
├── content/             # Datos del curso (Markdown)
│   ├── curso/
│   ├── lecciones/       # Lecciones (Secciones 1 a 11)
│   └── secciones/       # Metadatos de Secciones
├── data/                # Datos auxiliares
│   └── index.ts         # Barrel de datos
├── layouts/             # Plantillas base de página
│   ├── index.ts         # Barrel de layouts
│   └── BaseLayout.astro
├── pages/               # Páginas y enrutamiento (Excluidos de Barrel)
│   ├── index.astro      # Cuadro de mandos principal (Bento Grid)
│   └── secciones/
│       └── [slug].astro # Vista detallada de lecciones de la sección
├── styles/              # Hojas de estilo globales
│   └── global.css
└── types/               # Tipados TypeScript
    ├── index.ts         # Barrel de tipos
    ├── course.ts        # Tipos de contenido (Curso, Sección, Lección)
    └── layout.ts        # Tipos de layout props
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

---

## 🧞 Comandos de Desarrollo

Todos los comandos se ejecutan desde la raíz del proyecto usando `bun`:

| Comando | Acción |
| :--- | :--- |
| `bun install` | Instala las dependencias necesarias. |
| `bun dev` | Inicia el servidor de desarrollo local en `localhost:4321`. |
| `astro dev --background` | Arranca el servidor de desarrollo de Astro en segundo plano. |
| `astro dev stop` | Detiene el servidor de desarrollo en segundo plano. |
| `astro dev status` | Verifica el estado del servidor en segundo plano. |
| `bun build` | Compila la web estática de producción en la carpeta `./dist/`. |
| `bun preview` | Previsualiza localmente el build de producción generado. |

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
