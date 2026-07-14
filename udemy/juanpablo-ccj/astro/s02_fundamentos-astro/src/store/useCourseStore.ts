import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CourseState {
  // Mapa de seccionSlug -> lista de leccionIds completadas
  completedLessons: Record<string, string[]>;
  // Mapa de leccionId -> boolean para indicar si se está guardando en el servidor
  updatingLessons: Record<string, boolean>;
  
  // Sincronizar el progreso de una sección (fusionar datos del servidor y localStorage)
  syncSectionProgress: (seccionSlug: string, serverCompleted: string[]) => Promise<void>;
  
  // Conmutar el estado de completado de una lección y guardarlo en la base de datos
  toggleLesson: (seccionSlug: string, leccionId: string, checked: boolean) => Promise<boolean>;
}

export const useCourseStore = create<CourseState>()(
  persist(
    (set, get) => ({
      completedLessons: {},
      updatingLessons: {},

      syncSectionProgress: async (seccionSlug, serverCompleted) => {
        const localCompleted = get().completedLessons[seccionSlug] || [];
        
        // Determinar qué elementos están en local pero no en el servidor
        const toAdd = localCompleted.filter((id) => !serverCompleted.includes(id));

        // Si hay discrepancias, las sincronizamos con el servidor para curar la base de datos
        if (toAdd.length > 0) {
          const merged = Array.from(new Set([...localCompleted, ...serverCompleted]));
          
          set((state) => ({
            completedLessons: {
              ...state.completedLessons,
              [seccionSlug]: merged,
            },
          }));

          // Sincronizar de forma asíncrona con el servidor en segundo plano
          for (const id of toAdd) {
            try {
              await fetch('/api/progreso', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ seccionSlug, leccionId: id, completada: true }),
              });
            } catch (err) {
              console.error(`Error al sincronizar adición de ${id}:`, err);
            }
          }
        } else {
          // Si no hay discrepancias, nos aseguramos de estar alineados con el servidor
          set((state) => ({
            completedLessons: {
              ...state.completedLessons,
              [seccionSlug]: serverCompleted,
            },
          }));
        }
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
    }),
    {
      name: 'astro-wordpress-course-progress', // Llave para localStorage
      partialize: (state) => ({ completedLessons: state.completedLessons }), // Solo persistir completedLessons
    }
  )
);
