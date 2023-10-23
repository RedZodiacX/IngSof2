import {
  describe, test, expect, jest,
} from '@jest/globals';
import ProcessRepository from '../../repositories/ProcessRepository.mjs';
import MinioService from '../MinioService.mjs';
import ProcessService from '../ProcessService.mjs';

const suma = (a, b) => a + b;

describe('Test Suma', () => {
  test('suma 1 + 2 = 3', () => {
    expect(suma(1, 2)).toBe(3);
  });

  test('suma 1 + 3 = 4', () => {
    expect(suma(1, 3)).toBe(4);
  });
});

describe('processService test', () => {
  const processRepository = new ProcessRepository();
  const minioService = new MinioService();

  minioService.saveImage = jest.fn().mockImplementationOnce(() => Promise.resolve('image1.png'));

  const processService = new ProcessService({ processRepository, minioService });

  test('Test applyFilters funtion with invalid payload', () => {
    expect(processService.applyFilters()).rejects.toThrow();
    expect(processService.applyFilters({})).rejects.toThrow();
    expect(processService.applyFilters({ filters: [] })).rejects.toThrow();
  });

  test('Test applyFilters funtion with valid payload', async () => {
    const payload = {
      filters: ['negative'],
      images: [{ originalname: 'image1.png', buffer: Buffer.from('') }],
    };

    const expectedProcess = {
      id: '1234',
      filters: payload.filters,
      images: payload.images,
    };

    processRepository.save = jest.fn()
      .mockImplementationOnce(() => {
        console.log('Se llama esta funcion mock');
        return expectedProcess;
      });

    const process = await processService.applyFilters(payload);

    expect(process).toMatchObject(expectedProcess);
  });
});
