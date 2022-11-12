import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import ProduccionesService from "../../services/ProduccionesService";


import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import Select from "react-select";

import GeneroService from "../../services/GeneroService";
const CrearProduccion = () => {
  /*-------------STATES--------------------------------------*/
  const [listaGeneros, setListaGeneros] = useState([]);
  const [imagen, setImagen] = useState({});
  const [produccion, setProduccion] = useState({
    titulo: "",
    calificacion: "",
    fechaCreacion: "",
   
  });

  /*---------------------------------------------------------------------- */

  /*PRODUCCION FORM HANDLE */
  const handleInput = (e) => {
    const { name, value } = e.target;
    console.log(e.target.value);
    setProduccion({
      ...produccion,
      [name]: value,
    });
  };

  /*PRODUCCION GENERO HANDLE */
  const handleSelectChange = (e) => {
    setProduccion({
      ...produccion,
      genero: [e.value],
    });
  };

  /*PRODUCCION IMAGE HANDLE */
  const handleInputFile = (e) => {
    const imagen = e.target.files[0];
    setImagen(imagen);
  };

  let jsonProduccion = JSON.stringify(produccion);
  let blobProduccion = new Blob([jsonProduccion], {
    type: "application/json",
  });

  const navigate = useNavigate();

  /*FUNCION PARA CREAR  LA PRODUCCION */
  const crearProduccion = (e) => {
    e.preventDefault();

    const formDataProduccion = new FormData();
    formDataProduccion.append("produccion", blobProduccion);
    formDataProduccion.append("imagen", imagen);
    ProduccionesService.crearProduccion(formDataProduccion)
      .then(() => {
        navigate("/producciones");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const listGeneros = async () => {
      await GeneroService.getGeneros()
        .then((res) => {
          setListaGeneros(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    listGeneros();
  }, []);

  const handleForm = (e) => {
    e.preventDefault();
    console.log(produccion);
  };

 const [modalShow, setModalShow] = React.useState(false);
    function MyVerticallyCenteredModal(props) {
      return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
             Seleccion de personajes
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Seleccione el/los personajes que desea añadir a la produccion</h5>

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
    }

const cargarGeneros = () =>{
  if  (listaGeneros){

    return (
       <Select
        name="genero"
        defaultValue={{ label: "Selecciona un genero" }}
        options={listaGeneros.map((genero) => ({
          label: genero.nombre,
          value: genero,
        }))}
        onChange={(e) => handleSelectChange(e)}
      />
    )
    }else{
      return (
        <Select
          name="genero"
          defaultValue={{ label: "Selecciona un genero" }}
        />
      );
    }}

  return (
    <div className="container align-content-center">
      <form onSubmit={handleForm} className="col-md-8">
        <h1>Formulario Creacion Produccion</h1>

        <div className="form-group">
          <label>Titulo</label>
          <input
            type="text"
            className="form-control"
            name="titulo"
            placeholder="ingrese titulo de la produccion"
            onChange={handleInput}
          />
        </div>

        <div className="form-group">
          <label>calificacion</label>
          <input
            type="text"
            className="form-control"
            name="calificacion"
            placeholder="ingrese calificacion de la produccion"
            onChange={handleInput}
          />
        </div>

        <div className="form-group">
          <label>Creacion</label>
          <input
            type="date"
            className="form-control"
            name="fechaCreacion"
            placeholder="ingrese fecha de creacion"
            onChange={handleInput}
          />
        </div>

        <div className="form-group">
          <label>Genero</label>
          {cargarGeneros()}
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
          <Button variant="primary" onClick={() => setModalShow(true)}>
            Launch vertically centered modal
          </Button>
        </div>

        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />

        <button
          type="submit"
          className="btn btn-primary"
          onClick={(e) => crearProduccion(e)}
        >
          Crear
        </button>
        <div>
          <Link to="/producciones" className="card-link">
            Volver
          </Link>
        </div>
      </form>
    </div>
  );
};

export default CrearProduccion;
