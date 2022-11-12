import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import LoginServicio from "../services/LoginServicio";

const Loginvalues = () =>{

    const [values,setValues] = useState({
        username:"",
        password:"",

    })

    const handleInput = (e)=>{
        const {name,value} = e.target;
        console.log(e.target.value)
        setValues({
            ...values,
            [name] : value,
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
                <h1>Formulario Login usuario</h1>

                <div className="form-group">
                <label>Usuario</label>
                <input
                    type="text"
                    className="form-control"
                    name="email"
                   
                    placeholder="ingrese nombre del usuario"
                    onChange={handleInput}
                />
                </div>


                <div className="form-group">
                <label>password</label>
                <input
                    type="password"
                    className="form-control"
                    name="username"
                   
                    placeholder="ingrese nombre del usuario"
                    onChange={handleInput}
                />
                </div>

                <button type="submit" className="btn btn-primary" onClick={(e)=>crearUsuario(e)}>Login</button>
               <div>
               <Link to = '/personajes' className="card-link">Volver</Link>
               </div>
            </form>
        </div>
    )

}
export default Loginvalues;