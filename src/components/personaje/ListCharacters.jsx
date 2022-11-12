import React, { useState } from "react";
import { useEffect } from "react";

import { Link } from "react-router-dom";
import CharacterService from "../../services/CharacterService";

import Card from "react-bootstrap/Card";

const ListCharacters = () => {
  const [personajes, setPersonajes] = useState([]);

  useEffect(() => {
    showPersonajes();
  }, []);

  const showPersonajes = () => {
    CharacterService.showPersonajes()
      .then((response) => {
        setPersonajes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const listarPersonajes = () => {
    if (personajes) {
      return (
        <div className="contenedor-cards">    
            {personajes.map((personaje) => (
              <Link to={`/personajes/${personaje.id}`} className="nav-link m-auto mt-4" key={personaje.id}>
                <Card
                  className="tarjeta-personaje"
                  key={personaje.id}
                >
                  <Card.Title className="text-center">
                    {personaje.nombre}
                  </Card.Title>
                  <Card.Img
                    variant="top"
                    src={`http://127.0.0.1:8887/${personaje.imagen.nombre}`}
                    className="imagen-personaje"
                  />
                  <Card.Body></Card.Body>
                </Card>
              </Link>
            ))}
          </div>
      );
    } else {
      return "NADA CARGADO";
    }
  };

  return (
  <div className="contenedor-general">
      <h2 className="text-center">Personajes</h2>
      <Link to="/crear-personaje" className="btn btn-primary">
        Crear Personaje
      </Link>
       
          {listarPersonajes()}
    </div>
  );
};

export default ListCharacters;
