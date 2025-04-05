// store/categoriesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // Aquí se almacenarán las categorías una vez cargadas
  status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
  error: null,
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    // Reducer para establecer las categorías en el estado
    // Se espera que el payload sea el array de categorías [ { id: '1', name: 'Sillas' }, ... ]
    setCategories: (state, action) => {
      state.items = action.payload;
      state.status = 'succeeded';
      state.error = null;
    },
    // Reducer opcional para indicar que la carga está en progreso
    setLoadingCategories: (state) => {
      state.status = 'loading';
    },
    // Reducer opcional para manejar errores de carga
    setErrorCategories: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

// Exporta las acciones generadas
export const { setCategories, setLoadingCategories, setErrorCategories } = categoriesSlice.actions;

// Exporta el reducer
export default categoriesSlice.reducer;

// Selectores opcionales
// export const selectAllCategories = (state) => state.categories.items;
// export const selectCategoriesStatus = (state) => state.categories.status;