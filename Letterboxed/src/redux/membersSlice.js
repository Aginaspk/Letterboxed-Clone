import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/api";

const INITIAL_STATE = {
  popReviwers:{},
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
      });
  },
});

export default membersSlice.reducer;