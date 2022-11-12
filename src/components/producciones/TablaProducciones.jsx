import React, {useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ProduccionesService from "../../services/ProduccionesService";

const TablaProducciones = () =>{

const [producciones, setProducciones] = useState([]);

useEffect(()=>{
    showProducciones();
},[]);

const showProducciones = async () =>{
await ProduccionesService.showProducciones().then((response)=>{
  setProducciones(response.data)
}).catch((error)=>{
    console.log(error);
});
}

const deleteProduccion = (id) =>{
    ProduccionesService.deleteProduccion(id).
    then(()=>{
        showProducciones();
    }).catch((error)=>{
        console.log(error);
    })
}

const produccion = producciones;
const generos = () =>{
if (produccion) {
  return <td>{produccion.genero}</td>;
}else{
  return <td>no genero</td>
}
}


console.log(produccion)


const tablaProducciones = () =>{
if (producciones) {
  return (
    <table className="table-responsive table-sm table table-hover">
      <thead>
        <tr>
          <th>Produccion id</th>
          <th>titulo</th>
          <th>calificacion</th>
          <th>genero</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {producciones.map((produccion) => {
          return (
            <tr key={produccion.id}>
              <td>{produccion.id}</td>
              <td>{produccion.titulo}</td>
              <td>{produccion.calificacion}</td>
              <td>{produccion.genero.map(gen=>(gen.nombre))}</td>
              <td>
                <Link
                  to={`/producciones/${produccion.id}`}
                  className="btn btn-info"
                >
                  Ver
                </Link>
                <Link
                  to={`/editar-produccion/${produccion.id}`}
                  className="btn btn-warning"
                >
                  Editar
                </Link>
                <button
                  onClick={() => deleteProduccion(produccion.id)}
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
  );
}else{
  return "NO CONTENT";
}
}
 


return(
    <div className="container">
       <h2 className="text-center">Lista Producciones</h2>
    <Link to="/crear-produccion" className="btn btn-primary">Crear Produccion</Link>
    {tablaProducciones()}
    </div>
);
}

export default TablaProducciones;