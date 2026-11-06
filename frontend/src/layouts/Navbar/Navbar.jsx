import { useEffect, useId, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

// Plain links on wide screens; a "Menú" button that opens them on phones.
export function Navbar({ links }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const menuId = useId();

  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <nav className={styles.navbar} aria-label="Principal">
      <button
        type="button"
        className={styles.toggle}
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((previous) => !previous)}
      >
        {open ? 'Cerrar' : 'Menú'}
      </button>

      <ul id={menuId} className={`${styles.links} ${open ? styles.open : ''}`}>
        {links.map((link) => (
          <li key={link.href}>
            <a href={link.href} className={styles.link} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
