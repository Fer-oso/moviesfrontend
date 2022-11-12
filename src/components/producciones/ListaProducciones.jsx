import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProduccionesService from "../../services/ProduccionesService";

const ListaProducciones = () =>{
 const [producciones, setProducciones] = useState([]);

  useEffect(() => {
    showProducciones();
  }, []);

  const showProducciones = () => {
    ProduccionesService.showProducciones()
      .then((response) => {
        setProducciones(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const listaProducciones = () => {
    if (producciones) {
      return (
        <div className="contenedor-cards">    
            {producciones.map((produccion) => (
              <Link to={`/producciones/${produccion.id}`} className="nav-link m-auto mt-4" key={produccion.id}>
                <Card
                  className="tarjeta-personaje"
                  key={produccion.id}
                >
                  <Card.Title className="text-center">
                    {produccion.titulo}
                  </Card.Title>
                  <Card.Img
                    variant="top"
                    src={`http://127.0.0.1:8887/${produccion.imagen.nombre}`}
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
      <h2 className="text-center">producciones</h2>
      <Link to="/crear-produccion" className="btn btn-primary">
        Crear produccion
      </Link>
       
          {listaProducciones()}
    </div>

  )
}

export default ListaProducciones;