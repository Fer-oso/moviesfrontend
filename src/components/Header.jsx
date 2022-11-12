import React from "react";
import { NavLink } from "react-router-dom";

const Header = () =>{
    return(
        <div>
        <header>
          <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
           <div className="container-fluid">
           <NavLink to={'/'} className="navbar-brand">Producciones CRUD</NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
           <span className="navbar-toggler-icon"></span>
           </button>

      <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav me-auto">
          <li className="nav-item">
          <NavLink to={'/personajes'} className="nav-link">Personajes</NavLink>
          </li>
          <li className="nav-item">
          <NavLink to={'/producciones'} className="nav-link">Producciones</NavLink>
          </li>
          </ul>
          </div>
      </div>
      </nav>
      </header>
      </div>
    );

}
export default Header;