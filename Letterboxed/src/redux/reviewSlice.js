import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/api";

const INITIAL_STATE = {
  newReviews: {},
  popularReviews: {},
  avg:{},
  popReviewById:{},
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

export const getAvgRating = createAsyncThunk(
  "review/getAvgRating",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/user/avgRating/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);

export const getPopReviewsById = createAsyncThunk(
  "review/getPopReviewsById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/user/popReviewById/${id}`);
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
      })
      .addCase(getAvgRating.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAvgRating.fulfilled, (state, action) => {
        state.loading = false;
        state.avg = action.payload;
      })
      .addCase(getAvgRating.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getPopReviewsById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPopReviewsById.fulfilled, (state, action) => {
        state.loading = false;
        state.popReviewById = action.payload;
      })
      .addCase(getPopReviewsById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default reviewSlice.reducer;
