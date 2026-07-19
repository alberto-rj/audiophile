import type {
  CartGrandTotal,
  CartItemDetailed,
  CartShipping,
  CartSubtotal,
  CartVat,
} from '@/schemas';

export type CartSummary = {
  subtotal: CartSubtotal;
  shipping: CartShipping;
  vat: CartVat;
  grandTotal: CartGrandTotal;
};

export function getCartSummary(items: CartItemDetailed[]): CartSummary {
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const shipping = subtotal > 100_000 ? 0 : 5000;
  const vat = Math.round(subtotal * 0.2);
  const grandTotal = subtotal + shipping + vat;

  return {
    subtotal,
    shipping,
    vat,
    grandTotal,
  };
}
