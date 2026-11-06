import { useId } from 'react';
import styles from './Input.module.css';

export function Input({ label, error, hint, multiline = false, className = '', ...rest }) {
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy = [hint ? hintId : '', error ? errorId : ''].filter(Boolean).join(' ') || undefined;
  const Field = multiline ? 'textarea' : 'input';

  return (
    <div className={`${styles.field} ${className}`}>
      <label className={styles.label} htmlFor={id}>{label}</label>
      <Field
        id={id}
        className={`${styles.control} ${error ? styles.invalid : ''}`}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        rows={multiline ? 3 : undefined}
        {...rest}
      />
      {hint && <p id={hintId} className={styles.hint}>{hint}</p>}
      {error && <p id={errorId} className={styles.error}>{error}</p>}
    </div>
  );
}
