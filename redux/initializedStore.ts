/* eslint-disable */
 // @ts-nocheck 


import { configureStore } from '@reduxjs/toolkit';
import { apiService } from '@/services/apiService';
let store;

export const initializeStore = (preloadedState = {}) => {
  if (!store) {
    store = configureStore({
      reducer: {
        [apiService.reducerPath]: apiService.reducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiService.middleware),
      preloadedState,
    });
  }

  return store;
};
