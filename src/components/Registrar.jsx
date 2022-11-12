import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import LoginServicio from "../services/LoginServicio";

const Registrar = () =>{

    const [values,setValues] = useState({
        username:"",
        password:"",
        email:""
    })

    const handleInput = (e)=>{
        const {name,value} = e.target;
        console.log(e.target.value)
        setValues({
            ...values,
            [name] : value
        });
    }
    
    const handleForm = (e) =>{
        e.preventDefault();
        console.log(values);
    }

    const crearUsuario = (e) =>{
        e.preventDefault();
        LoginServicio.login(values).then(()=>{
            
        }).catch(error=>{
            console.log(error);
        })
        
    }

    return (
        <div className="container align-content-center">
            <form onSubmit={handleForm} className="col-md-8">
                <h1>Formulario Registro usuario</h1>

                <div className="form-group">
                <label>Correo</label>
                <input
                    type="email"
                    className="form-control"
                    name="email"  
                    placeholder="ingrese nombre del usuario"
                    onChange={handleInput}
                />
                </div>


                <div className="form-group">
                <label>usuario</label>
                <input
                    type="text"
                    className="form-control"
                    name="username" 
                    placeholder="ingrese nombre del usuario"
                    onChange={handleInput}
                />
                </div>

                <div className="form-group">
                <label>contraseña</label>
                    <input
                    type="password"
                    className="form-control"
                    name="password"          
                    placeholder="ingrese contraseña del usuario"
                    onChange={handleInput}
                />
                </div>


                <button type="submit" className="btn btn-primary" onClick={(e)=>crearUsuario(e)}>Registrar</button>
               <div>
               <Link to = '/personajes' className="card-link">Volver</Link>
               </div>
            </form>
        </div>
    )

}
export default Registrar;