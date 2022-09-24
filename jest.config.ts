import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['src'],
  transform: {
    '^.+\\.test.ts$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: '<rootDir>/tsconfig.test.json',
        diagnostics: true,
      },
    ],
  },
  testRegex: '/__tests__/.*.test.ts$',
  verbose: true,
};

export default config;
