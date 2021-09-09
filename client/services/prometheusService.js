import axios from 'axios';

class StartUp {
    static async prometheus() {
        try {
            await axios.get('http://localhost:3000/metrics/node-exporter');
            await axios.get('http://localhost:3000/metrics/yamlParse');
            return;
        } catch (error) {
            if (error) {
                console.log('Error in startup of prometheus: ', error);
            }
        }
    }
}

export default StartUp;