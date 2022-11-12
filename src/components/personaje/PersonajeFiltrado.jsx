import axios from "axios";
import React, { useEffect } from "react";
import CharacterService from "../../services/CharacterService";

const PersonajeFiltrado = ()=>{
  
    useEffect(()=>{
        CharacterService.filtrarNombre("edad", 30);
    },[]);
  
    return (
        <div>Personaje filtrado</div>
    )
}

export default PersonajeFiltrado;