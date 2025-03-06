import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./globalSlices.js";
import movieReducer from "./movieSlice.js";

export const store = configureStore({
  reducer: {
    globState: globalReducer,
    movies: movieReducer,
  },
});
