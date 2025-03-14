import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const INITIAL_STATE = {
  user: {},
  isAuth: false,
  accessToken: null,
  loading: false,
  error: null,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userInfo, { rejectWithValue }) => {
    try {
      const { data } = await api.post("authUser/register", userInfo);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await api.post("authUser/login", userData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);

export const sendResetEmail = createAsyncThunk(
  "auth/sendResetEmail",
  async (email, { rejectWithValue }) => {
    try {
      const { data } = await api.post("authUser/forgot-password", email);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    updateAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.accessToken;
        state.isAuth = true;
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.accessToken;
        state.isAuth = true;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(sendResetEmail.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendResetEmail.fulfilled, (state) => {
        state.loading = false;
      })
  },
});

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "isAuth"],
};

export const { updateAccessToken } = authSlice.actions;
export default persistReducer(persistConfig, authSlice.reducer);
