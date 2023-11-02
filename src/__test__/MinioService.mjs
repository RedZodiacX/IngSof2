import {
    describe as myDescribe, it as myIt, expect as myExpect, beforeEach as myBeforeEach,
  } from '@jest/globals';
  import MyMinioService from '../src/services/MyMinioService.mjs'; 
  
  myDescribe('MyMinioService', () => {
    let myMinioService;
  
    myBeforeEach(() => {
      myMinioService = new MyMinioService();
    });
  
    myIt('should save an image successfully', async () => {
      const myMockImage = {
        originalname: 'test.jpg',
        buffer: Buffer.from('image data'),
      };
      const myResult = await myMinioService.saveImage(myMockImage);
    });
  
    myIt('should throw a Bad Request error if image is missing', async () => {
      const myResult = myMinioService.saveImage();
      await myExpect(myResult).rejects.toThrow('Imagen requerida');
    });
  
    myIt('should throw a Bad Request error if originalname is missing', async () => {
      const myInvalidImage = {
        buffer: Buffer.from('image data'),
      };
  
      const myResult = myMinioService.saveImage(myInvalidImage);
      await myExpect(myResult).rejects.toThrow('Image originalname es requerido');
    });
  
    myIt('should throw a Bad Request error if buffer is missing', async () => {
      const myInvalidImage = {
        originalname: 'test.jpg',
      };
      const myResult = myMinioService.saveImage(myInvalidImage);
      await myExpect(myResult).rejects.toThrow('Image buffer es requerido');
    });
  
    myIt('should throw a Bad Request error for an image with an invalid name', async () => {
      const myInvalidImage = {
        originalname: 'invalid-name',
        buffer: Buffer.from('image data'),
      };
  
      const myResult = myMinioService.saveImage(myInvalidImage);
      await myExpect(myResult).rejects.toThrow('Image invalid name');
    });
  });