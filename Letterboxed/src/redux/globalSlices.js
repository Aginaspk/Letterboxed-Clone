import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  isNavHover: false,
  isMovieCreateOpen: false,
  isMovieUpdateOpen: false,
  updateId: null,
};

const globalSlice = createSlice({
  name: "globalState",
  initialState: INITIAL_STATE,
  reducers: {
    setNavHover: (state, action) => {
      state.isNavHover = action.payload;
    },
    setMovieCreateOpen: (state, action) => {
      state.isMovieCreateOpen = action.payload;
    },
    setMovieUpdateOpen: (state, action) => {
      state.isMovieUpdateOpen = action.payload;
    },
    setUpdateId: (state, action) => {
      state.updateId = action.payload;
    },
  },
});

export const {
  setNavHover,
  setMovieCreateOpen,
  setMovieUpdateOpen,
  setUpdateId,
} = globalSlice.actions;
export default globalSlice.reducer;
