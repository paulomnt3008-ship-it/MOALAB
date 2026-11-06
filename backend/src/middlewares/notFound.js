import { notFoundError } from '../utils/httpError.js';

export function notFound(req, res, next) {
  next(notFoundError(`Ruta no encontrada: ${req.method} ${req.originalUrl}`));
}
