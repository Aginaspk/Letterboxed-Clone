import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/api";

const INITIAL_STATE = {
  members:{},
  user:{},
  popReviwers:{},
  popOfWeek:{},
  loading: false,
  error: null,
};

export const getPopReviwers = createAsyncThunk(
  "members/getPopReviwers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/user/getTopReviwers");
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);
export const getPopOfTheWeek = createAsyncThunk(
  "members/getPopOfTheWeek",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/user/getToMemebrOfWeek");
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);
export const getAllMembers = createAsyncThunk(
  "members/getAllMembers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/user/getAllMembers");
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);
export const getUser = createAsyncThunk(
  "members/getUser",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/user/getUser/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);
export const getFavorites = createAsyncThunk(
  "members/getFavorites",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/user/getUser/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);

const membersSlice = createSlice({
  name: "members",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPopReviwers.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getPopReviwers.fulfilled, (state, action) => {
        state.loading = false;
        state.popReviwers = action.payload;
      })
      .addCase(getPopReviwers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getPopOfTheWeek.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getPopOfTheWeek.fulfilled, (state, action) => {
        state.loading = false;
        state.popOfWeek = action.payload;
      })
      .addCase(getPopOfTheWeek.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default membersSlice.reducer;