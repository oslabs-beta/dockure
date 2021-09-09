import axios from 'axios';

class ContainerService {
  static async getConInfo(url) {
    try {
      let result = await axios.get(url);
      return result.data;
    } catch (err) {
      console.log(
        'There was an error getting container information from services/containerService: ' +
          err
      );
    }
  }

  static async getMetrics(url, id, time) {
    try {
      const memoryStats = await axios.get(url, {
        params: {
          id,
          start: time,
          query: `container_memory_usage_bytes{id=~'/docker/${id}'}`,
        },
      });

      const machineMem = await axios.get(url, {
        params: {
          id,
          start: time,
          query: `machine_memory_bytes`,
        },
      });

      const cpuStats = await axios.get(url, {
        params: {
          id,
          start: time,
          query: `sum(rate(container_cpu_usage_seconds_total {id=~'/docker/${id}'} [5m]))`,
        },
      });

      const cores = await axios.get(url, {
        params: {
          id,
          start: time,
          query: 'machine_cpu_cores',
        },
      });
      const coreCount = cores.data[0][1];
      const data = {};
      data.memory = [];
      data.cpu = [];

      memoryStats.data.forEach((dataPoint, i) => {
        const machineMemory = machineMem.data[0][1];
        const time = new Date(dataPoint[0] * 1000);
        data.memory.push({
          time: time.toTimeString().slice(0, 5),
          percentTotalMemoryUsed: (dataPoint[1] / machineMemory) * 100,
        });
      });


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
      return result;
    } catch (err) {
      console.log('There is error on button functions in container service');
    }
  }

}

export default ContainerService;
