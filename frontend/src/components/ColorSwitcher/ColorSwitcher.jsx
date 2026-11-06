import { useEffect, useId, useRef, useState } from 'react';
import styles from './ColorSwitcher.module.css';

// A button that opens the five background colours. Each swatch takes its colour
// from the data-background tokens in styles/variables.css.
export function ColorSwitcher({ options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const panelId = useId();
  const current = options.find((option) => option.id === value) ?? options[0];

  useEffect(() => {
    if (!open) return undefined;
    const handlePointer = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    };
    const handleKey = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', handlePointer);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('pointerdown', handlePointer);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open]);

  const choose = (id) => {
    onChange(id);
    setOpen(false);
  };

  return (
    <div className={styles.switcher} ref={rootRef}>
      <button
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={`Color de fondo: ${current.label}`}
        onClick={() => setOpen((previous) => !previous)}
      >
        <span className={styles.swatch} data-background={current.id} />
        <span className={styles.triggerLabel}>Fondo</span>
      </button>

      <div id={panelId} className={styles.panel} role="radiogroup" aria-label="Color de fondo" hidden={!open}>
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={option.id === value}
            className={styles.option}
            onClick={() => choose(option.id)}
          >
            <span className={styles.swatch} data-background={option.id} />
            <span>{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
