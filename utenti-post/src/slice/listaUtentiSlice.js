import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { utentiUrl,url } from '../data/data';


const initialState = {
    utenti: [],
    loading: null,
    error: "",
    successo: false,
};

export const getUtenti = createAsyncThunk("GetUtenti/fetch", async () => {
    return axios(url + utentiUrl)
        .then((response) => {return response.data })

})

const chiamataUtenti_slice = createSlice(
    {
        name: 'chiamataUtenti',
        initialState: initialState,
        reducers: {},
        extraReducers: builder => { builder
           .addCase(getUtenti.pending, (state, action) => {
                state.loading = true;
                state.successo = false;
            })
                .addCase(getUtenti.rejected, (state, action) => {
                    state.loading = false
                    state.successo = false;
                    state.error = "Errore nel caricamento dei dati!!!"
                })
                .addCase(getUtenti.fulfilled, (state, action) => {
                    state.loading = false;
                    state.utenti = action.payload;
                    
                    state.successo = true;
                 
                })
        }
    }
)
const { reducer, actions } = chiamataUtenti_slice;

export default reducer;