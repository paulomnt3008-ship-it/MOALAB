import { Link } from 'react-router-dom';
import styles from './Button.module.css';

// Renders a <button>, a router <Link> (with `to`) or a plain <a> (with `href`).
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  to,
  href,
  className = '',
  ...rest
}) {
  const classes = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : '',
    className,
  ].filter(Boolean).join(' ');

  if (to) return <Link to={to} className={classes} {...rest}>{children}</Link>;
  if (href) return <a href={href} className={classes} {...rest}>{children}</a>;
  return <button type="button" className={classes} {...rest}>{children}</button>;
}
