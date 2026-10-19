export const getItemsCount = (items: { quantity: number }[]) => {
  return items.reduce((sum, item) => sum + item.quantity, 0);
};
