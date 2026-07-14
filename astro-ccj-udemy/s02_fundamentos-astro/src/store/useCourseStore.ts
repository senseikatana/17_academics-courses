import { create } from 'zustand';

interface CourseState {
  // Mapa de seccionSlug -> lista de leccionIds completadas
  completedLessons: Record<string, string[]>;
  // Mapa de leccionId -> boolean para indicar si se está guardando en el servidor
  updatingLessons: Record<string, boolean>;
  
  // Inicializar el progreso de una sección específica
  initializeSection: (seccionSlug: string, initialCompleted: string[]) => void;
  
  // Conmutar el estado de completado de una lección y guardarlo en la base de datos
  toggleLesson: (seccionSlug: string, leccionId: string, checked: boolean) => Promise<boolean>;
}

export const useCourseStore = create<CourseState>((set, get) => ({
  completedLessons: {},
  updatingLessons: {},

  initializeSection: (seccionSlug, initialCompleted) => {
    set((state) => ({
      completedLessons: {
        ...state.completedLessons,
        [seccionSlug]: initialCompleted,
      },
    }));
  },

  toggleLesson: async (seccionSlug, leccionId, checked) => {
    if (get().updatingLessons[leccionId]) return false;

    set((state) => ({
      updatingLessons: {
        ...state.updatingLessons,
        [leccionId]: true,
      },
    }));

    try {
      const res = await fetch('/api/progreso', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ seccionSlug, leccionId, completada: checked }),
      });

      if (!res.ok) {
        throw new Error('Error al sincronizar con el servidor');
      }

      set((state) => {
        const currentCompleted = state.completedLessons[seccionSlug] || [];
        const nextCompleted = checked
          ? [...currentCompleted, leccionId]
          : currentCompleted.filter((id) => id !== leccionId);

        return {
          completedLessons: {
            ...state.completedLessons,
            [seccionSlug]: nextCompleted,
          },
        };
      });

      window.dispatchEvent(new CustomEvent('progreso-update'));
      return true;
    } catch (err) {
      console.error('Error al actualizar el progreso en la base de datos:', err);
      return false;
    } finally {
      set((state) => ({
        updatingLessons: {
          ...state.updatingLessons,
          [leccionId]: false,
        },
      }));
    }
  },
}));
