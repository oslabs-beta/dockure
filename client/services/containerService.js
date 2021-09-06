import axios from 'axios';

class ContainerService {
  static async getConInfo(url) {
    try {
      let result = await axios.get(url);
      // console.log('This is container information: ', result.data);
      return result.data;
    } catch (err) {
      console.log(
        'There was an error getting container information from services/containerService: ' +
          err
      );
    }
  }

  static async getMetrics(url, id) {
    console.log('entered get metrics: ', id, url);
    try {
      //get current memory used by container
      const memoryStats = await axios.get(url, {
        params: {
          id,
          start: 1,
          query: `container_memory_usage_bytes{id=~'/docker/${id}'}`,
        },
      });
      //get total machine memory:
      const machineMem = await axios.get(url, {
        params: {
          id,
          start: 1,
          query: `machine_memory_bytes`,
        },
      });

      //get total cpu seconds used per container
      const cpuStats = await axios.get(url, {
        params: {
          id,
          start: 1,
          query: `sum(rate(container_cpu_usage_seconds_total {id=~'/docker/${id}'} [5m]))`,
        },
      });
      //get total cores of machine
      const cores = await axios.get(url, {
        params: {
          id,
          start: 1,
          query: 'machine_cpu_cores',
        },
      });
      const coreCount = cores.data[0][1];
      const data = {};
      data.memory = [];
      data.cpu = [];
      //parse the memory data into something more readable: --> COULD MAKE THIS MORE MODULAR
      memoryStats.data.forEach((dataPoint, i) => {
        const machineMemory = machineMem.data[i][1];
        const time = new Date(dataPoint[0] * 1000);
        data.memory.push({
          time: time.toTimeString().slice(0, 5),
          percentTotalMemoryUsed: (dataPoint[1] / machineMemory) * 100,
        });
      });

      //parse cpu data into percentages --> AGAIN CAN MAKE THIS MORE MODULAR
      cpuStats.data.forEach((dataPoint) => {
        const time = new Date(dataPoint[0] * 1000);
        data.cpu.push({
          time: time.toTimeString().slice(0, 5),
          percentTotalCpuUsed: (dataPoint[1] / coreCount) * 100,
        });
      });

      return data;
    } catch (err) {
      console.log(
        'There was an error getting container information from services/containerService: ' +
          err
      );
    }
  }

  static postClickBtn(url, id) {
    try {
      const result = axios.post(url, { containerID: id });
      // console.log('result from post click button in container service is :', result)
      return result;
    } catch (err) {
      console.log('There is error on button functions in container service');
    }
  }

}

// ContainerService.getConInfo('http://localhost:3000/api')
export default ContainerService;
