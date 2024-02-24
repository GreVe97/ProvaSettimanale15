import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { getCategorie } from '../slice/listaCategorieSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import ToggleButton from 'react-bootstrap/ToggleButton';
import { getAllPosts, selezionaCategoria } from '../slice/listaPostSlice';
import Spinner from 'react-bootstrap/esm/Spinner';

export default function SottoNavbar() {
  const dispatch = useDispatch();
  const categorie = useSelector(state => state.chiamataCategorie.categorie);
  const categoriaSelezionata = useSelector(state => state.chiamataPosts.posts.categoriaSelezionata);
  const loading = useSelector(state => state.chiamataCategorie.loading);

  useEffect(() => {
    if (categorie.length === 0) {
      dispatch(getCategorie());
    }
  }, []);

  return (
    <Navbar expand="lg" className="bg-body-secondary px-4" style={{ height: "3rem" }}>
      <Navbar.Brand >Categorie:</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          {loading ?
            <Spinner animation="border ms-5" className='mx-auto my-5' role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner> : <>
              <ToggleButton
                className='py-1 px-2 mx-1'
                checked={!categoriaSelezionata}
                type="checkbox"
                variant={'outline-success'}
                onClick={() => { dispatch(getAllPosts()); dispatch(selezionaCategoria(null)); }}
              >
                Qualsiasi
              </ToggleButton>
              {categorie.map(categoria =>
                <ToggleButton
                  key={categoria.id}
                  className='py-1 px-2 mx-1'
                  value={categoria.id}
                  checked={categoria.id === categoriaSelezionata}
                  type="checkbox"
                  variant={'outline-success'}
                  onClick={() => { dispatch(getAllPosts([categoria.id])); dispatch(selezionaCategoria(categoria.id)); }}
                >
                  {categoria.name} <small>({categoria.count})</small>
                </ToggleButton>)} </>}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
