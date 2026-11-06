import styles from './Loader.module.css';

export function Loader({ label = 'Cargando…' }) {
  return (
    <div className={styles.loader} role="status">
      <span className={styles.dot} />
      <span className={styles.dot} />
      <span className={styles.dot} />
      <span className="visually-hidden">{label}</span>
    </div>
  );
}
