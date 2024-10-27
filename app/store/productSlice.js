import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [], 
  cart: [], 
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
    addToCart(state, action) {
      state.cart.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(item => item.id !== action.payload);
    },
    addProduct(state, action) { 
      state.products.push(action.payload);
    },
 
  },
});

export const { setProducts, addToCart, removeFromCart, addProduct } = productSlice.actions;
export default productSlice.reducer;
