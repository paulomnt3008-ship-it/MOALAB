/*
  All the text on the landing page lives here.
  Edit this file to change the wording; the components only read from it.
  The product name, price and stock come from the backend (backend/src/utils/seedProducts.js).

  Everything below is sample copy for the mockup. Replace it with the client's real text.
*/

export const backgrounds = [
  { id: 'beige', label: 'Beige' },
  { id: 'stone', label: 'Piedra' },
  { id: 'sage', label: 'Salvia' },
  { id: 'blush', label: 'Rosa arena' },
  { id: 'mist', label: 'Niebla' },
];

export const navigation = [
  { label: 'Producto', href: '/#producto' },
  { label: 'Cómo se usa', href: '/#uso' },
  { label: 'Preguntas', href: '/#preguntas' },
  { label: 'Catálogo', href: '/catalogo' },
];

export const hero = {
  wordmark: 'MOALAB',
  title: 'Spray Nº1, en botella negra',
  sentence: 'Una bruma fina que cae pareja, en 100 ml que caben en cualquier bolso.',
  cta: 'Agregar al carrito',
  facts: [
    { label: 'Contenido', value: '100 ml' },
    { label: 'Atomizador', value: 'Bruma fina' },
    { label: 'Botella', value: 'Negra mate' },
  ],
};

export const marquee = ['Bruma fina', 'Botella negra', '100 ml', 'Hecho para llevar', 'MOALAB Spray Nº1'];

export const benefits = {
  id: 'producto',
  title: 'Por qué MOALAB',
  items: [
    {
      title: 'Bruma, no chorro',
      text: 'El atomizador abre la gota en una nube fina que cubre parejo, sin mojar de más.',
    },
    {
      title: 'Negra por fuera',
      text: 'Una botella negra mate con el nombre en blanco. Nada más sobre la mesa.',
    },
    {
      title: 'Cabe donde sea',
      text: 'Mide lo mismo que tu teléfono a lo alto. Va en el bolso, la mochila o el cajón.',
    },
    {
      title: 'Dura semanas',
      text: '100 ml rinden alrededor de 900 disparos. Ajusta esta cifra con el dato real.',
    },
  ],
};

export const gallery = {
  title: 'Mírala de cerca',
  sentence: 'Tres vistas de la botella. Toca una para verla en grande.',
};

export const usage = {
  id: 'uso',
  title: 'Cómo se usa',
  steps: [
    { title: 'Agita', text: 'Dos o tres veces, con la tapa puesta.' },
    { title: 'Aleja', text: 'Sostén la botella a unos 20 cm.' },
    { title: 'Presiona', text: 'Un disparo corto. Repite si hace falta.' },
  ],
  specsTitle: 'Ficha',
  specs: [
    { label: 'Contenido', value: '100 ml' },
    { label: 'Botella', value: 'Vidrio negro mate' },
    { label: 'Atomizador', value: 'Bruma fina, 0.1 ml por disparo' },
    { label: 'Medidas', value: '14.5 × 4.5 cm' },
    { label: 'Hecho en', value: 'México' },
  ],
};

// Add real customer reviews here. The section stays hidden while this list is empty.
export const testimonials = {
  title: 'Lo que dicen',
  items: [],
};

export const callToAction = {
  title: 'Llévate la tuya',
  sentence: 'Envío gratis en compras desde $599. Llega en 2 a 5 días hábiles.',
  cta: 'Agregar al carrito',
};

export const faq = {
  id: 'preguntas',
  title: 'Preguntas frecuentes',
  items: [
    {
      question: '¿Cuánto tarda en llegar?',
      answer: 'Entre 2 y 5 días hábiles después de confirmar tu pago, según tu ciudad.',
    },
    {
      question: '¿Cuánto cuesta el envío?',
      answer: 'Es gratis desde $599. En compras menores cuesta $99.',
    },
    {
      question: '¿La botella se puede rellenar?',
      answer: 'Respuesta de ejemplo: reemplázala con la información real del producto.',
    },
    {
      question: '¿Puedo devolverlo?',
      answer: 'Sí, dentro de los 30 días siguientes a la entrega si la botella no se ha abierto.',
    },
    {
      question: '¿Qué formas de pago aceptan?',
      answer: 'Tarjeta de crédito o débito. El pago en línea se conectará en la siguiente etapa.',
    },
  ],
};

export const footer = {
  wordmark: 'MOALAB',
  note: 'Spray Nº1 · 100 ml',
  links: [
    { label: 'Catálogo', href: '/catalogo' },
    { label: 'Carrito', href: '/carrito' },
    { label: 'Preguntas', href: '/#preguntas' },
  ],
  copyright: `© ${new Date().getFullYear()} MOALAB`,
};
