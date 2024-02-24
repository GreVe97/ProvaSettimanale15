import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUtenti, setPaginaCorrenteUtenti } from '../../slice/listaUtentiSlice';
import Container from 'react-bootstrap/esm/Container';
import CardAutore from '../CardAutore';
import Spinner from 'react-bootstrap/Spinner';
import ComponentePaginazioneUtentiPage from './ComponentePaginazioneUtentiPage';

export default function ListaUtenti() {
    const dispatch = useDispatch();
    let listaUtenti = useSelector(state => state.chiamataUtenti.utenti);
    const loading = useSelector(state => state.chiamataUtenti.loading);


    useEffect(() => {
        if(listaUtenti.length===0){
            dispatch(getUtenti());
            dispatch(setPaginaCorrenteUtenti(1));
        }       
    }, [])

    useEffect(() => {
        console.log(listaUtenti);
    }, [listaUtenti]);

  return (
    <>
    {loading ? 
    <Spinner animation="border" className='mx-auto my-5 d-flex justify-center' role="status">
    <span className="visually-hidden">Loading...</span>
</Spinner>
    :<Container className='my-3'>
        <h2>Lista Utenti</h2>
        <div className='utenti'>
            {listaUtenti.length >0 && listaUtenti.map(ele=><CardAutore autore={ele} key={ele.id}/>) }

        </div>
        <Container className="my-4 d-flex justify-center">
        <ComponentePaginazioneUtentiPage/>
        </Container>
    </Container>}
    </>
  )
}
