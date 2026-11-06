import styles from './Badge.module.css';

export function Badge({ children, tone = 'ink', label }) {
  return (
    <span className={`${styles.badge} ${styles[tone]}`} aria-label={label}>
      {children}
    </span>
  );
}
