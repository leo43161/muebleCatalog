// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import productsReducer from './productsSlice'; // Importa el reducer de productos
import categoriesReducer from './categoriesSlice'; // Importa el reducer de categorías

export const store = configureStore({
  reducer: {
    // Registra todos los reducers aquí
    cart: cartReducer,
    products: productsReducer,         // Añadido
    categories: categoriesReducer,     // Añadido
  },
});

// Como recordatorio: En JavaScript no exportamos los tipos inferidos.
// El acceso al estado será state.products.items, state.categories.items, etc.