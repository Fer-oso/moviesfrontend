import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

import "../../css/estilos.css";
import CharacterService from "../../services/CharacterService";


const PersonajeInfo = () => {

  const [personajeInfo, setPersonajeInfo] = useState([]);
  const { id } = useParams();

  const producciones = personajeInfo.producciones;
  
  const imagen = personajeInfo.imagen;

  useEffect(() => {
    const showPersonaje = async () =>{
      await CharacterService.getPersonaje(id)
        .then((res) => {
          setPersonajeInfo(res.data);
        })
        .catch((error) => {
          console.log(error);
        });  
    }
      showPersonaje();
  }, []);


const mostrarPersonaje = () =>{
  if (personajeInfo) {
    return (
      <div key={personajeInfo.id}>
        <h4 className="card-title text-center">{personajeInfo.nombre}</h4>
        <h6 className="card-subtitle mb-2 text-muted">
          Peso: {personajeInfo.peso}kg
        </h6>
        <h6 className="card-subtitle mb-2 text-muted">
          Edad: {personajeInfo.edad} años
        </h6>
        <h6>{personajeInfo.historia}</h6>
      </div>
    );
  }
}


const showPersonajes = () =>{
    if (producciones) {
      return(
        producciones.map((produccion)=>(
        <ul  key={produccion.id} className="list-group list-group-flush">
          <li className="list-group-item">{produccion.titulo}</li>
        </ul>
       ))
      )
    }
    }

const showImage=()=>{
  if(imagen){
    return(
   //   imagen.map((img)=>(
        <div key={imagen.id} className="container">
          <img src={`http://127.0.0.1:8887/${imagen.nombre}`} className="imagen-personaje" alt=""></img>
          </div>
      )
    //  )
    //)
  }
}
const [open,setOpen] = useState(false);

  return (
    <div className="container">
      <div className="contenedor-imagen ">
        <div className="card mt-4">
          <div className="card-body">
            {mostrarPersonaje()}
            <div>
              <Button
                onClick={() => setOpen(!open)}
                aria-controls="example-collapse-text"
                aria-expanded={open}
              >
                Ver producciones
              </Button>
              <Collapse in={open}>
                <div id="example-collapse-text">{showPersonajes()}</div>
              </Collapse>
            </div>

            {showImage()}
            <Link
              to={`/editar-personaje/${personajeInfo.id}`}
              className="card-link"
            >
              Editar
            </Link>
            <Link to="/personajes" className="card-link">
              Volver
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PersonajeInfo;
