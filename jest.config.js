module.exports = {
  // Configuración de Jest
  testEnvironment: 'jsdom',
  
  // Configuración para el reporte JUnit
  reporters: [
    'default',
    ['jest-junit', {
      outputDirectory: 'test-results',
      outputName: 'junit.xml',
      ancestorSeparator: ' > ',
      uniqueOutputName: 'false',
      suiteNameTemplate: '{filepath}'
    }]
  ],
  
  // Configuración de cobertura
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'text', 'clover']
};
