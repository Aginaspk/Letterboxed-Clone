import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

const INITIAL_STATE = {
  films: {},
  loading: false,
  error: null,
};

export const getAllFilms = createAsyncThunk(
  "getAllFilms/films",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/admin/get-all-filims");
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);
export const addFilm = createAsyncThunk(
  "addFilm/films",
  async (value, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/admin/add-movie",value);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);

const adminFilmSlice = createSlice({
  name: "film",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllFilms.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllFilms.fulfilled, (state, action) => {
      state.loading = false;
      state.films = action.payload;
    });
    builder.addCase(getAllFilms.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});


export default adminFilmSlice.reducer;