// Prefixes an absolute link with the site's base folder: '/catalogo' becomes
// '/MOALAB/catalogo' on GitHub Pages and stays '/catalogo' locally.
// Router <Link>s do this on their own; plain <a href> links need it.
export const withBase = (href) =>
  href.startsWith('/') ? `${import.meta.env.BASE_URL}${href.slice(1)}` : href;
