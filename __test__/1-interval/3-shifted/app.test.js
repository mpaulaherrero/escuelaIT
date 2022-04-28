const {intervalShifted} = require("./../../../1-interval/3-shifted/intervalShifted");

describe('Pruebas de Interval-Shifted', () =>{

    test('Debería retornar el intervalo movido', () =>{
        expect(intervalShifted(4,10,1)).toBe("El intervalo [4, 10] con factor de desplazamiento 1 es el intervalo [5, 11]");
        expect(intervalShifted(4,10,-4)).toBe("El intervalo [4, 10] con factor de desplazamiento -4 es el intervalo [0, 6]");
        expect(intervalShifted(10,4,2)).toBe("El máximo del intervalo no es superior o igual al mínimo");
    })
})