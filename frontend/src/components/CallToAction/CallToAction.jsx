import { useReveal } from '../../hooks/useReveal';
import { Button } from '../ui/Button';
import { PriceTag } from '../PriceTag';
import styles from './CallToAction.module.css';

// A full black field, the colour of the bottle, with the price set very large.
export function CallToAction({ content, product, onAddToCart }) {
  const textRef = useReveal();
  const priceRef = useReveal();

  return (
    <section className={styles.cta} aria-labelledby="cta-title">
      <div className={`${styles.layout} container`}>
        <div ref={textRef} className={styles.text}>
          <h2 id="cta-title" className={styles.title}>{content.title}</h2>
          <p className={styles.sentence}>{content.sentence}</p>
          <div>
            <Button variant="inverse" size="lg" onClick={onAddToCart} disabled={product.stock < 1}>
              {product.stock < 1 ? 'Agotado' : content.cta}
            </Button>
          </div>
        </div>

        <div ref={priceRef} className={styles.price}>
          <p className={styles.productName}>{product.name} · {product.volume}</p>
          <PriceTag
            amount={product.price}
            compareAt={product.compareAtPrice}
            currency={product.currency}
            size="xl"
            tone="inverse"
          />
        </div>
      </div>
    </section>
  );
}
