import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import resultService from "./resultService";

const initialState = {
  results: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

// Get user results
export const getResults = createAsyncThunk(
  "results/getResults",
  async (_, thunkAPI) => {
    try {
      return await resultService.getResults();
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

export const createResult = createAsyncThunk(
  "results/createResult",
  async (result, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await resultService.createResult(result, token);
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

//update result
export const updateResult = createAsyncThunk(
  "results/updateResult",
  async (result, thunkAPI) => {
    try {
      return await resultService.updateResult(result);
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


export const resultSlice = createSlice({
  name: "result",
  initialState,
  reducers: {
    resetResult: (state) => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(getResults.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getResults.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.results = action.payload;
      })
      .addCase(getResults.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createResult.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createResult.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.results = action.payload;
      })
      .addCase(createResult.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.results = null;
      })
      .addCase(updateResult.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateResult.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.results = action.payload;
      })
      .addCase(updateResult.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.results = null;
      });
  },
});

export const { resetResult } = resultSlice.actions;
export default resultSlice.reducer;
