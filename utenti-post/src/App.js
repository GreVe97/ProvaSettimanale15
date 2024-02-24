
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './Pagine/HomePage';
import ListaUtentiPage from './Pagine/ListaUtentiPage';
import NotFoundPage from './Pagine/NotFoundPage';
import NavbarBella from './Componenti/NavbarBella';
import ArticoloPage from './Pagine/ArticoloPage'
import UtentePage from './Pagine/UtentePage';
import Scrollata from './Componenti/Scrollata';
function App() {
  return (
    <BrowserRouter scrollToTop={true}>
    <NavbarBella/>
    <Scrollata/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/utenti/" element={<ListaUtentiPage />} />
        <Route path="/utente/:id" element={<UtentePage/>}/>
        <Route path="/articolo/:id" element={<ArticoloPage/>}/>
        <Route path="*" element={< NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
