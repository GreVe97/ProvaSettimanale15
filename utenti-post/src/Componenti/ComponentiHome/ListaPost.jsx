import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../../slice/listaPostSlice';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CardArticolo from './CardArticolo';
import Spinner from 'react-bootstrap/Spinner';
import ComponentePaginazioneHome from './ComponentePaginazioneHome';
import Container from 'react-bootstrap/esm/Container';


export default function ListaPost() {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.chiamataPosts.posts.listaPost);
  const loading = useSelector(state => state.chiamataPosts.posts.loading);
  const categoriaSelezionata = useSelector(state => state.chiamataPosts.posts.categoriaSelezionata);


  useEffect(() => {
    if (posts.length == 0) {
      dispatch(getAllPosts());
    }

  }, []);

  useEffect(() => {
    console.log(posts)
  }, [posts]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categoriaSelezionata])

  return (
    <>
      <Row xs={1} md={2} className="g-4 my-2" >

        {loading ?
          <Spinner animation="border" className='mx-auto my-5' role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          : <>{posts.map((post, index) => (
            <Col key={post.id}>
              <CardArticolo post={post} />
            </Col>
          ))}
            <Container className="my-4 w-75 d-flex justify-content-center">
              <ComponentePaginazioneHome />
            </Container>
          </>}
      </Row>
    </>
  )
}
