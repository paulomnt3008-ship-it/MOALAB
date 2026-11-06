import { ProductCard } from '../../components/ProductCard';
import { Loader } from '../../components/ui/Loader';
import { useProducts } from '../../hooks/useProducts';
import styles from './CatalogPage.module.css';

export function CatalogPage() {
  const { data: products, loading, error } = useProducts();

  return (
    <div className={`${styles.page} container`}>
      <h1 className={styles.title}>Catálogo</h1>
      {loading && <Loader />}
      {error && <p role="alert">{error.message}</p>}
      {products && (
        <ul className={styles.grid}>
          {products.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
