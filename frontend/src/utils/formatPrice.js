const formatters = new Map();

export function formatPrice(amount, currency = 'MXN') {
  if (!formatters.has(currency)) {
    formatters.set(currency, new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }));
  }
  return formatters.get(currency).format(amount);
}
