import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import CharacterService from "../../services/CharacterService";
import ProduccionesService from "../../services/ProduccionesService";

import Select from "react-select";

const CrearPersonaje = () => {

  //CARGO EN EL STATE LOS VALORES OBTENIDOS DEL FORMULARIO  
  const [personaje, setPersonaje] = useState({
    nombre: "",
    peso: "",
    edad: "",
    historia: "",
  });

  const [listaProducciones, setlistaProducciones] = useState([]);

  //CARGO EN EL STATE LA IMAGEN OBTENIDA DEL FORMULARIO
  const [imagen, setImagen] = useState([
  ]);

  //FUNCIONES PARA PODER OBTENER LOS VALORES DEL FORMULARIO
  const handleInput = (e) => {
    const { name, value } = e.target;
    console.log(e.target.value);
    setPersonaje({
      ...personaje,
      [name]: value,
    });
  };

useEffect(()=>{
  const listaProducciones = async ()=>{
    await ProduccionesService.showProducciones()
    .then((res)=>{
      setlistaProducciones(res.data);
    })
    .catch((error)=>{
      console.log(error);
    })
  }
  listaProducciones();},[]);

  const handleInputFile = (e) => {
    const imagen = e.target.files[0];
    setImagen(imagen);
  };



    const handleSelectChangeProd = (e) => {
      console.log(e.forEach( (e)=>(
        e.value
      ) ))
      setPersonaje({
        ...personaje,
        producciones : [e]
      });
    };

 

  //PARA PODER ENVIAR LA INFORMACION A LA API NECESITO TRANSFORMAR LOS VALORES A JSON
  const json = JSON.stringify(personaje);
  const blob = new Blob([json], {
    type: "application/json",
  });


  const handleForm = (e) => {
    e.preventDefault();
    console.log(personaje);
  };

  const navigate = useNavigate();

  //FUNCION PARA HACER EL POST
  const crearPersonaje = (e) => {
    e.preventDefault();
    const formDataPersonaje = new FormData();
    formDataPersonaje.append("personaje", blob);
    formDataPersonaje.append("imagen", imagen);
    CharacterService.crearPersponaje(formDataPersonaje)
      .then((res) => {
        console.log(res);
        navigate("/personajes");
      })
      .catch((error) => {
        console.log(error);
      });
  };


const cargarProducciones = ()=>{
  if(listaProducciones){
    return (
      <Select
        isMulti="true"
        name="produccion"
        defaultValue={{ label: "Selecciona una produccion" }}
        options={listaProducciones.map((produccion) => ({
          label: produccion.titulo,
          value: produccion,
        }))}
        onChange={(e) => handleSelectChangeProd(e)}
      />
    );
  }else{
       return (
         <Select
        
           name="produccion"
           defaultValue={{ label: "Selecciona una produccion" }}
         />
       );
  }

}




  return (
    <div className="container align-content-center">
      <form onSubmit={handleForm} className="col-md-8">
        <h1>Formulario Creacion personaje</h1>

        <div className="form-group">
          <label>Nombre</label>
          <input
            type="text"
            className="form-control"
            name="nombre"
            placeholder="ingrese nombre del personaje"
            onChange={handleInput}
          />
        </div>

        <div className="form-group">
          <label>peso</label>
          <input
            type="text"
            className="form-control"
            name="peso"
            placeholder="ingrese peso del personaje"
            onChange={handleInput}
          />
        </div>

        <div className="form-group">
          <label>edad</label>
          <input
            type="text"
            className="form-control"
            name="edad"
            placeholder="ingrese edad del personaje"
            onChange={handleInput}
          />
        </div>

        <div className="form-group">
          <label>historia</label>
          <input
            type="text"
            className="form-control"
            name="historia"
            placeholder="ingrese historia del personaje"
            onChange={handleInput}
          />
        </div>

        <div className="form-group">
          <label>Producciones</label>
          {cargarProducciones()}
        </div>

        <div className="form-group">
          <label>imagen</label>
          <input
            type="file"
            className="form-control"
            name="file"
            multiple
            placeholder="ingrese imagen del personaje"
            onChange={(e) => {
              handleInputFile(e);
            }}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          onClick={(e) => crearPersonaje(e)}
        >
          Crear
        </button>
        <div>
          <Link to="/personajes" className="card-link">
            Volver
          </Link>
        </div>
      </form>
    </div>
  );
};
export default CrearPersonaje;
