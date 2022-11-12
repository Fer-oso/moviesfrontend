import axios from 'axios';

const API_URL = 'http://localhost:8080';

class LoginServicio{


registrar(usuario){
return axios.post(API_URL+'/auth/register',usuario);
}

login(usuario){
    return axios.get(API_URL+'/auth/login',usuario);
    }
}

export default new LoginServicio();