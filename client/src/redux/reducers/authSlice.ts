// src/features/auth/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  user: null | object; // Aquí puedes expandir con datos del usuario si es necesario
}

const initialState: AuthState = {
  isAuthenticated: true,
  user: {
    'user':'DanRo'
  },
};

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<any>) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { loginSuccess, logout } = AuthSlice.actions;

export default AuthSlice.reducer;
