import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { utentiUrl,url } from '../data/data';


const initialState = {
    utenti: [],
    loading: null,
    error: "",
    successo: false,
    pagineTotali:1,
    paginaCorrente:1,
};

export const getUtenti = createAsyncThunk("GetUtenti/fetch", async (args=[1,""]) => {
    return axios(url + utentiUrl +"&page="+args[0]+(args[1] ? ("&search="+args[1]):""))
        .then(response =>  [response.data,response.headers["x-wp-totalpages"]] )

})

const chiamataUtenti_slice = createSlice(
    {
        name: 'chiamataUtenti',
        initialState: initialState,
        reducers:(create) => ({
              setPaginaCorrenteUtenti: create.reducer((state, action) => {
                state.paginaCorrente=action.payload;
              }),
          }),
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
                    state.utenti = action.payload[0];
                    state.pagineTotali = action.payload[1];
                    state.successo = true;                
                })
        }
    }
)
const { reducer, actions } = chiamataUtenti_slice;
export const {setPaginaCorrenteUtenti} = actions;

export default reducer;