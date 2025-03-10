import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./globalSlices.js";
import movieReducer from "./movieSlice.js";
import authReducer from "../auth/authSlice.js";
import reviewReducer from "../redux/reviewSlice.js";
import { persistStore } from "redux-persist";

export const store = configureStore({
  reducer: {
    globState: globalReducer,
    movies: movieReducer,
    auth: authReducer,
    review: reviewReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
