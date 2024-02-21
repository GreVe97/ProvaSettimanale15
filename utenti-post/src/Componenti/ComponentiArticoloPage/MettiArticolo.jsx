import React from 'react';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { categorieUrl, url, urlImmagine } from '../../data/data';
import { useNavigate, useParams } from 'react-router-dom';

export default function MettiArticolo() {
    const [{ id }, setId] = useState(useParams());
    const articolo = useSelector(state => state.chiamataPosts.posts.postSelezionato);
    console.log(articolo);
    useEffect(() => {
        console.log(id);
        axios.get(url + "wp-json/wp/v2/posts/" + id)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    }, [id])
    return (
        <Container className='my-3'>
            <h1 dangerouslySetInnerHTML={{ __html: articolo.title.rendered }}></h1>
            <Container className='articolo my-4' dangerouslySetInnerHTML={{ __html: articolo.content.rendered }}>

            </Container>
        </Container>
    )
}
