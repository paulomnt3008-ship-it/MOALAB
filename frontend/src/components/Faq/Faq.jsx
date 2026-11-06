import { useReveal } from '../../hooks/useReveal';
import styles from './Faq.module.css';

export function Faq({ content }) {
  const listRef = useReveal({ threshold: 0.1 });

  return (
    <section id={content.id} className={`${styles.faq} section`} aria-labelledby="faq-title">
      <div className={`${styles.layout} container`}>
        <h2 id="faq-title" className={styles.title}>{content.title}</h2>
        <div ref={listRef} className={styles.list}>
          {content.items.map((item) => (
            <details key={item.question} className={styles.item}>
              <summary className={styles.question}>
                <span>{item.question}</span>
                <span className={styles.icon} aria-hidden="true" />
              </summary>
              <p className={styles.answer}>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
