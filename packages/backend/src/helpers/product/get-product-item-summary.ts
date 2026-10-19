export type ProductItemSummary = {
  subtotal: number;
  shipping: number;
  vat: number;
  grandTotal: number;
};

export type ProductItem = {
  price: number;
  quantity: number;
};

export function getProductItemSummary(
  items: ProductItem[],
): ProductItemSummary {
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
