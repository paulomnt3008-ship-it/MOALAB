import { Link } from 'react-router-dom';
import { ColorSwitcher } from '../../components/ColorSwitcher';
import { Badge } from '../../components/ui/Badge';
import { Navbar } from '../Navbar';
import styles from './Header.module.css';

export function Header({ brand, links, backgrounds, background, onBackgroundChange, cartCount }) {
  return (
    <header className={styles.header}>
      <div className={`${styles.bar} container`}>
        <Link to="/" className={styles.brand}>{brand}</Link>
        <Navbar links={links} />
        <div className={styles.actions}>
          <ColorSwitcher options={backgrounds} value={background} onChange={onBackgroundChange} />
          <Link to="/carrito" className={styles.cart} aria-label={`Carrito, ${cartCount} productos`}>
            <span>Carrito</span>
            {cartCount > 0 && <Badge key={cartCount} tone="page">{cartCount}</Badge>}
          </Link>
        </div>
      </div>
    </header>
  );
}
