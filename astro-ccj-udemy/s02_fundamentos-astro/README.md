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
