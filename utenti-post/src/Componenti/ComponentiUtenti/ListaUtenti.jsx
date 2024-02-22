import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUtenti } from '../../slice/listaUtentiSlice';
import Container from 'react-bootstrap/esm/Container';
import CardAutore from '../CardAutore';

export default function ListaUtenti() {
    const dispatch = useDispatch();
    let listaUtenti = useSelector(state => state.chiamataUtenti.utenti);

    useEffect(() => {
        dispatch(getUtenti());
    }, [])

    useEffect(() => {
        console.log(listaUtenti);
    }, [listaUtenti]);

  return (
    <Container className='my-3'>
        <h2>Lista Utenti</h2>
        <div className='utenti'>
            {listaUtenti.length >0 && listaUtenti.map(ele=><CardAutore autore={ele} key={ele.id}/>) }

        </div>
    </Container>
  )
}
