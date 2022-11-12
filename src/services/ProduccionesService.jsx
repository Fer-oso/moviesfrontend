import axios from "axios";

const API_URL_PRODUCCIONES = "http://localhost:8080/api/producciones/";

class ProduccionesService {
  crearProduccion(produccion) {
    return axios.post(API_URL_PRODUCCIONES, produccion);
  }

  showProducciones() {
    return axios.get(API_URL_PRODUCCIONES);
  }

  getProduccion(id) {
    return axios.get(API_URL_PRODUCCIONES+ id);
  }

  editarProduccion(id, produccion) {
    return axios.put(API_URL_PRODUCCIONES + id, produccion);
  }
  
  deleteProduccion(id) {
    return axios.delete(API_URL_PRODUCCIONES + id);
  }
}

export default new ProduccionesService();
