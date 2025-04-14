import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

const INITIAL_STATE = {
  members: {},
  loading: false,
  error: null,
};

export const getAllMemebrs = createAsyncThunk(
  "getAllMemebrs/members",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/admin/get-members");
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);
export const blockControll = createAsyncThunk(
  "blockControll/members",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/admin/block-user/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);

const adminMemberSlice = createSlice({
  name: "members",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllMemebrs.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllMemebrs.fulfilled, (state, action) => {
      state.loading = false;
      state.members = action.payload;
    });
    builder.addCase(getAllMemebrs.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default adminMemberSlice.reducer;
