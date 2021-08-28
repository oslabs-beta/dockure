import axios from 'axios';

class ImageService {
    
    static async getImageInfo(url) {
        try {
            const result = await axios.get(url)
            console.log('this is the data from services/imageService', result.data);
            return result.data;
        } catch (error) {
            console.log('There was an error getting image information from services/imageService: ', error);
            return(error);
        }
    }

    static async pullImageInfo(url, image) {
        try {
            const result = await axios.post(url, {imageName: image});
            return result;
        } catch (error) {
            console.log('There was an error pulling Image Information: ', error);
            return(error);
        }
    }

    static async startImage(url, ID) {
        try {
            const result = await axios.post(url, {imageID: ID})
            console.log('this is the result from the start image button', result);
            return result

        } catch (error) {
            console.log('There was an error starting the Image: ', error);
            return error
        }
    }

    static async DockerFileDefaultText() {
        
        return boilerPlate
    }

    static async buildImage(url, info) {
        try {
            const result = await axios.post(url, { imageName: info.imageName, path:info.dockerPath })
            console.log('this is the result from building the image:', result);
            return result

        } catch (error) {
            console.log('There was an error building the image: ', error);
            return error
        }
    }

    
}

export default ImageService;