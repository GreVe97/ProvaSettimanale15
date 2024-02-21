import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { categorieUrl,tutteCategorieUrl,url } from '../data/data';


const initialState = {
    categorie: [],
    loading: null,
    error: "",
    successo: false,
};

export const getCategorie = createAsyncThunk("GetCategorie/fetch", async () => {
    return axios(url + tutteCategorieUrl)
        .then((response) => {
            console.log(response);
            return response.data })

})

const chiamataCategorie_slice = createSlice(
    {
        name: 'chiamataCategorie',
        initialState: initialState,
        reducers: {},
        extraReducers: builder => {
            builder.addCase(getCategorie.pending, (state, action) => {
                state.loading = true;
                state.successo = false;
            })
                .addCase(getCategorie.rejected, (state, action) => {
                    state.loading = false
                    state.successo = false;
                    state.error = "Errore nel caricamento dei dati!!!"
                })
                .addCase(getCategorie.fulfilled, (state, action) => {
                    state.loading = false;
                    state.categorie = action.payload;                    
                    state.successo = true;
                 
                })
        }
    }
);
const { reducer, actions } = chiamataCategorie_slice;

export default reducer;