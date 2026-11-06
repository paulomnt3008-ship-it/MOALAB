import { Link } from 'react-router-dom';
import { getProductImages } from '../../utils/productImages';
import { PriceTag } from '../PriceTag';
import styles from './ProductCard.module.css';

// On hover the card shows the product's second picture, when it has one.
export function ProductCard({ product }) {
  const [cover, alternate] = getProductImages(product.images);

  return (
    <article className={styles.card}>
      <Link to={`/producto/${product.slug}`} className={styles.link}>
        <div className={styles.frame}>
          {cover && <img className={styles.image} src={cover.src} alt={cover.alt} loading="lazy" />}
          {alternate && (
            <img className={`${styles.image} ${styles.alternate}`} src={alternate.src} alt="" loading="lazy" />
          )}
        </div>
        <h3 className={styles.name}>{product.name}</h3>
      </Link>
      <p className={styles.tagline}>{product.tagline}</p>
      <PriceTag amount={product.price} compareAt={product.compareAtPrice} currency={product.currency} />
    </article>
  );
}
