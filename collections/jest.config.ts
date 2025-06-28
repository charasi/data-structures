import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
    preset: 'ts-jest/presets/default-esm', // Use the ESM preset
    testEnvironment: 'node',
    extensionsToTreatAsEsm: ['.ts'],
    transform: {
        '^.+\\.ts$': [
            'ts-jest',
            {
                useESM: true,
                tsconfig: './tsconfig.jest.json', // Your custom TS config for Jest
            },
        ],
    },
    transformIgnorePatterns: [
        'node_modules/(?!(YOUR_ESM_PACKAGE)/)', // Optional, remove or replace YOUR_ESM_PACKAGE if you don't have any ESM modules in node_modules
    ],
    // Removed moduleNameMapper to avoid conflicts with node_modules packages like react-is
};

export default config;


