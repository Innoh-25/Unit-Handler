import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const localstudent = JSON.parse(localStorage.getItem('student'))

const initialState = {
    student: localstudent ? localstudent : null,
    isLoading:false,
    isSuccess:false,
    isError:false,
    message: ''
}

export const register = createAsyncThunk(
    'auth/register',
     async(student,thunkAPI)=>{
        try {
            return await authService.register(student)
        } catch (error) {
            const message = (error.response?.data?.message)||error.message||error.toString()
            return thunkAPI.rejectWithValue(message)
        }
     }
)

export const logout = createAsyncThunk(
    'auth/logout',
    async()=>await authService.logout()
)

export const login = createAsyncThunk(
    'auth/login',
    async(student,thunkAPI)=>{
        try {
            return await authService.login(student)
        } catch (error) {
            const message = (error.response?.data?.message)||error.message||error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        reset: state=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        },
    },
    extraReducers:(builder)=>{
        builder
            .addCase(register.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(register.fulfilled,(state,action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.student = action.payload
            })
            .addCase(register.rejected,(state,action)=>{
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.student = null
            })
            
            .addCase(login.pending,(state)=>{
                state.isLoading = true
            })
            .addCase(login.fulfilled,(state,action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.student = action.payload
            })
            .addCase(login.rejected,(state,action)=>{
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.student = null
            })

            .addCase(logout.fulfilled,(state)=>{
                state.student = null
            })
    }
})



export const { reset } = authSlice.actions
export default authSlice.reducer