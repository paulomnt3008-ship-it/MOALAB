# MOALAB

Página de venta del MOALAB Spray Nº1.

- `frontend/`: React + Vite (http://localhost:5173)
- `backend/`: Node.js + Express + MySQL (http://localhost:4000/api)

## Requisitos

- Node.js 20 o más reciente
- XAMPP con **MySQL encendido** (usuario `root` sin contraseña, o ajusta `backend/.env`)

## Levantar todo

```bash
npm run install:all                 # instala raíz, backend y frontend
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
npm run seed                        # crea la base "moalab" y carga los productos de ejemplo
npm run dev                         # levanta backend y frontend a la vez
```

Abre http://localhost:5173.

## Mostrar la página en otro dispositivo

Con `npm run dev` encendido, Vite muestra una dirección `Network` (por ejemplo `http://192.168.1.133:5173`).
Cualquier teléfono o laptop conectado a la misma red wifi puede abrirla, con carrito y todo:
el frontend pasa las llamadas a `/api` al backend a través de Vite. Si Windows pregunta por el firewall, permite el acceso en redes privadas.

Más detalle en `frontend/README.md` y `backend/README.md`.
