import {
  describe, test, expect, jest,
} from '@jest/globals';
import ProcessRepository from '../repositories/ProcessRepository.mjs';

const suma = (a, b) => a + b;

describe('Test Suma', () => {
  test('suma 1 + 2 = 3', () => {
    expect(suma(1, 2)).toBe(3);
  });

  test('suma 1 + 3 = 4', () => {
    expect(suma(1, 3)).toBe(4);
  });
});

describe('processRepository test', () => {
  const processRepository = new ProcessRepository();
});
