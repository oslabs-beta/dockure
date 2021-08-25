import axios from 'axios';

class ContainerService {
  static async getConInfo(url) {
    try {
      // console.log('check');
      let result = await axios.get(url);
      console.log('This is the data from services/containerService: ', result.data);
      return result.data;
    } catch(err) {
        console.log('There was an error getting container information from services/containerService: ' + err);    
    }
  }
}


// ContainerService.getConInfo('http://localhost:3000/api')
export default ContainerService;