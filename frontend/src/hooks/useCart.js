import { useCartStore } from '../store/cartStore';
import { calculateSubtotal, countItems } from '../utils/cartCalculations';

export function useCart() {
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clear = useCartStore((state) => state.clear);

  return {
    items,
    count: countItems(items),
    subtotal: calculateSubtotal(items),
    currency: items[0]?.currency ?? 'MXN',
    addItem,
    updateQuantity,
    removeItem,
    clear,
  };
}
