import { Outlet } from 'react-router-dom';
import { backgrounds, footer, hero, navigation } from '../../content/landingContent';
import { useBackground } from '../../hooks/useBackground';
import { useCart } from '../../hooks/useCart';
import { Footer } from '../Footer';
import { Header } from '../Header';
import styles from './MainLayout.module.css';

export function MainLayout() {
  const { background, setBackground } = useBackground();
  const { count } = useCart();

  return (
    <div className={styles.page}>
      <a href="#contenido" className={styles.skip}>Saltar al contenido</a>
      <Header
        brand={hero.wordmark}
        links={navigation}
        backgrounds={backgrounds}
        background={background}
        onBackgroundChange={setBackground}
        cartCount={count}
      />
      <main id="contenido" className={styles.main}>
        <Outlet />
      </main>
      <Footer content={footer} />
    </div>
  );
}
