import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/api";

const INITIAL_STATE = {
  movies: {},
  oscars: {},
  popMovies: {},
  loading: false,
  error: null,
};

export const getAllMovies = createAsyncThunk(
  "movie/getAllMovies",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/user/movies");
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);

export const getOscarsMovies = createAsyncThunk(
  "movie/getOscarsMovies",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/user/oscars");
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);

export const getPopMovies = createAsyncThunk(
  "movie/getPopMovies",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/user/popularMovies");
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);

const movieSlice = createSlice({
  name: "movie",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(getAllMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getOscarsMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOscarsMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.oscars = action.payload;
      })
      .addCase(getOscarsMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getPopMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPopMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.popMovies = action.payload;
      })
      .addCase(getPopMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default movieSlice.reducer;
