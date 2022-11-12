import axios from "axios";

const API_URL_GENEROS = "http://localhost:8080/api/generos";


class GeneroService {

getGeneros(){
return axios.get(API_URL_GENEROS);
}

}

export default new GeneroService();