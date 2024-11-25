import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const itemPresent = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (itemPresent) {
        itemPresent.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const removeItem = state.cart.filter(
        (item) => item.id != action.payload.id
      );
      state.cart = removeItem;
    },
    incrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload.id);
      item.quantity++;
    },

    decrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload.id);
      if (item.quantity === 1) {
        item.quantity = 0;
        const removeItem = state.cart.filter(
          (item) => item.id != action.payload.id
        );
        state.cart = removeItem;
      } else {
        item.quantity--;
      }
    },

    cleanCart: (state) => {
      state.cart = [];
    },
  },
});

export const {  addToCart, removeFromCart, incrementQuantity, decrementQuantity, cleanCart } = cartSlice.actions;

export default cartSlice.reducer;



