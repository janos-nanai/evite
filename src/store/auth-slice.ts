import { AuthState } from "../types/store-types";

import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: AuthState = {
  guestId: "",
  accessToken: "",
  refreshToken: "",
  isLoading: false,
  error: "",
};

const API_URL = process.env.REACT_APP_BACKEND_ENTRY_POINT;

const namespace = "auth";

export const login = createAsyncThunk(
  `${namespace}/login`,
  async (args: { voucherId: string; voucherPass: string }) => {
    const response = await axios.post(`${API_URL}/auth/user-login`, args);
    const { guestId, refreshToken } = response.data;
    localStorage.setItem(
      "localAuthData",
      JSON.stringify({ guestId, refreshToken })
    );
    return response.data;
  }
);

// export const refreshAccessToken = createAsyncThunk(
//   `${namespace}/refreshAccessToken`,
//   async (token: string) => {
//     const response = await axios.post(`${API_URL}/auth/token`, token);
//     return response.data;
//   }
// );

export const logout = createAsyncThunk(
  `${namespace}/logout`,
  async (refreshToken: string) => {
    const response = await axios.post(`${API_URL}/auth/logout`, refreshToken);
    localStorage.removeItem("localAuthData");
    return response.data;
  }
);

const authSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {
    restoreAuthState(state, action) {
      const { guestId, refreshToken } = action.payload;
      state.guestId = guestId;
      state.refreshToken = refreshToken;
      state.isLoading = false;
      state.error = "";
    },
    refreshAccessToken(state, action) {
      const { guestId, accessToken } = action.payload;

      state.isLoading = false;
      state.guestId = guestId;
      state.accessToken = accessToken;
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    // login
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      const { guestId, accessToken, refreshToken } = action.payload;
      state.guestId = guestId;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "unknown error";
    });

    // refreshAccessToken
    // builder.addCase(refreshAccessToken.pending, (state) => {
    //   state.isLoading = true;
    // });
    // builder.addCase(refreshAccessToken.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   const { voucherId, accessToken } = action.payload;
    //   state.voucherId = voucherId;
    //   state.accessToken = accessToken;
    //   state.isLoggedIn = true;
    // });
    // builder.addCase(refreshAccessToken.rejected, (state) => {
    //   state.isLoading = false;
    // });

    // logout
    builder.addCase(logout.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.guestId = "";
      state.accessToken = "";
      state.refreshToken = "";
      state.isLoading = false;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.isLoading = true;
      state.error = action.payload || "unknown error";
    });
  },
});

export const authReducer = authSlice.reducer;
export const { refreshAccessToken, restoreAuthState } = authSlice.actions;
