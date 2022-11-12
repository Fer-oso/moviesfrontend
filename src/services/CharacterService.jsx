import axios from "axios";

const API_URL = "http://localhost:8080/api";

class CharacterService {
  crearPersponaje(personaje) {
    return axios.post(API_URL + "/personajes/", personaje);
  }

  showPersonajes() {
    return axios.get(API_URL + "/personajes");
  }

  getPersonaje(id) {
    return axios.get(API_URL + "/personajes/" + id);
  }

  editarPersonaje(id, personaje) {
    return axios.put(API_URL + "/personajes/" + id, personaje);
  }

  deleteCharacter(id) {
    return axios.delete(API_URL + "/personajes/" + id);
  }

  /* URLS FILTROS*/

  filtrarNombre(filtro, valor) {
    return axios.get(API_URL + `/characters?${filtro}=${valor}`);
  }

  /*URL PERSONALIZADA*/
  nombrePersonaje(nombrePersonaje) {
    return axios.get(API_URL + "/characters/character/" + nombrePersonaje);
  }
}

export default new CharacterService();
