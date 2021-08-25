import axios from 'axios';

class ImageService {
    static async getImageInfo(url) {
        try {
            let result = await axios.get(url)
            console.log('this is the data from services/imageService', result.data);
            return result.data;
        } catch (error) {
            console.log('There was an error getting image information from services/imageService');
        }
    }
}

export default ImageService;