import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import resultService from './resultService'


const initialState ={
    results: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: '',
}

// Get user results
export const getResults = createAsyncThunk('results/getAll',
    async ( _ , thunkAPI) => {
        try {
            return await resultService.getResults()
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message)
            || error.message || 
            error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const createResult = createAsyncThunk('results/createResult',
    async ( result , thunkAPI) => {
        try {
            return await resultService.createResult(result)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message)
            || error.message || 
            error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)


export const resultSlice = createSlice({
    name: 'result',
    initialState,
    reducers: {
        reset: (state) => initialState
    },

    extraReducers: (builder) => {
      builder
        .addCase(getResults.pending, (state) => {
          state.isLoading = true
        })
        .addCase(getResults.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.results = action.payload //returns new result created
        })
        .addCase(getResults.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
        .addCase(createResult.pending, (state) => {
          state.isLoading = true
        })
        .addCase(createResult.fulfilled, (state, action) => {
          state.isSuccess = true
          state.isLoading = false
          state.results = action.payload
        })
        .addCase(createResult.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
          state.results = null
        })
    }
})

export const { reset } = resultSlice.actions
export default resultSlice.reducer