import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/api";

const INITIAL_STATE = {
  newReviews: {},
  popularReviews: {},
  loading: false,
  error: null,
};

export const getNewReviews = createAsyncThunk(
  "review/getNewReviews",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/user/newReviews");
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);

export const getPopularReviews = createAsyncThunk(
  "review/getPopularReviews",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/user/popularReview");
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);

const reviewSlice = createSlice({
  name: "review",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNewReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNewReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.newReviews = action.payload;
      })
      .addCase(getNewReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getPopularReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPopularReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.popularReviews = action.payload;
      })
      .addCase(getPopularReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default reviewSlice.reducer;
