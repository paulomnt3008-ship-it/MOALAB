import styles from './Footer.module.css';

// The name comes back at full width to close the page.
export function Footer({ content }) {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <p className={styles.note}>{content.note}</p>
          <ul className={styles.links}>
            {content.links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={styles.link}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <p className={styles.wordmark} aria-hidden="true">
          {[...content.wordmark].map((letter, index) => (
            <span key={`${letter}-${index}`} className={styles.letter}>{letter}</span>
          ))}
        </p>

        <p className={styles.copyright}>{content.copyright}</p>
      </div>
    </footer>
  );
}
