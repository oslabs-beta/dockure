import axios from 'axios';
import TokenStorage from '../db/token';

class UserDbService {
  static async postUserData(url, userData) {
    try {
      let result = await axios.post(url, userData);
      return result.data;
    } catch (error) {
      console.log('this error is from User Service: ', error);
      return { error: true };
    }
  }

  static async getUserToken(url) {
    const token = TokenStorage.getToken();
    try {
      const result = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return result.data;
    } catch (error) {
      console.log('There was an error getting user token: ', error);
      return { error: 'unauthenticated' };
    }
  }

  static logout() {
    TokenStorage.clearToken();
  }
}

export default UserDbService;
