module.exports = {
  // Configuración de Jest
  testEnvironment: 'jsdom',
  
  // Configuración para el reporte JUnit
  reporters: [
    'default',
    ['jest-junit', {
      outputDirectory: './test-results',
      outputName: 'junit.xml',
      outputFile: './test-results/junit.xml',
      ancestorSeparator: ' > ',
      uniqueOutputName: 'false',
      suiteNameTemplate: '{filepath}'
    }]
  ],
  
  // Configuración de cobertura
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'text', 'clover'],
  
  // Configuración adicional para asegurar la generación de informes
  testResultsProcessor: 'jest-junit',
  
  // Asegurarse de que las pruebas se ejecuten en serie para evitar problemas
  maxWorkers: 1,
  
  // Mostrar salida detallada
  verbose: true
};
