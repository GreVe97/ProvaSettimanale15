import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import { useDispatch, useSelector } from 'react-redux';
import CardAutore from '../CardAutore';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CardArticolo from '../ComponentiHome/CardArticolo';
import Spinner from 'react-bootstrap/Spinner';


export default function MettiDatiUtente() {
    const utente = useSelector(state=>state.utenteSelezionato.utente);
    const postUtente = useSelector(state => state.utenteSelezionato.postsUtente);
    const loading =useSelector(state => state.utenteSelezionato.loading);
    console.log(utente);
  return (
    <Container>
      {Object.keys(utente).length === 0 ? (
                <Spinner animation="border" className='mx-auto my-5' role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            ) :<CardAutore autore = {utente}/>}
        

        <h3>Lista Post:</h3>
        <Row xs={1} md={2} className="g-4 my-2" >
        
        {loading ?
          <Spinner animation="border" className='mx-auto my-5' role="status">
          <span className="visually-hidden">Loading...</span>
      </Spinner>
       :postUtente.map((post, index) => (
          <Col key={post.id}>
            <CardArticolo post={post} />
          </Col>
        ))}
      </Row>
   
    </Container>
  )
}
