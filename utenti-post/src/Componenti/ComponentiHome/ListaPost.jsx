import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts, getAllPostsImages } from '../../slice/listaPostSlice';
import { aggiungiImmagine } from '../../slice/listaPostSlice';


export default function ListaPost() {
    const dispatch = useDispatch();
    let posts = useSelector(state => state.chiamataPosts.posts.listaPost);
    let postsImmagini = useSelector(state => state.chiamataPosts.immagini.listaImmagini);
    let postsSuccesso = useSelector(state => state.chiamataPosts.posts.successo);

    useEffect(() => {
        dispatch(getAllPosts());
    }, []);

    useEffect(() => {
        console.log(posts)
    }, [posts]);
    
    useEffect(() => {
        console.log(postsImmagini);
      
    }, [postsImmagini]);


    


    return (
        <div>ListaPost</div>
    )
}
