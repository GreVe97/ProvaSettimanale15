import React from 'react';
import Container from 'react-bootstrap/Container';
import ListaPost from '../Componenti/ComponentiHome/ListaPost';
import SottoNavbar from '../Componenti/SottoNavbar';
export default function HomePage() {
  return (
    <>    
    <SottoNavbar/>
    <Container className='my-3'>  
        <h1>HomePage</h1>
        <Container>
            <ListaPost/>
        </Container>

    </Container>
    </>
  )
}
