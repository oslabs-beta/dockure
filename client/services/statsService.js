import axios from 'axios';

class StatsService {
    static async getStats(query, start) {
        try {
            let result = await axios.get(`http://localhost:3000/metrics/?start=${start}&query=${query}`);
            console.log('Stats request complete: ', result);
            return result;
        } catch (error) {
            console.log('There was an error getting stats from the backend: ', error);
            if (error) return error;
        }
    }
}

export default StatsService;