// store/productsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // Aquí se almacenarán los productos una vez cargados
  status: 'idle', // Posibles estados: 'idle', 'loading', 'succeeded', 'failed'
  error: null,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Reducer para establecer los productos en el estado
    // Se espera que el payload sea el array de productos [ { id: '1', ... }, ... ]
    setProducts: (state, action) => {
      state.items = action.payload;
      state.status = 'succeeded';
      state.error = null; // Limpiar cualquier error anterior
    },
    // Reducer opcional para indicar que la carga está en progreso
    setLoadingProducts: (state) => {
      state.status = 'loading';
    },
    // Reducer opcional para manejar errores de carga
    setErrorProducts: (state, action) => {
      state.status = 'failed';
      state.error = action.payload; // El payload debería ser el mensaje de error
    },
  },
  // Aquí podrías añadir 'extraReducers' en el futuro si usas createAsyncThunk
});

// Exporta las acciones generadas
export const { setProducts, setLoadingProducts, setErrorProducts } = productsSlice.actions;

// Exporta el reducer
export default productsSlice.reducer;

// Selectores opcionales (útiles para acceder al estado después)
// export const selectAllProducts = (state) => state.products.items;
// export const selectProductById = (state, productId) =>
//   state.products.items.find((product) => product.id === productId);
// export const selectProductsStatus = (state) => state.products.status;