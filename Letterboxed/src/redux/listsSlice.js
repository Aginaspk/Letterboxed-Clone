import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/api";

const INITIAL_STATE = {
  popLists: {},
  popOfWeek: {},
  recentlyLiked:{},
  listById:{},
  isLiked:{},
  loading: true,
  error: null,
};

export const getPopularLists = createAsyncThunk(
  "lists/getPopularLists",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/user/popularLists");
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);

export const getPopOfWeek = createAsyncThunk(
  "lists/getPopOfWeek",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/user/getPopOfWeek");
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);
export const getRecentlyLiked = createAsyncThunk(
  "lists/getRecentlyLiked",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/user/getRecentlyLikedList");
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);
export const getListById = createAsyncThunk(
  "lists/getListById",
  async (listId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/user/getListById/${listId}`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);
export const likeAList = createAsyncThunk(
  "lists/likeAList",
  async (listId, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`/user/likeList`,{listId});
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);
export const isUserLiked = createAsyncThunk(
  "lists/isUserLiked",
  async (listId, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`/user/isLiked`,{listId});
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);
const listsSlice = createSlice({
  name: "lists",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPopularLists.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getPopularLists.fulfilled, (state, action) => {
        state.loading = false;
        state.popLists = action.payload;
      })
      .addCase(getPopularLists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getPopOfWeek.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getPopOfWeek.fulfilled, (state, action) => {
        state.loading = false;
        state.popOfWeek = action.payload;
      })
      .addCase(getPopOfWeek.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getRecentlyLiked.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getRecentlyLiked.fulfilled, (state, action) => {
        state.loading = false;
        state.recentlyLiked = action.payload;
      })
      .addCase(getRecentlyLiked.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getListById.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getListById.fulfilled, (state, action) => {
        state.loading = false;
        state.listById = action.payload;
      })
      .addCase(getListById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(isUserLiked.fulfilled, (state, action) => {
        state.loading = false;
        state.isLiked = action.payload;
      })
  },
});

export default listsSlice.reducer;
