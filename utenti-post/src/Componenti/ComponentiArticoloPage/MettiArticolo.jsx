import React from 'react';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { categorieUrl, url, urlImmagine } from '../../data/data';
import { useNavigate, useParams } from 'react-router-dom';
import CardAutore from '../CardAutore';
import { getCategorie } from '../../slice/listaCategorieSlice';
import { getAllPosts, selezionaCategoria } from '../../slice/listaPostSlice';
import Button from 'react-bootstrap/Button';



export default function MettiArticolo() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [{ id }, setId] = useState(useParams());
    const articolo = useSelector(state => state.chiamataPosts.posts.postSelezionato);
    const loadingPosts = useSelector(state => state.chiamataPosts.posts.loading);

    console.log(articolo);

    useEffect(() => {
        if (loadingPosts) {
            navigate("/");
        }

    }, [loadingPosts])
    return (
        <Container className='my-3'>
            <h1 className='my-3' dangerouslySetInnerHTML={{ __html: articolo.title.rendered }} ></h1>
            <div className='autori'>
                {articolo._embedded.author.map(ele => <CardAutore key={ele.id} autore={ele} />)}
            </div>
            <div className='my-3'>
                <span className='me-2 h6'>Categories:</span>
                {articolo.categorie.map(categoria => 
                    <Button
                        key={categoria.id}
                        className='py-1 px-2 mx-1'
                        value={categoria.id}
                        type="checkbox"
                        variant={'outline-success'}
                        onClick={() => {
                            dispatch(getAllPosts([categoria.id]));
                            dispatch(selezionaCategoria(categoria.id));
                        }}
                    >
                        {categoria.name}
                    </Button>
                )}
            </div>
            <Container className='articolo my-4' dangerouslySetInnerHTML={{ __html: articolo.content.rendered }}>
            </Container>
        </Container>
    )
}
