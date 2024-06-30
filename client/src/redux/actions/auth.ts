import { authFailure, authSDevelopment, authStart, authSuccess, logout } from '../reducers/auth/authSlice';
import { AppThunk } from '../store/store';
import axios from 'axios';

export const login = (email: string, password: string): AppThunk => async (dispatch) => {
  dispatch(authStart());
  try {
    const response = await axios.post('/api/auth/login', { email, password });
    const { token, user } = response.data;
    dispatch(authSuccess({ token, user }));
  } catch (error) {
    dispatch(authFailure(error.message));
  }
};

export const MetaAuth = (): AppThunk => (dispatch) => {
  dispatch(authSDevelopment());
};

export const signOut = (): AppThunk => (dispatch) => {
  dispatch(logout());
};

