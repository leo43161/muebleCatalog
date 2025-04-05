// store/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Asume que CartItem ya está definido como en pasos anteriores
// export interface CartItem { id, name, color, price, quantity, image }

const initialState = {
  items: [],
  total: 0,
};

// Función helper para calcular el total
const calculateTotal = (items) => {
  return items.reduce((sum, item) => sum + parseFloat(item.price || 0) * item.quantity, 0);
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Añadir item o incrementar cantidad si ya existe
    addItem: (state, action) => {
      const newItem = action.payload; // Espera { id, name, price, color, image }
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === newItem.id && item.color === newItem.color
      );

      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].quantity += 1;
      } else {
        state.items.push({ ...newItem, quantity: 1 });
      }
      state.total = calculateTotal(state.items);
    },

    // Incrementar cantidad de un item específico
    increaseQuantity: (state, action) => {
      const { id, color } = action.payload; // Espera { id, color }
      const item = state.items.find(i => i.id === id && i.color === color);
      if (item) {
        item.quantity += 1;
      }
      state.total = calculateTotal(state.items);
    },

    // Decrementar cantidad o eliminar si llega a 0
    decreaseQuantity: (state, action) => {
      const { id, color } = action.payload; // Espera { id, color }
      const itemIndex = state.items.findIndex(i => i.id === id && i.color === color);

      if (itemIndex !== -1) {
        const item = state.items[itemIndex];
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          // Si la cantidad es 1, elimina el item del array
          state.items.splice(itemIndex, 1);
        }
      }
      state.total = calculateTotal(state.items);
    },

    // Eliminar un item completamente
    removeItem: (state, action) => {
      const { id, color } = action.payload; // Espera { id, color }
      state.items = state.items.filter(item => !(item.id === id && item.color === color));
      state.total = calculateTotal(state.items);
    },
  },
});

// Exporta las nuevas acciones junto con la existente
export const { addItem, increaseQuantity, decreaseQuantity, removeItem } = cartSlice.actions;

// Exporta el reducer
export default cartSlice.reducer;

// Selectores (pueden ser útiles)
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotal = (state) => state.cart.total;
export const selectTotalCartQuantity = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);