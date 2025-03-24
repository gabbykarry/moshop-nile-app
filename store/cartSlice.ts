import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "./productsSlice";
import { RootState } from "./store";

interface CartState {
  cart: Product[];
}

const initialState: CartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const item = action.payload;
      const quantity = item.quantity ?? 1;

      const itemIndex = state.cart.findIndex(
        (cartItem) => cartItem.id === item.id
      );
      //   const quantity = action.payload.quantity

      if (itemIndex >= 0) {
        state.cart[itemIndex].quantity =
          (state.cart[itemIndex].quantity ?? 0) + quantity;
      } else {
        state.cart.push({ ...item, quantity: quantity });
      }
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const itemIndex = state.cart.findIndex(
        (item) => item.id === action.payload
      );
      if (itemIndex >= 0) {
        const currentQuantity = state.cart[itemIndex].quantity ?? 1;
        if (currentQuantity > 1) {
          state.cart[itemIndex].quantity = currentQuantity - 1;
        } else {
          state.cart = state.cart.filter((item) => item.id !== action.payload);
        }
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const cartTotal = (state: RootState) =>
  state.cart.cart.reduce(
    (total, item) => total + item.price * (item.quantity ?? 1),
    0
  );

export const { addToCart, removeFromCart, clearCart, decreaseQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
