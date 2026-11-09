import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import unitService from './unitService'

const initialState = {
    units: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message:''
}

export const createUnit = createAsyncThunk(
    'units/create',
     async(unit,thunkAPI)=>{
        try {
           const token = thunkAPI.getState().auth.student.token
            return await unitService.createUnit(unit,token)
        } catch (error) {
            const message = (error.response?.data?.message)||error.message||error.toString()
            return thunkAPI.rejectWithValue(message)
        }
     }
)

export const getUnits = createAsyncThunk(
    'units/getAll',
    async(_,thunkAPI)=>{
        try {
            const token = thunkAPI.getState().auth.student.token
            return await unitService.getUnits(token)
        } catch (error) {
            const message = (error.response?.data?.message)||error.message||error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const deleteUnit = createAsyncThunk(
    'unit/delete',
    async(id,thunkAPI)=>{
        try {
            const token = await thunkAPI.getState().auth.student.token
            return await unitService.deleteUnit(id,token)
        } catch (error) {
            const message = (error.response?.data?.message)||error.message||error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const unitSlice = createSlice({
    name:'unit',
    initialState,
    reducers: {
        reset: state => initialState
    },
    extraReducers: (builder)=>{
        builder
            .addCase(createUnit.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(createUnit.fulfilled,(state,action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.units.push(action.payload)
            })
            .addCase(createUnit.rejected,(state,action)=>{
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            }
            )
            .addCase(getUnits.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(getUnits.fulfilled,(state,action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.units = action.payload
            })
            .addCase(getUnits.rejected,(state,action)=>{
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            }
            )
            .addCase(deleteUnit.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(deleteUnit.fulfilled,(state,action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.units = state.units.filter(unit=>unit._id !== action.payload._id)
            })
            .addCase(deleteUnit.rejected,(state,action)=>{
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }

})

export const { reset } = unitSlice.actions
export default unitSlice.reducer