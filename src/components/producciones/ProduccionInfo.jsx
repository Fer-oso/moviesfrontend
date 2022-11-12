import React from "react";

import { useState,useEffect } from "react";
import { Link,  useParams} from "react-router-dom";
import Button from "react-bootstrap/Button";
import ProduccionesService from "../../services/ProduccionesService";
import Collapse from "react-bootstrap/Collapse";

import "../../css/estilos.css";

const ProduccionInfo = () =>{

    const [produccionInfo, setProduccionInfo] = useState({});
    const { id } = useParams();

    const personajes = produccionInfo.personajes;

    const imagen = produccionInfo.imagen;

    useEffect(() => {
      const showProduccion = async () => {
        await ProduccionesService.getProduccion(id)
          .then((res) => {
            setProduccionInfo(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
      };
      showProduccion();
    }, []);

    const mostrarPRoduccion = () => {
      if (produccionInfo) {
        return (
          <div key={produccionInfo.id}>
            <h4 className="card-title text-center">{produccionInfo.titulo}</h4>
            <h6 className="card-subtitle mb-2 text-muted">
              Calificacion: {produccionInfo.calificacion}estrellas
            </h6>
            <h6 className="card-subtitle mb-2 text-muted">
              fecha de Creacion: {produccionInfo.fechaCreacion} 
            </h6>
          </div>
        );
      }
    };

    const showPersonajes = () => {
      if (personajes) {
        return personajes.map((personaje) => (
          <ul key={personaje.id} className="list-group list-group-flush">
            <li className="list-group-item">{personaje.nombre}</li>
          </ul>
        ));
      }
    };

    const showImage = () => {
      if (imagen) {
        return (
          //   imagen.map((img)=>(
          <div key={imagen.id} className="container">
            <img
              src={`http://127.0.0.1:8887/${imagen.nombre}`}
              className="imagen-personaje"
              alt=""
            ></img>
          </div>
        );
        //  )
        //)
      }
    };
    const [open, setOpen] = useState(false);

    return (
      <div className="contenedor-imagen ">
        <div className="card mt-4">
          <div className="card-body">
            {mostrarPRoduccion()}
            <div>
              <Button
                onClick={() => setOpen(!open)}
                aria-controls="example-collapse-text"
                aria-expanded={open}
              >
                Ver personajes
              </Button>
              <Collapse in={open}>
                <div id="example-collapse-text">{showPersonajes()}</div>
              </Collapse>
            </div>

            {showImage()}

            <Link
              to={`/editar-produccion/${produccionInfo.id}`}
              className="card-link"
            >
              Editar
            </Link>
            <Link to="/producciones" className="card-link">
              Volver
            </Link>
          </div>
        </div>
      </div>
    );
}

export default ProduccionInfo;