const {intervalSymetric} = require("./../../../1-interval/5-symetric/intervalSymetric");

describe('Pruebas de Interval-Symetric', () =>{

    test('Debería retornar el intervalo simétrico', () =>{
        expect(intervalSymetric(4,10)).toBe("El intervalo [4, 10] simétrico al origen es [-10, -4]");
        expect(intervalSymetric(-4,10)).toBe("El intervalo [-4, 10] simétrico al origen es [-10, 4]");
        expect(intervalSymetric(-10,-4)).toBe("El intervalo [-10, -4] simétrico al origen es [4, 10]");
        expect(intervalSymetric(10,4)).toBe("El máximo del intervalo no es superior o igual al mínimo");
    })
})