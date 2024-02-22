import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {postUrl, url} from '../data/data';

const initialState = {
    utente:{},
    postsUtente: [], 
    loading: null,
    error: "",   
};
export const getUtentePosts = createAsyncThunk("getUtentePosts/fetch", async (id) => {
    console.log("get all post!!");
        return axios(url + postUrl +"&author="+id)
        .then(async (response) => { 
            return response.data 
        })
});

const utenteSelezionato_slice = createSlice(
    {
        name: 'utenteSelezionato',
        initialState: initialState,
        reducers: (create) => ({
            selezionaUtente: create.reducer((state, action) => {
              state.utente=action.payload;
            }),
          }),
        extraReducers: builder => {
            builder.addCase(getUtentePosts.pending, (state, action) => {
                state.loading = true;               
            })
                .addCase(getUtentePosts.rejected, (state, action) => {
                    state.loading = false;                    
                    state.error = "Errore nel caricamento dei dati!!!"
                })
                .addCase(getUtentePosts.fulfilled, (state, action) => {
                    state.loading = false;
                    state.postsUtente = action.payload;                             
                })
        }
    }
)
const { reducer, actions } = utenteSelezionato_slice;
export const {selezionaUtente} = actions;
export default reducer;