import { useEffect, useRef } from 'react';
import styles from './Modal.module.css';

// Uses the native <dialog>, so focus and the Escape key work out of the box.
export function Modal({ open, onClose, title, children }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const handleClick = (event) => {
    if (event.target === dialogRef.current) onClose();
  };

  return (
    <dialog ref={dialogRef} className={styles.dialog} onClose={onClose} onClick={handleClick} aria-labelledby="modal-title">
      <div className={styles.panel}>
        <div className={styles.header}>
          <h2 id="modal-title" className={styles.title}>{title}</h2>
          <button type="button" className={styles.close} onClick={onClose} aria-label="Cerrar">×</button>
        </div>
        {children}
      </div>
    </dialog>
  );
}
