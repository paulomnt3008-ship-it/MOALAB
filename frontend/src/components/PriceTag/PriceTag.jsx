import { formatPrice } from '../../utils/formatPrice';
import styles from './PriceTag.module.css';

export function PriceTag({ amount, compareAt, currency = 'MXN', size = 'md', tone = 'ink' }) {
  const hasDiscount = compareAt && compareAt > amount;

  return (
    <p className={`${styles.price} ${styles[size]} ${styles[tone]}`}>
      <span className={styles.current}>{formatPrice(amount, currency)}</span>
      {hasDiscount && (
        <s className={styles.compare}>
          <span className="visually-hidden">Antes </span>
          {formatPrice(compareAt, currency)}
        </s>
      )}
    </p>
  );
}
