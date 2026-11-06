import styles from './Marquee.module.css';

// A tilted black band with words that run on a loop. The list is drawn twice so the loop has no gap.
export function Marquee({ words }) {
  const row = (hidden) => (
    <ul className={styles.row} aria-hidden={hidden || undefined}>
      {words.map((word) => (
        <li key={word} className={styles.word}>{word}</li>
      ))}
    </ul>
  );

  return (
    <div className={styles.marquee}>
      <div className={styles.band}>
        <div className={styles.track}>
          {row(false)}
          {row(true)}
        </div>
      </div>
    </div>
  );
}
