import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  uid: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token : string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  token: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
    },
  },
});

export const { login, logout, setToken } = authSlice.actions;
export default authSlice.reducer;
