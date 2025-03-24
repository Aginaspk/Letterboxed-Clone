import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/api";

const INITIAL_STATE = {
  movies: {},
  oscars: {},
  movie: {},
  popMovies: {},
  intraById: {},
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

export const getMovieById = createAsyncThunk(
  "movie/getMovieById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/user/movieById/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);

export const likeMovie = createAsyncThunk(
  "movie/likeMovie",
  async (movieId, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`/user/likeMovie`, { movieId });
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);
export const watchMovie = createAsyncThunk(
  "movie/watchMovie",
  async (movieId, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`/user/watchMovie`, { movieId });
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);
export const watchlistMovie = createAsyncThunk(
  "movie/watchlistMovie",
  async (movieId, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`/user/watchlistMovie`, { movieId });
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);

export const rateMovie = createAsyncThunk(
  "movie/watchlistMovie",
  async (value, { rejectWithValue }) => {
    try {
      console.log(value)
      const { data } = await api.post(`/user/rateMovie`, {movieId:value.filim,rating:value.newVal});
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);
export const getIntraById = createAsyncThunk(
  "movie/getIntraById",
  async (movieId, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`/user/getIntra`, { movieId });
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
      })
      .addCase(getMovieById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMovieById.fulfilled, (state, action) => {
        state.loading = false;
        state.movie = action.payload;
      })
      .addCase(getMovieById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(likeMovie.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(watchMovie.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(watchlistMovie.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(getIntraById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getIntraById.fulfilled, (state, action) => {
        state.loading = false;
        state.intraById = action.payload;
      })
      .addCase(getIntraById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default movieSlice.reducer;
