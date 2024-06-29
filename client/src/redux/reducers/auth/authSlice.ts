
import { User } from '@/types/interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  user: User; 
}

const initialState: AuthState = {
  isAuthenticated: true,
  user: {
    "id": 171717,
    'name':'DanRo',
    "email":"drgrassnk445@gmail.com"
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
      state.user = {"id": 0,
    'name':'',
    "email":""};
    },
  },
});

export const { loginSuccess, logout } = AuthSlice.actions;

export default AuthSlice.reducer;
