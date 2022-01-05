import axiosService from './axiosService';

class ImageService {
  static async getImageInfo() {
    try {
      const result = await axiosService.getRequest(
        'http://localhost:3000/api/images'
      );
      return result.data;
    } catch (error) {
      throw new Error(
        'There was an error getting image information from services/imageService: '
      );
    }
  }

  static async pullImageInfo(image) {
    try {
      const result = await axiosService.postRequest(
        'http://localhost:3000/api/images/pull',
        {
          imageName: image,
        }
      );
      return result;
    } catch (error) {
      throw new Error('There was an error pulling Image Information: ', error);
    }
  }

  static async startImage(ID) {
    try {
      const result = await axiosService.postRequest(
        'http://localhost:3000/api/images/start',
        { imageID: ID }
      );
      return result;
    } catch (error) {
      throw new Error('There was an error starting the Image: ', error);
    }
  }

  static async deleteImage(ID) {
    try {
      const result = await axiosService.postRequest(
        'http://localhost:3000/api/images/delete',
        { imageID: ID }
      );
      return result;
    } catch (error) {
      throw new Error('There was an error starting the Image: ', error);
      return error;
    }
  }

  static async DockerFileDefaultText() {
    return boilerPlate;
  }

  static async buildImage(info) {
    try {
      const result = await axiosService.postRequest(
        'http://localhost:3000/api/images/build',
        {
          imageName: info.imageName,
          path: info.dockerPath,
        }
      );
      return result;
    } catch (error) {
      throw new Error('There was an error building the image: ', error);
      return error;
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
