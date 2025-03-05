import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./globalSlices.js";

export const store = configureStore({
  reducer: {
    globState: globalReducer,
  },
});
