import { useState } from 'react';
import { Benefits } from '../../components/Benefits';
import { CallToAction } from '../../components/CallToAction';
import { Faq } from '../../components/Faq';
import { Hero } from '../../components/Hero';
import { Marquee } from '../../components/Marquee';
import { ProductGallery } from '../../components/ProductGallery';
import { ProductSpecs } from '../../components/ProductSpecs';
import { Testimonials } from '../../components/Testimonials';
import { Button } from '../../components/ui/Button';
import { Loader } from '../../components/ui/Loader';
import { Modal } from '../../components/ui/Modal';
import {
  benefits, callToAction, faq, gallery, hero, marquee, testimonials, usage,
} from '../../content/landingContent';
import { useCart } from '../../hooks/useCart';
import { useFeaturedProduct } from '../../hooks/useProducts';
import { getProductCover, getProductImages } from '../../utils/productImages';
import styles from './HomePage.module.css';

// Landing page for the star product.
export function HomePage() {
  const { data: product, loading, error } = useFeaturedProduct();
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  if (loading) return <div className={styles.status}><Loader /></div>;

  if (error) {
    return (
      <div className={`${styles.status} container`}>
        <h1 className={styles.statusTitle}>No pudimos cargar el producto</h1>
        <p>{error.message} Revisa que el backend esté encendido y vuelve a intentar.</p>
        <Button onClick={() => window.location.reload()}>Reintentar</Button>
      </div>
    );
  }

  const handleAdd = () => {
    addItem(product, 1);
    setAdded(true);
  };

  const cover = getProductCover(product.images);

  return (
    <>
      <div className="container">
        <Hero content={hero} product={product} image={cover} onAddToCart={handleAdd} />
      </div>
      <Marquee words={marquee} />
      <Benefits content={benefits} image={cover} />
      <section className="section" aria-labelledby="gallery-title">
        <div className="container">
          <ProductGallery images={getProductImages(product.images)} title={gallery.title} sentence={gallery.sentence} headingId="gallery-title" />
        </div>
      </section>
      <ProductSpecs content={usage} wordmark={hero.wordmark} />
      <Testimonials content={testimonials} />
      <CallToAction content={callToAction} product={product} onAddToCart={handleAdd} />
      <Faq content={faq} />

      <Modal open={added} onClose={() => setAdded(false)} title="Listo, está en tu carrito">
        <p>{product.name} · {product.volume}</p>
        <div className={styles.modalActions}>
          <Button to="/carrito">Ir al carrito</Button>
          <Button variant="secondary" onClick={() => setAdded(false)}>Seguir viendo</Button>
        </div>
      </Modal>
    </>
  );
}
