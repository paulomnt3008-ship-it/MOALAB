const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[\d\s()+-]{8,20}$/;

export const isEmail = (value) => EMAIL_PATTERN.test(value.trim());

export const isPhone = (value) => PHONE_PATTERN.test(value.trim());

// Returns an object with one message per invalid field.
export function validateCheckout(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Escribe tu nombre.';
  if (!isEmail(values.email)) errors.email = 'Escribe un correo válido, por ejemplo ana@correo.com.';
  if (values.phone.trim() && !isPhone(values.phone)) errors.phone = 'Escribe un teléfono de 10 dígitos.';
  if (!values.address.trim()) errors.address = 'Escribe la dirección de entrega.';
  return errors;
}
