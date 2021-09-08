import axios from 'axios';

class ImageService {
    
    static async getImageInfo(url) {
        try {
            const result = await axios.get(url)
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
            return result

        } catch (error) {
            console.log('There was an error starting the Image: ', error);
            return error
        }
    }

    static async deleteImage(url, ID) {
        try {
            const result = await axios.post(url, {imageID: ID})
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
            return result

        } catch (error) {
            console.log('There was an error building the image: ', error);
            return error
        }
    }

    static dockerBoiler() {
const dockerBoiler = `FROM 
  
WORKDIR
  
COPY
  
COPY
  
RUN
  
COPY
  
CMD
      `;
    
    return dockerBoiler;
    
}

    static yamlBoiler() {
const yamlBoiler = `version: 
services:
web:
    build: .
    ports:
    - "5000:5000"
    volumes:
    - .:/code
    - logvolume01:/var/log
volumes:
logvolume01: {}
    `;
            
    return yamlBoiler;
            
}

}

export default ImageService;