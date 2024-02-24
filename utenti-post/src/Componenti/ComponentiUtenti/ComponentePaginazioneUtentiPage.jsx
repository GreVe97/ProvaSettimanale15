import React, { useEffect } from "react";
import Pagination from "react-bootstrap/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { getUtenti, setPaginaCorrenteUtenti } from "../../slice/listaUtentiSlice";


export default function ComponentePaginazioneUtentiPage() {

    const dispatch = useDispatch();
    const pagineTotali = useSelector(state => state.chiamataUtenti.pagineTotali);
    const paginaCorrente = useSelector(state => state.chiamataUtenti.paginaCorrente);
    let listaUtenti = useSelector(state => state.chiamataUtenti.utenti);
    const loading = useSelector(state => state.chiamataUtenti.loading);

    const mostraPagine = 5;


    const handlePageClick = (pagina) => {
        window.scrollTo(0, 0);
        dispatch(setPaginaCorrenteUtenti(pagina));
        dispatch(getUtenti([pagina]));
    };

    let primaPagina = Math.max(1, paginaCorrente - Math.floor(mostraPagine / 2));
    let ultimaPagina = Math.min(pagineTotali, primaPagina + mostraPagine - 1);

    if (ultimaPagina - primaPagina < mostraPagine - 1) {
        primaPagina = Math.max(1, ultimaPagina - mostraPagine + 1);
    }

    const pagine = Array.from(
        { length: ultimaPagina - primaPagina + 1 },
        (_, index) => (
            <Pagination.Item
                style={{ width: "2.5rem" }}
                key={primaPagina + index}
                active={primaPagina + index === paginaCorrente}
                onClick={() => handlePageClick(primaPagina + index)}
            >
                {primaPagina + index}
            </Pagination.Item>
        )
    );

    return (
        <Pagination>
            <Pagination.First onClick={() => handlePageClick(1)} />
            <Pagination.Prev
                onClick={() => handlePageClick(Math.max(1, paginaCorrente - 1))}
            />
            {pagine}
            <Pagination.Next
                onClick={() =>
                    handlePageClick(Math.min(pagineTotali, paginaCorrente + 1))
                }
            />
            <Pagination.Last onClick={() => handlePageClick(pagineTotali)} />
        </Pagination>
    );
}
