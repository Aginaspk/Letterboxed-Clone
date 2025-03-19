import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/api";

const INITIAL_STATE = {
  news: {},
  loading: false,
  error: null,
};

export const getLatestNews = createAsyncThunk(
  "news/getLatestNews",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/user/getNews");
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLatestNews.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getLatestNews.fulfilled, (state, action) => {
        state.loading = false;
        state.news = action.payload;
      })
      .addCase(getLatestNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default newsSlice.reducer;
