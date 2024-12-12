module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverage: true, // Enable code coverage
  coverageDirectory: '../coverage', // Output directory for coverage reports
  coverageReporters: ['json', 'text'], // Formats for reports
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: 85,
    },
  },
  coveragePathIgnorePatterns: [
    '/node_modules/',
    'main.ts',
    // 'config/', // Exclude a directory
  ],
};
