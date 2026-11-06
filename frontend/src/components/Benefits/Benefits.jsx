import { useReveal } from '../../hooks/useReveal';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import styles from './Benefits.module.css';

// The bottle stays in the middle of the screen and turns as you scroll,
// while the tilted benefit cards pass by on both sides.
export function Benefits({ content, image }) {
  const sectionRef = useScrollProgress();
  const headingRef = useReveal();
  const leftRef = useReveal({ threshold: 0.1 });
  const rightRef = useReveal({ threshold: 0.1 });

  const left = content.items.filter((_, index) => index % 2 === 0);
  const right = content.items.filter((_, index) => index % 2 === 1);

  const renderCard = (item) => (
    <div key={item.title} className={styles.cardWrap}>
      <article className={styles.card}>
        <h3 className={styles.cardTitle}>{item.title}</h3>
        <p className={styles.cardText}>{item.text}</p>
      </article>
    </div>
  );

  return (
    <section id={content.id} ref={sectionRef} className={`${styles.benefits} section`} aria-labelledby="benefits-title">
      <div className="container">
        <div ref={headingRef}>
          <h2 id="benefits-title" className={styles.title}>{content.title}</h2>
        </div>

        <div className={styles.layout}>
          <div ref={leftRef} className={`${styles.column} ${styles.columnLeft}`}>
            {left.map(renderCard)}
          </div>

          <div className={styles.bottleColumn}>
            <div className={styles.bottleSticky}>
              <img className={styles.bottle} src={image.src} alt="" />
            </div>
          </div>

          <div ref={rightRef} className={`${styles.column} ${styles.columnRight}`}>
            {right.map(renderCard)}
          </div>
        </div>
      </div>
    </section>
  );
}
