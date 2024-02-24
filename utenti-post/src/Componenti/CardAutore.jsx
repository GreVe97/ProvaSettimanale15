import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selezionaUtente, getUtentePosts } from '../slice/utenteSelezionatoSlice';
import Spinner from 'react-bootstrap/Spinner';

export default function CardAutore({ autore }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

 

    return (
        <>
          
                <div
                    className="card mb-0 border border-0 my-3 mx-2 manina"
                    style={{ maxWidth: 540 }}
                    onClick={() => {
                        dispatch(selezionaUtente(autore));
                        dispatch(getUtentePosts(autore.id));
                        navigate('/utente/' + autore.id);
                    }}
                >
                    <div className="d-flex">
                        <div className="flex-shrink-0 justify-self-center">
                            <img
                                style={{ maxWidth: "96px" }}
                                src={autore.avatar_urls["96"]}
                                className="img-fluid rounded-circle"
                                alt="..."
                            />
                        </div>
                        <div className="flex-grow-1 mx-1">
                            <div className="card-body ps-2 pt-0">
                                <p style={{ fontSize: "1rem", fontWeight: "500", padding: "0px" }} className="card-title mb-0">{autore.name}</p>
                                <p className="mb-1 mt-2">
                                    {autore.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            
        </>
    );
}
