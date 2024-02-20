import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { fieldsUrlImmagine, postUrl, url, urlImmagine } from '../data/data';




const initialState = {
    posts: {
        listaPost: [], 
        loading: null,
        error: "",
        successo: false,
    },

    immagini: {
        listaImmagini: [], 
        loading: null,
        error: "",
        successo: false,
    },
};

export const getAllPosts = createAsyncThunk("getAllPosts/fetch", async (params, {dispatch}) => {
    console.log("get all post!!");
    return axios(url + postUrl)
        .then(async (response) => { 
            for (const post of response.data) {
                if(post.featured_media===0){
                    dispatch(aggiungiImmagine());
                }else{
                    await dispatch(getAllPostsImages(post.featured_media));
                }
            }                 
            return response.data 
        })
});


export const getAllPostsImages = createAsyncThunk("getAllPostsImages/fetch", async (id) => {
    console.log("getAllPostsImages");
    return axios(url+ urlImmagine + id + fieldsUrlImmagine)
        .then((response) => {console.log(response.data); return response.data.guid.rendered})

})

const chiamataPosts_slice = createSlice(
    {
        name: 'chiamataPosts',
        initialState: initialState,
        reducers:  (create) => ( {
            aggiungiImmagine: create.reducer((state, action) => {
                state.immagini.listaImmagini.push("https://media.istockphoto.com/id/1409329028/it/vettoriale/nessuna-immagine-disponibile-icona-miniatura-segnaposto-illustrazione-design.jpg?s=612x612&w=0&k=20&c=Y8FyKtbLXWlxTa5lJvszJ__p6rAB38q6PnqlfM_C8zA=")
              }),
        }),
        extraReducers: builder => {
            builder.addCase(getAllPosts.pending, (state, action) => {
                state.posts.loading = true;
                state.posts.successo = false;
                state.immagini.listaImmagini=[];
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
                .addCase(getAllPostsImages.pending, (state, action) => {
                    state.posts.loading = true;
                    state.posts.successo = false;
                
                })
                .addCase(getAllPostsImages.rejected, (state, action) => {
                    state.immagini.loading = false
                    state.immagini.successo = false;
                    state.immagini.error = "Errore nel caricamento dei dati!!!"
                })
                .addCase(getAllPostsImages.fulfilled, (state, action) => {
                    state.immagini.loading = false;
                    state.immagini.listaImmagini.push(action.payload);                  
                    state.immagini.successo = true;
                    
                })
        }
    }
)
const { reducer, actions } = chiamataPosts_slice;
export const { aggiungiImmagine} = actions;
export default reducer;