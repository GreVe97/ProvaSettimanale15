import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {postUrl, url} from '../data/data';

const initialState = {
    posts: {
        listaPost: [], 
        loading: null,
        error: "",
        successo: false,
        postSelezionato:{},
        categoriaSelezionata : null,
    },
};
export const getAllPosts = createAsyncThunk("getAllPosts/fetch", async (categoria=null) => {
    console.log("get all post!!");
        return axios(url + postUrl + (categoria ? (`&categories=`+categoria):"") )
        .then(async (response) => { 
            return response.data 
        })
});

const chiamataPosts_slice = createSlice(
    {
        name: 'chiamataPosts',
        initialState: initialState,
        reducers: (create) => ({
            selezionaCategoria: create.reducer((state, action) => {
              state.posts.categoriaSelezionata=action.payload;
            }),
            selezionaPost: create.reducer((state, action) => {
                state.posts.postSelezionato=action.payload;
              }),
          }),
        extraReducers: builder => {
            builder.addCase(getAllPosts.pending, (state, action) => {
                state.posts.loading = true;
                state.posts.successo = false;
            })
                .addCase(getAllPosts.rejected, (state, action) => {
                    state.posts.loading = false
                    state.posts.successo = false;
                    state.posts.error = "Errore nel caricamento dei dati!!!"
                })
                .addCase(getAllPosts.fulfilled, (state, action) => {
                    state.posts.loading = false;
                    state.posts.listaPost = action.payload;                
                    state.posts.successo = true;
                   
                })
        }
    }
)
const { reducer, actions } = chiamataPosts_slice;
export const {selezionaCategoria, selezionaPost} = actions;
export default reducer;