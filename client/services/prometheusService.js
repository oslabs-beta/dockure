import axios from 'axios';

class StartUp {
    static async prometheus() {
        try {
            //request for node-exporter
            await axios.get('http://localhost:3000/metrics/node-exporter');
            //request for prometheus
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