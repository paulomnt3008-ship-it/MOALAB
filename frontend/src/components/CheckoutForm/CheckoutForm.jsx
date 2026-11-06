import { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { validateCheckout } from '../../utils/validators';
import styles from './CheckoutForm.module.css';

export function CheckoutForm({ initialValues, onSubmit, submitting = false, serverError }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((previous) => ({ ...previous, [name]: value }));
    if (errors[name]) setErrors((previous) => ({ ...previous, [name]: undefined }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const found = validateCheckout(values);
    setErrors(found);
    if (Object.keys(found).length === 0) onSubmit(values);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <Input label="Nombre completo" name="name" autoComplete="name" value={values.name} onChange={handleChange} error={errors.name} />
      <Input label="Correo" name="email" type="email" autoComplete="email" value={values.email} onChange={handleChange} error={errors.email} />
      <Input
        label="Teléfono (opcional)"
        name="phone"
        type="tel"
        autoComplete="tel"
        value={values.phone}
        onChange={handleChange}
        error={errors.phone}
        hint="Solo para avisarte sobre la entrega."
      />
      <Input
        label="Dirección de entrega"
        name="address"
        autoComplete="street-address"
        multiline
        value={values.address}
        onChange={handleChange}
        error={errors.address}
      />

      {serverError && <p className={styles.serverError} role="alert">{serverError}</p>}

      <Button type="submit" size="lg" fullWidth disabled={submitting}>
        {submitting ? 'Enviando…' : 'Confirmar pedido'}
      </Button>
    </form>
  );
}
