
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './Pagine/HomePage';
import ListaUtentiPage from './Pagine/ListaUtentiPage';
import NotFoundPage from './Pagine/NotFoundPage';
import NavbarBella from './Componenti/NavbarBella';
import CategoriePage from './Pagine/CategoriePage';
import ArticoloPage from './Pagine/ArticoloPage'
function App() {
  return (
    <BrowserRouter>
    <NavbarBella/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/utenti/" element={<ListaUtentiPage />} />
        <Route path="/categorie/" element={<CategoriePage/>}/>
        <Route path="/articolo/:id" element={<ArticoloPage/>}/>
        <Route path="*" element={< NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
