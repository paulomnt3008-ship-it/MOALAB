import bottleFront from '../assets/images/bottle-front.svg';
import bottleBack from '../assets/images/bottle-back.svg';
import bottleNozzle from '../assets/images/bottle-nozzle.svg';

// Maps the image keys stored in the database to the files in assets/images.
// To use real photos, drop them in assets/images and point these keys to them.
const IMAGES = {
  'bottle-front': { src: bottleFront, alt: 'Botella negra de MOALAB Spray con el nombre en letras blancas' },
  'bottle-back': { src: bottleBack, alt: 'Parte trasera de la botella, con el modo de uso' },
  'bottle-nozzle': { src: bottleNozzle, alt: 'Detalle del atomizador soltando una bruma fina' },
};

export const getProductImages = (keys = []) => keys.map((key) => IMAGES[key]).filter(Boolean);

export const getProductCover = (keys = []) => getProductImages(keys)[0] ?? IMAGES['bottle-front'];
