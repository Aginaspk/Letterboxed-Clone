import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./globalSlices.js";
import movieReducer from "./movieSlice.js";
import authReducer from "../auth/authSlice.js";
import reviewReducer from "../redux/reviewSlice.js";
import listReducer from "../redux/listsSlice.js";
import newsReducer from "../redux/newsSlice.js";
import membersReducer from "../redux/membersSlice.js";
import seacrhReducer from "../redux/searchSlice.js";
import adminFilmReducer from "../redux/admin/filmSlice.js";
import adminListReducer from "../redux/admin/adminlistSlice.js";
import adminReviewReducer from "../redux/admin/adminReviews.js";
import { persistStore } from "redux-persist";

export const store = configureStore({
  reducer: {
    globState: globalReducer,
    movies: movieReducer,
    auth: authReducer,
    review: reviewReducer,
    lists: listReducer,
    news: newsReducer,
    members: membersReducer,
    search: seacrhReducer,
    adminFilm: adminFilmReducer,
    adminList: adminListReducer,
    adminReview: adminReviewReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
