import axios from "axios";

class UserDbService { 
  static async postUserData(url, userData) {
      try{
          let result = await axios.post(url, userData);
          return result.data;
      } catch(error) {
          console.log("this error is from user signup: ", error);
          return { error: true };
      }
  } 

};

export default UserDbService;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    