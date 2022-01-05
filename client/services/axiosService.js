import axios from 'axios';
import TokenStorage from '../db/token';

class axiosService {
  static authHeaders() {
    const token = TokenStorage.getToken();
    return {
      headers: { Authorization: `Bearer ${token}` },
    };
  }

  static getRequest(url, ...args) {
    return axios.get(url, ...args, axiosService.authHeaders());
  }

  static postRequest(url, ...args) {
    return axios.post(url, ...args, axiosService.authHeaders());
  }
}

export default axiosService;
