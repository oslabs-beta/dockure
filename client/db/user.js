const USER = 'user';

export default class UserStorage {
  saveUser(user) {
    localStorage.setItem(USER, user);
  }

  getUser() {
    return localStorage.getItem(USER);
  }

  clearUser() {
    localStorage.clear(USER);
  }
}
