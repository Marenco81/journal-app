
import { Login } from '@mui/icons-material';
import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'not-authenticated', // 'checking', 'not-authenticated' , 'authenticated'
        uid: null,
        email:null,
        displaName:null,
        photoURL: null,
        errorMessage: null,
    },
    reducers: {
        login: (state, action) => {

        },
        logout: (state, action) => {

        },
        checkingCredentials: (state) => {
            state.status = 'checking';
        }
    }
});


// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials } = authSlice.actions;