import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal" };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // The item to add to the cart
      const item = action.payload;

      // Check if the item is already in the cart
      const existItem = state.cartItems.find(
        (x) => x.variant_id === item.variant_id
      );

      if (existItem) {
        // If exists, update quantity
        state.cartItems = state.cartItems.map((x) =>
          x.variant_id === existItem.variant_id ? item : x
        );
      } else {
        // If not exists, add new item to cartItems
        state.cartItems = [...state.cartItems, item];
      }

      // Update the prices and save to storage
      return updateCart(state, item);
    },
    removeFromCart: (state, action) => {
      // Filter out the item to remove from the cart
      state.cartItems = state.cartItems.filter(
        (x) => x.variant_id !== action.payload
      );

      // Update the prices and save to storage
      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      return updateCart(state);
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      return updateCart(state);
    },
    saveDeliveryMethod: (state, action) => {
      state.deliveryMethod = action.payload;
      return updateCart(state);
    },
    clearCartItems: (state) => {
      // to clear the cart items after the order is placed
      state.cartItems = [];
      return updateCart(state);
    },
  },
});

export const {
  clearCartItems,
  savePaymentMethod,
  addToCart,
  removeFromCart,
  saveShippingAddress,
  saveDeliveryMethod,
} = cartSlice.actions;

export default cartSlice.reducer;
