import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import usersService from "./usersService";

const initialState = {
  users: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

// Get user results
export const getUsers = createAsyncThunk(
  "users/findUsers",
  async (_, thunkAPI) => {
    try {
      return await usersService.getUsers();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    resetResult: (state) => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // .addCase(createResult.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(createResult.fulfilled, (state, action) => {
      //   state.isSuccess = true;
      //   state.isLoading = false;
      //   state.results = action.payload;
      // })
      // .addCase(createResult.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.isError = true;
      //   state.message = action.payload;
      //   state.results = null;
      // });
  },
});

export const { resetUsers } = usersSlice.actions;
export default usersSlice.reducer;
