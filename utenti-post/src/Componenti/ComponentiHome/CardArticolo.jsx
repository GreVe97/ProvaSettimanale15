import React from 'react';
import Card from 'react-bootstrap/Card';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import { getAllPosts, selezionaCategoria, selezionaPost  } from '../../slice/listaPostSlice';
import { useNavigate } from 'react-router-dom';
import { getUtentePosts, selezionaUtente } from '../../slice/utenteSelezionatoSlice';

export default function CardArticolo({ post }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const posts = useSelector(state => state.chiamataPosts.posts.listaPost);
    let [immagine, setImmagine] = useState("https://southeastlandconsultants.com/wp-content/themes/u-design/assets/images/placeholders/post-placeholder.jpg");
    let [categorie, setCategorie] = useState([]);

    useState(() => {
        setCategorie([]);
        if (posts.length > 0) {
            if (post.featured_media !=0 ){
                setImmagine(post._embedded["wp:featuredmedia"][0].source_url);
            }            
        }
       setCategorie(post._embedded["wp:term"][0])
    }, [post]);

    function vediArticolo(){
        dispatch(selezionaPost({...post,immagine:immagine,categorie:categorie}));
        navigate(`/articolo/${post.id}`);
    }

    return (
        <Card>
           
                <Card.Img className="manina" variant="top" src={immagine} onClick={()=>{vediArticolo();}} /> :
                
            <Card.Body>
                <Card.Title 
                dangerouslySetInnerHTML={{ __html: post.title.rendered }} 
                onClick={()=>{vediArticolo();}}
                className='manina'>
                </Card.Title>
                <div className='autoriCard ps-3'>
                    {post._embedded.author.map(ele=> <h6 key={ele.id} className='text-secondary manina' onClick={()=>{
            dispatch(selezionaUtente(ele));
            dispatch(getUtentePosts(ele.id));
            navigate('/utente/'+ele.id)}}>{ele.name}</h6>)}

                </div>
                <div>
                    <div className='my-2'>
                        {categorie.map(categoria =>
                            <Button 
                            key={categoria.name} 
                            variant="secondary" 
                            className='p-1 mx-1'
                            onClick={()=> {
                                dispatch(getAllPosts(categoria.id)); 
                                dispatch(selezionaCategoria(categoria.id));
                                navigate("/")}}>
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
