import { Button } from '../ui/Button';
import { PriceTag } from '../PriceTag';
import styles from './Hero.module.css';

// The wordmark letters rise one by one, then the bottle comes up from below.
export function Hero({ content, product, image, onAddToCart }) {
  const letters = [...content.wordmark];

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <h1 id="hero-title" className={styles.wordmark} aria-label={`${content.wordmark}, ${content.title}`}>
        {letters.map((letter, index) => (
          <span key={`${letter}-${index}`} className={styles.letter} aria-hidden="true">
            {letter}
          </span>
        ))}
      </h1>

      <div className={styles.stage}>
        <div className={styles.intro}>
          <p className={styles.title}>{content.title}</p>
          <p className={styles.sentence}>{content.sentence}</p>
          <PriceTag amount={product.price} compareAt={product.compareAtPrice} currency={product.currency} size="lg" />
          <Button size="lg" onClick={onAddToCart} disabled={product.stock < 1}>
            {product.stock < 1 ? 'Agotado' : content.cta}
          </Button>
        </div>

        <div className={styles.bottle}>
          <img className={styles.bottleImage} src={image.src} alt={image.alt} />
        </div>

        <dl className={styles.facts}>
          {content.facts.map((fact) => (
            <div key={fact.label} className={styles.fact}>
              <dt className={styles.factLabel}>{fact.label}</dt>
              <dd className={styles.factValue}>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
