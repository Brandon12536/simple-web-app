// Importar la función a probar
const { sumar } = require('../js/app');

// Grupo de pruebas para la función sumar
describe('Función sumar', () => {
    // Prueba 1: Suma de números positivos
    test('debe sumar correctamente dos números positivos', () => {
        expect(sumar(2, 3)).toBe(5);
    });

    // Prueba 2: Suma de números negativos
    test('debe sumar correctamente números negativos', () => {
        expect(sumar(-1, -1)).toBe(-2);
    });

    // Prueba 3: Suma de cero
    test('debe manejar correctamente el cero', () => {
        expect(sumar(0, 5)).toBe(5);
        expect(sumar(5, 0)).toBe(5);
    });

    // Prueba 4: Suma de decimales
    test('debe manejar correctamente números decimales', () => {
        expect(sumar(0.1, 0.2)).toBeCloseTo(0.3);
    });
});
