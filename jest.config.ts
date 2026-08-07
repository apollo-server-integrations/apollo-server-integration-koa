import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  roots: ['src'],
  extensionsToTreatAsEsm: ['.ts'],
  // Relative imports in ESM source/tests must include the `.js` extension
  // (even though the files are `.ts`); map them back so ts-jest can resolve
  // them to the TypeScript source.
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: 'tsconfig.test.json',
      },
    ],
  },
  testRegex: '/__tests__/.*.test.ts$',
  verbose: true,
};

export default config;
