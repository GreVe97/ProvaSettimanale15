import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '../../slice/listaPostSlice';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CardArticolo from './CardArticolo';


export default function ListaPost() {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.chiamataPosts.posts.listaPost);
  const categoriaSelezionata = useSelector(state => state.chiamataPosts.posts.categoriaSelezionata);

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

  useEffect(() => {
    console.log(posts)
  }, [posts]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, [categoriaSelezionata])

  return (
    <>
      <Row xs={1} md={2} className="g-4 my-2" >
        {posts.map((post, index) => (
          <Col key={post.id}>
            <CardArticolo post={post} />
          </Col>
        ))}
      </Row>
    </>
  )
}
