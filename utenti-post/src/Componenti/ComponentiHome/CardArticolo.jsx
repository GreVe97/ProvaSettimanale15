import React from 'react';
import Card from 'react-bootstrap/Card';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import { getAllPosts, selezionaCategoria, selezionaPost  } from '../../slice/listaPostSlice';
import { useNavigate } from 'react-router-dom';

export default function CardArticolo({ post }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const posts = useSelector(state => state.chiamataPosts.posts.listaPost);
    let [immagine, setImmagine] = useState("");
    let [categorie, setCategorie] = useState([]);

    useState(() => {
        setImmagine("");
        setCategorie([]);
        if (posts.length > 0) {
            if (post.featured_media !=0 ){
                setImmagine(post._embedded["wp:featuredmedia"][0].source_url);
            }else{
                setImmagine("https://southeastlandconsultants.com/wp-content/themes/u-design/assets/images/placeholders/post-placeholder.jpg");
            };            
        }
       setCategorie(post._embedded["wp:term"][0])
    }, [post]);

    function vediArticolo(){
        dispatch(selezionaPost({...post,immagine:immagine,categorie:categorie}));
        navigate(`/articolo/${post.id}`);
    }

    return (
        <Card>
            {immagine ?
                <Card.Img className="manina" variant="top" src={immagine} onClick={()=>{vediArticolo();}} /> :
                <Spinner animation="border" className='mx-auto my-5' role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>}
            <Card.Body>
                <Card.Title 
                dangerouslySetInnerHTML={{ __html: post.title.rendered }} 
                onClick={()=>{vediArticolo();}}
                className='manina'>
                </Card.Title>
                <div>
                    <div className='my-2'>
                        {categorie.map(categoria =>
                            <Button 
                            key={categoria.name} 
                            variant="secondary" 
                            className='p-1 mx-1'
                            onClick={()=> {dispatch(getAllPosts(categoria.id)); dispatch(selezionaCategoria(categoria.id));}}>
                                {categoria.name} {/* <small className=''>({categoria.count})</small> */}
                            </Button>)}
                    </div>
                    <div
                        className="card-text manina"
                        onClick={()=>{vediArticolo();}}

                        dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                    ></div>
                </div>

            </Card.Body>
        </Card>
    )
}
