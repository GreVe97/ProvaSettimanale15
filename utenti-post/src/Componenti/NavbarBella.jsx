import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllPosts, selezionaCategoria } from '../slice/listaPostSlice';
import { getUtenti } from '../slice/listaUtentiSlice';
import { useSelector } from 'react-redux';

export default function NavbarBella() {

  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [categoriaRicerca,setCategoriaRicerca]=useState(null);
  const location = useLocation();
  const categorie = useSelector(state => state.chiamataCategorie.categorie);
  const categoriaSelezionata = useSelector(state => state.chiamataPosts.posts.categoriaSelezionata);



  useEffect(() => {
    setQuery("");
  }, [location])

  const handleInputChange = (event) => {
    setQuery(event.target.value.trim());    
    if (event.target.value.trim()=="") {
      if (location.pathname === "/") {
         dispatch(getAllPosts([categoriaSelezionata]));
      }else if (location.pathname === "/utenti/"){
        dispatch(getUtenti());
      }
    }
  };

  function cerca(event) {
    event.preventDefault();
    if (location.pathname === "/") { 
      dispatch(selezionaCategoria(categoriaRicerca));
      dispatch(getAllPosts([categoriaRicerca, 1, query]));     
    }else if (location.pathname === "/utenti/"){
      dispatch(getUtenti([1,query]));
    }
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/utenti/">Lista Utenti</Nav.Link>
          </Nav>  
          {location.pathname === "/" && <div className="form-floating me-3">
              <Form.Select aria-label="Default select example" onChange={(e)=>{
                if (e.target.value=="Qualsiasi") {
                  setCategoriaRicerca(null);
                }else{
                  console.log(e.target.value);
                   setCategoriaRicerca(e.target.value)
                }
               }}>
                <option value={null}>Qualsiasi</option>
                  {categorie.map(categoria=>
                    <option key={categoria.id} value={categoria.id}>{categoria.name}</option> )}
                
              </Form.Select>
              <label htmlFor="floatingSelect">Scegli la categoria</label>
            </div>}
         {(location.pathname === "/"||location.pathname === "/utenti/") && <Form className="d-flex" onSubmit={cerca}>
          
            <Form.Control
              onChange={handleInputChange}
              type="search"
              placeholder={location.pathname === "/" ? "Cerca Post" : "Cerca Utenti"}
              className="me-2"
              aria-label="Search"
              value={query}
            />
            <Button type="submit" variant="outline-success">Cerca</Button>
          </Form>}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
