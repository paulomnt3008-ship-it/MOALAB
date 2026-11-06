import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { CheckoutForm } from '../../components/CheckoutForm';
import { Loader } from '../../components/ui/Loader';
import { useAsync } from '../../hooks/useAsync';
import { useCart } from '../../hooks/useCart';
import { getCartSummary } from '../../services/cartService';
import { createOrder } from '../../services/orderService';
import { createPayment } from '../../services/paymentService';
import { useUserStore } from '../../store/userStore';
import { toApiItems } from '../../utils/cartCalculations';
import { formatPrice } from '../../utils/formatPrice';
import styles from './CheckoutPage.module.css';

export function CheckoutPage() {
  const navigate = useNavigate();
  const { items, clear } = useCart();
  const customer = useUserStore((state) => state.customer);
  const saveCustomer = useUserStore((state) => state.saveCustomer);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
  const apiItems = toApiItems(items);
  const summary = useAsync(() => getCartSummary(apiItems), [JSON.stringify(apiItems)]);

  // While an order is being placed the cart empties on purpose, so don't bounce back to it.
  if (!items.length && !submitting) return <Navigate to="/carrito" replace />;

  const handleSubmit = async (values) => {
    setSubmitting(true);
    setServerError('');
    try {
      const order = await createOrder({ customer: values, items: apiItems });
      await createPayment(order.id);
      saveCustomer(values);
      navigate(`/confirmacion/${order.id}`, { replace: true });
      clear();
    } catch (error) {
      setServerError(error.message);
      setSubmitting(false);
    }
  };

  return (
    <div className={`${styles.page} container`}>
      <h1 className={styles.title}>Datos de entrega</h1>
      <div className={styles.layout}>
        <CheckoutForm initialValues={customer} onSubmit={handleSubmit} submitting={submitting} serverError={serverError} />

        <aside className={styles.summary} aria-label="Resumen del pedido">
          {summary.loading && <Loader />}
          {summary.error && <p role="alert">{summary.error.message}</p>}
          {summary.data && (
            <dl className={styles.rows}>
              {summary.data.lines.map((line) => (
                <div key={line.productId} className={styles.row}>
                  <dt>{line.name} × {line.quantity}</dt>
                  <dd>{formatPrice(line.lineTotal, summary.data.currency)}</dd>
                </div>
              ))}
              <div className={styles.row}>
                <dt>Envío</dt>
                <dd>{summary.data.shipping === 0 ? 'Gratis' : formatPrice(summary.data.shipping, summary.data.currency)}</dd>
              </div>
              <div className={`${styles.row} ${styles.total}`}>
                <dt>Total</dt>
                <dd>{formatPrice(summary.data.total, summary.data.currency)}</dd>
              </div>
            </dl>
          )}
        </aside>
      </div>
    </div>
  );
}
