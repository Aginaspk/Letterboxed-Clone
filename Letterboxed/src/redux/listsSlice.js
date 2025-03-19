import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/api";

const INITIAL_STATE = {
  popLists: {},
  loading: true,
  error: null,
};

export const getPopularLists = createAsyncThunk(
  "lists/getPopularLists",
  async (_, { rejectWithValue }) => {
    try {
        const {data} = await api.get('/user/popularLists');
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
    builder.addCase(getPopularLists.pending,(state,action)=>{
        state.loading = true;
    })
    .addCase(getPopularLists.fulfilled,(state,action)=>{
        state.loading = false;
        state.popLists = action.payload;
    })
    .addCase(getPopularLists.rejected,(state,action)=>{
        state.loading = false;
        state.error = action.payload;
    })
  },
});


export default listsSlice.reducer;