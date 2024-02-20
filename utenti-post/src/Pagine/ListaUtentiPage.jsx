import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getUtenti } from '../slice/listaUtentiSlice';

export default function ListaUtentiPage() {

    const dispatch = useDispatch();
    let listaUtenti = useSelector(state => state.chiamataUtenti.utenti);
    useEffect(() => {
        dispatch(getUtenti());
    }, [])

    useEffect(() => {
        console.log(listaUtenti);
    }, [listaUtenti]);


    return (
        <div>ListaUtentiPage</div>
    )
}
