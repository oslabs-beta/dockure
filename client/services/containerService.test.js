import Service from './containerService';
import axios from 'axios';

describe('>> Container Service', () => {
  describe('>> getConInfo', () => {
    it('should call url with Axios', async () => {
      const spy = jest.spyOn(axios, 'get');
      const url = '/any-url-you-want';
      await Service.getConInfo(url);

      expect(spy).toBeCalledWith(url);
    });

    // it('should call return err string ', async () => {
    //   const spy = jest.spyOn(console, 'log');
    //   const url = '/any-url-you-want';
    //   const message = await Service.getConInfo(url).rejects.toThrowError(
    //     new InvalidArgumentError('Some error message')
    //   );

    //   expect(message).toBeCalledWith('err');
    // });
  });
});
