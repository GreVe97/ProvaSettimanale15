import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { getCategorie } from '../slice/listaCategorieSlice';


export default function CategoriePage() {
    const dispatch = useDispatch();
    const categorie = useSelector(state=>state.chiamataCategorie.categorie);
    useEffect(()=>{
        dispatch(getCategorie());
    },[])

    useEffect(()=>{
        console.log(categorie);        
    },[categorie])

  return (
    <div>CategoriePage</div>
  )
}
