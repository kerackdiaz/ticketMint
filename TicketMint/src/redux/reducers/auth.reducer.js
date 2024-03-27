import { createReducer } from "@reduxjs/toolkit";
import { login,current, logout } from '../actions/auth.actions';

const initialState = {
    user:{
        name:'',
        email:'',
        loggedIn: null,

    },
    token: null,
    timestamps: null
    }


const authReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(login, (state, action) => {
           return {
            ...state,
            token:action.payload.token,
            timestamps:action.payload.timestamps
           }
        })
        .addCase(current, (state, action) => {
            return {
                ...state,
                user:action.payload
               }
        })
        .addCase(logout, (state, action) => {
            return {
                ...state,
                user:action.payload.loggedIn=false
               }
        });
});


export default authReducer;