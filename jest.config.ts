import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['src'],
  transform: {
    '^.+\\.test.ts$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.test.json',
      },
    ],
  },
  testRegex: '/__tests__/.*.test.ts$',
  verbose: true,
  snapshotFormat: { escapeString: false, printBasicPrototype: false },
};

export default config;
