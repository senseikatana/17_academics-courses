import { useEffect } from 'react';
import { useCourseStore } from '../store';

interface LeccionData {
  id: string;
  titulo: string;
}

interface Props {
  seccionSlug: string;
  lecciones: LeccionData[];
  initialCompleted: string[];
}

export default function SeccionProgressTracker({ seccionSlug, lecciones, initialCompleted }: Props) {
  const syncSectionProgress = useCourseStore((state) => state.syncSectionProgress);
  const completed = useCourseStore((state) => state.completedLessons[seccionSlug] ?? []);
  const updatingLessons = useCourseStore((state) => state.updatingLessons);
  const toggleLesson = useCourseStore((state) => state.toggleLesson);

  // Sincronizar el progreso de la sección con los datos del servidor al montar la isla
  useEffect(() => {
    syncSectionProgress(seccionSlug, initialCompleted);
  }, [seccionSlug, initialCompleted, syncSectionProgress]);

  const total = lecciones.length;
  // Usar el estado de Zustand; si no ha cargado aún, usar los datos SSR iniciales
  const listCompletadas = useCourseStore.getState().completedLessons[seccionSlug] !== undefined
    ? completed
    : initialCompleted;

  const hechas = listCompletadas.length;
  const pct = total > 0 ? Math.round((hechas / total) * 100) : 0;
  const isAllCompleted = total > 0 && hechas >= total;

  return (
    <div>
      {/* Barra de progreso de la sección */}
      <div className={`card mt-4 ${isAllCompleted ? 'border-completed' : ''}`}>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-medium text-[var(--color-muted)]">Progreso</span>
          <span
            id="progreso-seccion-texto"
            className="text-xs font-medium"
            style={{ color: isAllCompleted ? 'var(--color-success-text)' : 'var(--color-primary)' }}
          >
            {hechas} / {total}
          </span>
        </div>
        <div className="w-full h-2 bg-[var(--color-border)] rounded-full overflow-hidden">
          <div
            id="progreso-seccion-barra"
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${pct}%`,
              backgroundColor: isAllCompleted ? 'var(--color-success)' : 'var(--color-primary)'
            }}
          ></div>
        </div>
      </div>

      {/* Lista de lecciones */}
      <ul className="space-y-2 mt-8" id="lista-lecciones">
        {lecciones.map((leccion) => {
          const isChecked = listCompletadas.includes(leccion.id);
          const isUpdating = !!updatingLessons[leccion.id];

          return (
            <li
              key={leccion.id}
              className={`card leccion-item flex items-center gap-3 ${isChecked ? 'border-completed' : ''}`}
            >
              <input
                type="checkbox"
                id={`chk-${leccion.id}`}
                checked={isChecked}
                disabled={isUpdating}
                onChange={(e) => toggleLesson(seccionSlug, leccion.id, e.target.checked)}
                className="w-5 h-5 rounded border-[var(--color-border)] text-[var(--color-success)]
                          focus:ring-[var(--color-success)] cursor-pointer
                          accent-[var(--color-success)] transition-transform duration-200 hover:scale-110"
              />
              <label
                htmlFor={`chk-${leccion.id}`}
                className="flex-1 text-sm sm:text-base cursor-pointer
                          select-none leading-snug transition-colors duration-300 leccion-label"
                style={{ color: isChecked ? 'var(--color-success-text)' : 'var(--color-text)' }}
              >
                {leccion.titulo}
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
