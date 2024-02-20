import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts, getAllPostsImages } from '../../slice/listaPostSlice';
import { aggiungiImmagine } from '../../slice/listaPostSlice';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CardArticolo from './CardArticolo';


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
        <>
        
        
        <Row xs={1} md={2} className="g-4 my-2" >
      {posts.map((post,index )=> (
        <Col key={post.id}>
          <CardArticolo post={post} immagine={postsImmagini[index]}/>
        </Col>
      ))}
    </Row>
        
        
        </>
    )
}
