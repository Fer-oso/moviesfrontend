import React from "react";

import { useEffect } from "react";

import { Link } from "react-router-dom";
import CharacterService from "../../services/CharacterService";

const TablaPersonajes = () =>{

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

  const deleteCharacter = (id) => {
    CharacterService.deleteCharacter(id)
      .then(() => {
        showPersonajes();
      })
      .catch((error) => {
        console.log(error);
      });
  };



  return (
    <div className="contenedor-general">
      <h2 className="text-center">Lista Personajes</h2>
      <Link to="/crear-personaje" className="btn btn-primary">
        Crear Personaje
      </Link>


        <Link to="/crear-personaje" className="btn btn-primary">
          Crear Personaje
        </Link>
        <table className="table table-responsive table-sm table-hover">
          <thead>
            <tr>
              <th>Personaje Id</th>
              <th>nombre</th>
              <th>Edad</th>
              <th>Peso</th>
              <th>Historia</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {personajes.map((personaje) => {
              return (
                <tr key={personaje.id}>
                  <td>{personaje.id}</td>
                  <td>{personaje.nombre}</td>
                  <td>{personaje.edad}</td>
                  <td>{personaje.peso}</td>
                  <td>{personaje.historia}</td>
                  <td>
                    <Link
                      to={`/personajes/${personaje.id}`}
                      className="btn btn-info"
                    >
                      Ver
                    </Link>
                    <Link
                      to={`/editar-personaje/${personaje.id}`}
                      className="btn btn-warning"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => deleteCharacter(personaje.id)}
                      className="btn btn-danger"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table> 
    </div>
  );

}

export default TablaPersonajes;