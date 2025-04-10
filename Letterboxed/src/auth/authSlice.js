import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/api";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const INITIAL_STATE = {
  user: {},
  newPass: {},
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
export const loginAdmin = createAsyncThunk(
  "auth/loginUser",
  async (adminData, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/authAdmin/loginAdmin", adminData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);

export const logOutUser = createAsyncThunk(
  "auth/logOutUser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/authUser/logout");
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

export const setNewPassword = createAsyncThunk(
  "auth/setNewPassword",
  async (val, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`/authUser/reset-password/${val.token}`, val.password);
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
      .addCase(setNewPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(setNewPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.newPass = action.payload;
      })
      .addCase(setNewPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logOutUser.pending,(state)=>{
        state.loading = true;
      })
      .addCase(logOutUser.fulfilled,(state,action)=>{
        state.loading = false;
        state.isAuth = false;
        state.user = {};
      })
      .addCase(logOutUser.rejected,(state,action)=>{
        state.error = action.payload;
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
