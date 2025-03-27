import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/api";

const INITIAL_STATE = {
  allSOutput: {},
  movies:{},
  loading: false,
  error: null,
};

export const seacrhAll = createAsyncThunk(
  "search/searchAll",
  async (searchText, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/user/seacrh/${searchText}`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);
export const seacrhMovies = createAsyncThunk(
  "search/seacrhMovies",
  async (searchText, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/user/seacrhMovie/${searchText}`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);

const searchSlice = createSlice({
  name: "seacrh",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(seacrhAll.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(seacrhAll.fulfilled, (state, action) => {
        state.loading = false;
        state.allSOutput = action.payload;
      })
      .addCase(seacrhAll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(seacrhMovies.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(seacrhMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(seacrhMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});


export default searchSlice.reducer;