import type { RootState } from './store';

export const selectSubtotal = (state: RootState) => {
  return state.cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
};

export const selectShipping = () => {
  return 50;
};

export const selectVAT = (state: RootState) => {
  return Math.round(selectSubtotal(state) * 0.2);
};

export const selectGrandTotal = (state: RootState) => {
  return selectSubtotal(state) + selectShipping() + selectVAT(state);
};
