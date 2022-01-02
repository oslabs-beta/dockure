const TOKEN = 'token';
class TokenStorage {
  static saveToken(token) {
    localStorage.setItem(TOKEN, token);
  }

  static getToken() {
    return localStorage.getItem(TOKEN);
  }

  static clearToken() {
    localStorage.clear(TOKEN);
  }

  s;
}

export default TokenStorage;
