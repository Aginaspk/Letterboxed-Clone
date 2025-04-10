import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

const INITIAL_STATE = {
  lists: {},
  loading: false,
  error: null,
};


export const getAllLists = createAsyncThunk(
    "getAllLists/lists",
    async (_, { rejectWithValue }) => {
      try {
        const { data } = await api.get("/admin/get-all-lists");
        return data;
      } catch (error) {
        return rejectWithValue(
          error.response ? error.response.data.message : error.message
        );
      }
    }
  );


  const adminlistSlice = createSlice({
    name: "film",
    initialState: INITIAL_STATE,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(getAllLists.pending, (state, action) => {
        state.loading = true;
      });
      builder.addCase(getAllLists.fulfilled, (state, action) => {
        state.loading = false;
        state.lists = action.payload;
      });
      builder.addCase(getAllLists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    },
  });


  export default adminlistSlice.reducer;