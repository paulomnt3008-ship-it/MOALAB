import { useReveal } from '../../hooks/useReveal';
import styles from './Testimonials.module.css';

// Hidden until there are real reviews in content/landingContent.js.
export function Testimonials({ content }) {
  const listRef = useReveal();
  if (!content.items.length) return null;

  return (
    <section className={`${styles.testimonials} section`} aria-labelledby="testimonials-title">
      <div className="container">
        <h2 id="testimonials-title" className={styles.title}>{content.title}</h2>
        <ul ref={listRef} className={styles.list}>
          {content.items.map((item) => (
            <li key={item.author} className={styles.item}>
              <blockquote className={styles.quote}>
                <p>{item.quote}</p>
              </blockquote>
              <p className={styles.author}>{item.author}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
