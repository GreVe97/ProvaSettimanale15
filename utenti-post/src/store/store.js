import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import chiamataUtentiReducer from '../slice/listaUtentiSlice';
import chiamataPostsReducer from '../slice/listaPostSlice';



export const store = configureStore({
    reducer : {
        chiamataUtenti: chiamataUtentiReducer,
        chiamataPosts : chiamataPostsReducer,
    }
})



