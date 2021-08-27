import axios from 'axios';

//parse time values into human readable time
// function getTime() {
    
// }

class StatsService {
    static async getCurrentMemory(query, start) {
        try {
            const data = [];
            let result = await axios.get(`http://localhost:3000/metrics/?start=${start}&query=${query}`);
            console.log('Stats request complete: ', result);
            //parsing the result into rechart readable data
            for (let i = 0; i < result.data.length; i++) {
                const dataPoint = {};
                dataPoint.time = result.data[i][0];
                dataPoint.MBs = result.data[i][1]/1000000;
                data.push(dataPoint);
            }
            return data;
        } catch (error) {
            console.log('There was an error getting stats from the backend: ', error);
            if (error) return error;
        }
    }
}

export default StatsService;