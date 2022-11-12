import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Header from './components/Header';
import Index from './components/Index';

import ListCharacters from './components/personaje/ListCharacters';
import CrearPersonaje from './components/personaje/CrearPersonaje';
import PersonajeInfo from './components/personaje/PersonajeInfo';
import EditarPersonaje from './components/personaje/EditarPersonaje';

import Login from './components/Login';
import Registrar from './components/Registrar';

import ListaProducciones from './components/producciones/ListaProducciones';
import CrearProduccion from './components/producciones/CrearProduccion';
import ProduccionInfo from './components/producciones/ProduccionInfo';
import EditarProduccion from './components/producciones/EditarProduccion';



function App() {
  return (
   <div>
    <Router>
      <Header/>
      <div className='container'>
        <Routes>
          <Route path='/' element = {<Index/>}></Route>
          <Route path='/personajes' element = {<ListCharacters/>}></Route>
          <Route path='/personajes/:id' element={<PersonajeInfo/>}></Route>
          <Route path='/crear-personaje' element={<CrearPersonaje/>}></Route>
          <Route path='/editar-personaje/:id' element={<EditarPersonaje/>}></Route>

          <Route path='/producciones' element ={<ListaProducciones/>}></Route>
          <Route path='/producciones/:id' element={<ProduccionInfo/>}></Route>
          <Route path='/crear-produccion'element={<CrearProduccion/>}></Route>
          <Route path='/editar-produccion/:id' element={<EditarProduccion/>}></Route>

          <Route path='/auth/registrar' element={<Registrar/>}></Route>
          <Route path='/auth/login' element={<Login/>}></Route>
        </Routes>
      </div>
    </Router>
   </div>
  );
}

export default App;
