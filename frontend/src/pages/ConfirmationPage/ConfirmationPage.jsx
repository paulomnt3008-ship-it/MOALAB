import { useParams } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Loader } from '../../components/ui/Loader';
import { useAsync } from '../../hooks/useAsync';
import { getOrder } from '../../services/orderService';
import { formatPrice } from '../../utils/formatPrice';
import styles from './ConfirmationPage.module.css';

export function ConfirmationPage() {
  const { orderId } = useParams();
  const { data: order, loading, error } = useAsync(() => getOrder(orderId), [orderId]);

  return (
    <div className={`${styles.page} container`}>
      <h1 className={styles.title}>Gracias por tu pedido</h1>
      {loading && <Loader />}
      {error && <p role="alert">{error.message}</p>}
      {order && (
        <p className={styles.sentence}>
          Pedido número {order.id} por {formatPrice(Number(order.total), order.currency)}.
          Te escribiremos a {order.customerEmail} cuando salga.
        </p>
      )}
      <Button to="/" variant="secondary">Volver al inicio</Button>
    </div>
  );
}
