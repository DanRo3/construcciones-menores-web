import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
const Cookies = require("js-cookie");

interface AuthState {
  user: { username: string } | null;
  token: string | null;
  isAuthenticated: boolean;
  error: string | null;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
};

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:1338/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();

      if (data.status === "success") {
        const { t_auth, ...rest } = data;
        localStorage.setItem("userData", JSON.stringify({ ...rest, username: credentials.username }));
        Cookies.set("session", t_auth, { expires: 7 });
        return { user: { ...rest, username: credentials.username }, token: t_auth };
      } else {
        return rejectWithValue(data.error);
      }
    } catch (error) {
      return rejectWithValue("Error en la conexión con el servidor.");
    }
  }
);

const checkAuthStatus = createAsyncThunk(
  "auth/checkAuthStatus",
  async (_, { dispatch }) => {
    const userData = localStorage.getItem("userData");
    const token = Cookies.get("session");

    if (userData && token) {
      const user = JSON.parse(userData);
      dispatch(authSlice.actions.setAuthStatus({ user, token }));
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      state.isLoading = false;
      localStorage.removeItem("userData");
      Cookies.remove("session");
    },
    setAuthStatus: (state, action: PayloadAction<{ user: any; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<{ user: any; token: string }>) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, setAuthStatus } = authSlice.actions;
export default authSlice.reducer;
export { checkAuthStatus };
