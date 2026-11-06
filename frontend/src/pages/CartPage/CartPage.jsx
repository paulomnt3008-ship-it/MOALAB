import { Cart } from '../../components/Cart';
import { useCart } from '../../hooks/useCart';
import styles from './CartPage.module.css';

export function CartPage() {
  const { items, subtotal, currency, updateQuantity, removeItem } = useCart();

  return (
    <div className={`${styles.page} container`}>
      <h1 className={styles.title}>Tu carrito</h1>
      <Cart
        items={items}
        subtotal={subtotal}
        currency={currency}
        onQuantityChange={updateQuantity}
        onRemove={removeItem}
      />
    </div>
  );
}
