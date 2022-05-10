import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    moduleDirectories: ['node_modules', '.'],
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: '.',
    testEnvironment: 'node',
    testRegex: '.e2e-spec.ts$',
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    verbose: true,
};

export default config;
