import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import CharacterService from "../../services/CharacterService";
import Select from "react-select";
import ProduccionesService from "../../services/ProduccionesService";

const EditarPersonaje = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    CharacterService.getPersonaje(id)
      .then((response) => {
        setPersonaje(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const listaProducciones = async () => {
      await ProduccionesService.showProducciones()
        .then((res) => {
          setproducciones(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    listaProducciones();
  }, []);

  const [personaje, setPersonaje] = useState({
    nombre: "",
    peso: "",
    edad: "",
    historia: "",
    imagen: "",
    producciones: [],
  });

  const [producciones, setproducciones] = useState([]);

  const [imagen, setImagen] = useState([]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setPersonaje({
      ...personaje,
      [name]: value,
    });
  };

  const handleForm = (e) => {
    e.preventDefault();
    console.log(personaje);
  };

  const handleInputFile = (e) => {
    const imagen = e.target.files[0];
    setImagen(imagen);
  };

  const handleSelectChange = (e) => {
    setPersonaje({
      ...personaje,
      producciones: [e.value],
    });
  };

  const json = JSON.stringify(personaje);
  const blob = new Blob([json], {
    type: "application/json",
  });



  const editarPersonaje = (e) => {
    e.preventDefault();
    const formDataPersonaje = new FormData();
    formDataPersonaje.append("personaje", blob);
    formDataPersonaje.append("imagen", imagen);
    CharacterService.editarPersonaje(id, formDataPersonaje)
      .then((res) => {
        console.log(res)
        navigate("/personajes");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const cargarProducciones = () => {
    if (personaje.producciones == null) {
      return (
        <select
          multiple
          className="form-control"
          id="exampleFormControlSelect1"
          value={personaje.producciones.titulo}
          onChange={handleInput}
        >
          {personaje.producciones.map((produccion) => (
            <option key={produccion.id}>{produccion.titulo}</option>
          ))}
        </select>
      );
    } else {
      return (
        <Select
          name="produccion"
          defaultValue={{ label: "Selecciona una produccion" }}
          options={producciones.map((produccion) => ({
            label: produccion.titulo,
            value: produccion,
          }))}
          onChange={(e) => handleSelectChange(e)}
        />
      );
    }
  };

  return (
    <div className="container align-content-center">
      <form onSubmit={handleForm} className="col-md-8">
        <h1>Formulario Edicion personaje</h1>

        <div className="form-group">
          <label>Nombre</label>
          <input
            type="text"
            className="form-control"
            name="nombre"
            value={personaje.nombre}
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
            value={personaje.peso}
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
            value={personaje.edad}
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
            value={personaje.historia}
            placeholder="ingrese historia del personaje"
            onChange={handleInput}
          />
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

        <div className="form-group">
          <label htmlFor="exampleFormControlSelect1">Example select</label>
          {cargarProducciones()}
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          onClick={(e) => editarPersonaje(e)}
        >
          Editar
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
export default EditarPersonaje;
