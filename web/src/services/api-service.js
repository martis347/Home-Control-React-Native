import axios from 'axios';

class ApiService {
  constructor() {
    this.apiUrl = 'https://home-control2.azurewebsites.net/api/';
  }

  get(url) {
    return axios.get(`${this.apiUrl}${url}`);
  }

  post(url, data) {
    return axios.post(`${this.apiUrl}${url}`, data);
  }
}

export default new ApiService();
