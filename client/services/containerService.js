import axios from 'axios';

class ContainerService {

  static async getConInfo(url) {
    try {
      console.log('check');
      let result = await axios.get(url);
      // console.log('This is container information: ', result.data);
      return result.data;
    } catch(err) {
        console.log('There was an error getting container information from services/containerService: ' + err);    
    }
  }

  static async getMetrics(url, id) {
    try {
      // console.log('check');
      let stats = await axios.post(url, id);
      let data = {};
      data.cpu = stats.data.cpu_stats.cpu_usage.total_usage / 1000000;
      data.memory = stats.data.memory_stats.usage / 1000000;

      console.log('This is container health data: ', stats.data);
      return stats.data;
    } catch(err) {
        console.log('There was an error getting container information from services/containerService: ' + err);    
    }
  }


}


// ContainerService.getConInfo('http://localhost:3000/api')
export default ContainerService;