import axios from 'axios';

export const httpClient = axios.create({

    // baseURL: 'http://192.168.0.126:7878/', 

     baseURL: 'http://68.178.174.30:7878/', 

});

export default httpClient;

