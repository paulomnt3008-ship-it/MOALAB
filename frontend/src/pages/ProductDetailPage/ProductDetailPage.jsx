import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { PriceTag } from '../../components/PriceTag';
import { ProductGallery } from '../../components/ProductGallery';
import { Button } from '../../components/ui/Button';
import { Loader } from '../../components/ui/Loader';
import { useCart } from '../../hooks/useCart';
import { useProduct } from '../../hooks/useProducts';
import { getProductImages } from '../../utils/productImages';
import styles from './ProductDetailPage.module.css';

export function ProductDetailPage() {
  const { slug } = useParams();
  const { data: product, loading, error } = useProduct(slug);
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  if (loading) return <div className={styles.page}><Loader /></div>;
  if (error) return <div className={`${styles.page} container`}><p role="alert">{error.message}</p></div>;

  const handleAdd = () => {
    addItem(product, 1);
    setAdded(true);
  };

  return (
    <div className={`${styles.page} container`}>
      <div className={styles.info}>
        <h1 className={styles.title}>{product.name}</h1>
        <p className={styles.tagline}>{product.tagline}</p>
        <PriceTag amount={product.price} compareAt={product.compareAtPrice} currency={product.currency} size="lg" />
        <p>{product.description}</p>
        <div className={styles.actions}>
          <Button size="lg" onClick={handleAdd} disabled={product.stock < 1}>
            {product.stock < 1 ? 'Agotado' : 'Agregar al carrito'}
          </Button>
          {added && <Button variant="ghost" to="/carrito">Agregado. Ver carrito</Button>}
        </div>
      </div>
      <ProductGallery images={getProductImages(product.images)} title="Vistas" headingLevel="h2" />
    </div>
  );
}
