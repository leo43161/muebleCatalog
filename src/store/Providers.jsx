// store/Providers.jsx
'use client'; // Sigue siendo necesario marcarlo como Client Component

import React from 'react'; // Importa React si es necesario
import { Provider } from 'react-redux';
import { store } from './store'; // Importa el store que acabamos de crear

// Ya no necesitamos definir props con TypeScript
export function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}