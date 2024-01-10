import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {},
  products: [],
};

export const orebiSlice = createSlice({
  name: "orebi",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.products.push(action.payload);
    },
    increaseQuantity: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        item.quantity++;
      }
    },
    drecreaseQuantity: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },
    deleteItem: (state, action) => {
      state.products = state.products.filter(
        (item) => item._id !== action.payload
      );
    },
    resetCart: (state) => {
      state.products = [];
    },
    updateCart: (state, action) => {
      state.products = action.payload;
    },
    loginSuccess: (state, action) => {
      state.userInfo = action.payload
    },
    logout: (state) => {
      state.userInfo = {};
      state.products = [];
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  drecreaseQuantity,
  deleteItem,
  resetCart,
  updateCart,
  loginSuccess,
  logout,
} = orebiSlice.actions;
export default orebiSlice.reducer;
