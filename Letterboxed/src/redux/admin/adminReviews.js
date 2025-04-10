import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

const INITIAL_STATE = {
  reviews: {},
  loading: false,
  error: null,
};

export const getAllReviews = createAsyncThunk(
  "getAllReviews/review",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/admin/reviews");
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);

const adminReviewSlice = createSlice({
  name: "review",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllReviews.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllReviews.fulfilled, (state, action) => {
      state.loading = false;
      state.reviews = action.payload;
    });
    builder.addCase(getAllReviews.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default adminReviewSlice.reducer;
