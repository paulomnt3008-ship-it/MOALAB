# MOALAB · Backend

API en Node.js + Express. Usa el MySQL de XAMPP a través de Sequelize.

## Requisitos

- Node.js 20 o más reciente
- MySQL encendido en el panel de XAMPP

## Primeros pasos

```bash
cp .env.example .env   # ajusta los datos de MySQL si hace falta
npm install
npm run seed           # crea la base "moalab" y carga los productos de ejemplo
npm run dev            # http://localhost:4000/api
```

La base de datos y sus tablas se crean solas al arrancar. Los productos de ejemplo están en
`src/utils/seedProducts.js`: edítalos y vuelve a correr `npm run seed`.

## Endpoints

| Método | Ruta | Qué hace |
|---|---|---|
| GET | `/api/health` | Comprueba que la API responde |
| GET | `/api/products` | Lista los productos |
| GET | `/api/products/featured` | Producto estrella |
| GET | `/api/products/:slug` | Detalle de un producto |
| POST | `/api/cart/summary` | Calcula subtotal, envío y total con los precios de la base |
| POST | `/api/orders` | Crea una orden y descuenta stock |
| GET | `/api/orders/:id` | Consulta una orden |
| POST | `/api/payments` | Pago de prueba (todavía sin proveedor) |

## Capas

`routes` → `controllers` (solo reciben y responden) → `services` (reglas de negocio) → `models`.
`app.js` arma Express y `server.js` conecta la base de datos y escucha el puerto.
