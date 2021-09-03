import axios from 'axios';
import TokenStorage from '../db/token';
const tokenStorageService = new TokenStorage();

class UserDbService {
  static async postUserData(url, userData) {
    try {
      let result = await axios.post(url, userData);
      return result.data;
    } catch (error) {
      console.log('this error is from user signup: ', error);
      return { error: true };
    }
  }

  static async getUserToken(url) {
    const token = tokenStorageService.getToken();
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

  static async logout() {
    tokenStorageService.clearToken();
  }
}

export default UserDbService;
