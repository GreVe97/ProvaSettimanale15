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
        pagineTotali:1,
        paginaCorrente:1,
    },  
};
export const getAllPosts = createAsyncThunk("getAllPosts/fetch", async (args=[null,1], { dispatch }) => {
    console.log("id categoria" ,args[0]);
    console.log("pagina",args[1]);
    console.log("get all post!!");
        return axios(url + postUrl + (args[0] ? (`&categories=`+args[0]):"")+(args[1] ? ("&page="+args[1]):""))
        .then(response => { 
            if (args[1]) {
               dispatch(setPaginaCorrentePosts(args[1])); 
            }else{
                dispatch(setPaginaCorrentePosts(1));
            }
            
            console.log(response.headers["x-wp-totalpages"]);
            return [response.data,response.headers["x-wp-totalpages"]] 
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
              setPaginaCorrentePosts: create.reducer((state, action) => {
                state.posts.paginaCorrente=action.payload;
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
                    state.posts.listaPost = action.payload[0];                
                    state.posts.successo = true;  
                    state.posts.pagineTotali =  action.payload[1];                 
                })
        }
    }
)
const { reducer, actions } = chiamataPosts_slice;
export const {selezionaCategoria, selezionaPost, setPaginaCorrentePosts} = actions;
export default reducer;