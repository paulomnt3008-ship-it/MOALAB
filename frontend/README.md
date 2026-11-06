# MOALAB · Frontend

React + Vite, con CSS Modules. Estado con Zustand y rutas con React Router.

## Primeros pasos

```bash
cp .env.example .env   # VITE_API_URL=/api usa el proxy de Vite hacia el backend
npm install
npm run dev            # http://localhost:5173
```

El backend tiene que estar corriendo (ver `../backend`).

## Dónde cambiar cosas

| Quiero cambiar… | Archivo |
|---|---|
| Textos de la página principal | `src/content/landingContent.js` |
| Los 5 colores de fondo, tipografía, espacios | `src/styles/variables.css` |
| Nombre, precio o stock del producto | `../backend/src/utils/seedProducts.js` y luego `npm run seed` en el backend |
| Imágenes del producto | `src/assets/images/` y `src/utils/productImages.js` |

## Estructura

- `components/ui/`: piezas genéricas (Button, Input, Modal, Badge, Loader).
- `components/`: piezas de la venta (Hero, Benefits, ProductGallery, Cart, CheckoutForm…).
- `layouts/`: Header, Navbar, Footer y MainLayout.
- `pages/`: solo ensamblan componentes.
- `services/`: única capa que habla con el backend (`apiClient.js` es el único `fetch`).
- `hooks/`, `utils/`, `store/`: lógica reutilizable, cálculos del carrito y estado guardado.

Cada componente vive en su carpeta: `Nombre.jsx` (estructura), `Nombre.module.css` (estilos) e `index.js` (exportación).
Los estilos solo usan las variables de `styles/variables.css`.
