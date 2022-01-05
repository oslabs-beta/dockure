import axiosService from './axiosService';

class ContainerService {
  static async setupCon() {
    try {
      await axiosService.getRequest('http://localhost:3000/api/containers');
    } catch (err) {
      throw new Error(
        'There was an error setting up Containers from services/containerService'
      );
    }
  }

  static async getConInfo() {
    try {
      let result = await axiosService.getRequest(
        'http://localhost:3000/api/containers/containers'
      );
      return result.data;
    } catch (err) {
      throw new Error(
        'There was an error getting container information from services/containerService'
      );
    }
  }

  static async getMetrics(id, time) {
    try {
      const memoryStats = await axiosService.getRequest(
        'http://localhost:3000/api/metrics',
        {
          params: {
            id,
            start: time,
            query: `container_memory_usage_bytes{id=~'/docker/${id}'}`,
          },
        }
      );

      const machineMem = await axiosService.getRequest(
        'http://localhost:3000/api/metrics',
        {
          params: {
            id,
            start: time,
            query: `machine_memory_bytes`,
          },
        }
      );

      const cpuStats = await axiosService.getRequest(
        'http://localhost:3000/api/metrics',
        {
          params: {
            id,
            start: time,
            query: `sum(rate(container_cpu_usage_seconds_total {id=~'/docker/${id}'} [5m]))`,
          },
        }
      );

      const cores = await axiosService.getRequest(
        'http://localhost:3000/api/metrics',
        {
          params: {
            id,
            start: time,
            query: 'machine_cpu_cores',
          },
        }
      );
      console.log(cores);
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
      throw new Error(
        'There was an error getting container information from services/containerService: '
      );
    }
  }

  static postClickBtn(command, id) {
    try {
      const result = axiosService.postRequest(
        `http://localhost:3000/api/containers/${command}`,
        { containerID: id }
      );
      return result;
    } catch (err) {
      throw new Error(
        'There is error on button functions in container service'
      );
    }
  }
}

export default ContainerService;
