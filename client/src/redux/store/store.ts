import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import AuthReducer from '../reducers/auth/authSlice';
import serviceSlice from '../reducers/homeReducers/servicios/serviceSlice';
import productSlice from '../reducers/homeReducers/products/productSlice';

const preloadedState = {
  auth: {
    user:  null,
    token: localStorage.getItem('token'),
    isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
    loading: false,
    error: null,
  }
};

const reducers = combineReducers({
  auth: AuthReducer,
  serviceClient: serviceSlice,
  productClient: productSlice,
});

export const store = configureStore({
  reducer: reducers,
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
    }),
});

export type AppStore = typeof store;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>;
