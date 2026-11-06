import { Button } from '../ui/Button';
import { CartItem } from '../CartItem';
import { formatPrice } from '../../utils/formatPrice';
import styles from './Cart.module.css';

export function Cart({ items, subtotal, currency, onQuantityChange, onRemove }) {
  if (!items.length) {
    return (
      <div className={styles.empty}>
        <p className={styles.emptyText}>Tu carrito está vacío.</p>
        <Button to="/">Ver el Spray Nº1</Button>
      </div>
    );
  }

  return (
    <div className={styles.cart}>
      <ul className={styles.list}>
        {items.map((item) => (
          <CartItem key={item.productId} item={item} onQuantityChange={onQuantityChange} onRemove={onRemove} />
        ))}
      </ul>

      <aside className={styles.summary} aria-label="Resumen">
        <dl className={styles.row}>
          <dt>Subtotal</dt>
          <dd className={styles.amount}>{formatPrice(subtotal, currency)}</dd>
        </dl>
        <p className={styles.note}>El envío se calcula en el siguiente paso.</p>
        <Button to="/checkout" variant="inverse" size="lg" fullWidth>Continuar al pago</Button>
      </aside>
    </div>
  );
}
