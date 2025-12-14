const { calcularTotal, calcularSubtotal, calcularDescuento } = require('../src/calcular');

describe('Pruebas de Refactorización (Cálculos)', () => {
    
    test('calcularSubtotal multiplica correctamente', () => {
        expect(calcularSubtotal(10, 5)).toBe(50);
    });

    test('calcularDescuento aplica el porcentaje correcto', () => {
        expect(calcularDescuento(100, 20)).toBe(20); // 20% de 100 es 20
    });

    test('calcularTotal devuelve el valor final con descuento', () => {
        // Precio 100, Cantidad 2 = 200
        // Descuento 10% de 200 = 20
        // Total esperado = 180
        expect(calcularTotal(100, 2, 10)).toBe(180);
    });
});