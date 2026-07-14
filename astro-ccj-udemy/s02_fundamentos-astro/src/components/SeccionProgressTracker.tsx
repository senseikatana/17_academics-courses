import { useState } from 'react';

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
  const [completed, setCompleted] = useState<string[]>(initialCompleted);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  const total = lecciones.length;
  const hechas = completed.length;
  const pct = total > 0 ? Math.round((hechas / total) * 100) : 0;
  const isAllCompleted = total > 0 && hechas >= total;

  const handleToggle = async (id: string, checked: boolean) => {
    setIsUpdating(id);
    try {
      const res = await fetch('/api/progreso', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ seccionSlug, leccionId: id, completada: checked })
      });
      if (res.ok) {
        if (checked) {
          setCompleted((prev) => [...prev, id]);
          window.dispatchEvent(new CustomEvent('progreso-update'));
        } else {
          setCompleted((prev) => prev.filter((item) => item !== id));
          window.dispatchEvent(new CustomEvent('progreso-update'));
        }
      }
    } catch (err) {
      console.error('Error al guardar el progreso:', err);
    } finally {
      setIsUpdating(null);
    }
  };

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
          const isChecked = completed.includes(leccion.id);
          return (
            <li
              key={leccion.id}
              className={`card leccion-item flex items-center gap-3 ${isChecked ? 'border-completed' : ''}`}
            >
              <input
                type="checkbox"
                id={`chk-${leccion.id}`}
                checked={isChecked}
                disabled={isUpdating === leccion.id}
                onChange={(e) => handleToggle(leccion.id, e.target.checked)}
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
