
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
        login: (state, {payload}) => {
            state.status= 'authenticated'; // 'checking', 'not-authenticated' , 'authenticated'
            state.uid= payload.uid ;
            state.email= payload.email ;
            state.displaName= payload.displaName ;
            state.photoURL= payload.photoURL;
            state.errorMessage= null;

        },
        logout: (state, {payload}) => {
            state.status= 'not-authenticated'; // 'checking', 'not-authenticated' , 'authenticated'
            state.uid= null;
            state.email= null;
            state.displaName= null;
            state.photoURL= null;
            state.errorMessage= payload.errorMessage;

        },
        checkingCredentials: (state) => {
            state.status = 'checking';
        }
    }
});


// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials } = authSlice.actions;