import { useReveal } from '../../hooks/useReveal';
import styles from './ProductSpecs.module.css';

// How to use it, next to a spec sheet drawn like the black back label of the bottle.
export function ProductSpecs({ content, wordmark }) {
  const stepsRef = useReveal();
  const labelRef = useReveal();

  return (
    <section id={content.id} className={`${styles.specs} section`} aria-labelledby="usage-title">
      <div className={`${styles.layout} container`}>
        <div ref={stepsRef} className={styles.usage}>
          <h2 id="usage-title" className={styles.title}>{content.title}</h2>
          <ol className={styles.steps}>
            {content.steps.map((step) => (
              <li key={step.title} className={styles.step}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepText}>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>

        <div ref={labelRef}>
          <div className={styles.label}>
            <p className={styles.labelBrand}>{wordmark}</p>
            <h3 className={styles.labelTitle}>{content.specsTitle}</h3>
            <dl className={styles.specList}>
              {content.specs.map((spec) => (
                <div key={spec.label} className={styles.specRow}>
                  <dt className={styles.specLabel}>{spec.label}</dt>
                  <dd className={styles.specValue}>{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
