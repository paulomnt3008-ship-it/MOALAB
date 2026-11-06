import { Link } from 'react-router-dom';
import { MAX_QUANTITY } from '../../utils/cartCalculations';
import { getProductCover } from '../../utils/productImages';
import { PriceTag } from '../PriceTag';
import styles from './CartItem.module.css';

export function CartItem({ item, onQuantityChange, onRemove }) {
  const cover = getProductCover(item.images);

  return (
    <li className={styles.item}>
      <div className={styles.frame}>
        <img src={cover.src} alt="" />
      </div>

      <div className={styles.info}>
        <Link to={`/producto/${item.slug}`} className={styles.name}>{item.name}</Link>
        <PriceTag amount={item.price} currency={item.currency} />
      </div>

      <div className={styles.quantity} role="group" aria-label={`Cantidad de ${item.name}`}>
        <button
          type="button"
          className={styles.step}
          onClick={() => onQuantityChange(item.productId, item.quantity - 1)}
          disabled={item.quantity <= 1}
          aria-label="Quitar uno"
        >
          −
        </button>
        <span className={styles.count} aria-live="polite">{item.quantity}</span>
        <button
          type="button"
          className={styles.step}
          onClick={() => onQuantityChange(item.productId, item.quantity + 1)}
          disabled={item.quantity >= MAX_QUANTITY}
          aria-label="Agregar uno"
        >
          +
        </button>
      </div>

      <button type="button" className={styles.remove} onClick={() => onRemove(item.productId)}>
        Quitar
      </button>
    </li>
  );
}
