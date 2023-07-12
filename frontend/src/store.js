import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice.js';

// creating store
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;