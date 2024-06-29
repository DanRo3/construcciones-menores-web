import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from '../reducers/auth/authSlice';
import serviceSlice from '../reducers/homeReducers/servicios/serviceSlice';
import productSlice from '../reducers/homeReducers/products/productSlice';

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    serviceClient: serviceSlice,
    productClient: productSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
