// Express recognises error middleware by its four arguments, so `next` must stay.
// eslint-disable-next-line no-unused-vars
export function errorHandler(error, req, res, next) {
  const status = error.status ?? 500;
  if (status >= 500) console.error(error);
  res.status(status).json({
    error: {
      message: status >= 500 ? 'Error interno del servidor' : error.message,
      details: error.details,
    },
  });
}
