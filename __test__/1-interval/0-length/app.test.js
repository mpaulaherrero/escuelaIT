const {intervalLength} = require("./../../../1-interval/0-length/intervalLength");

describe('Pruebas de Interval-Length', () =>{

    test('Debería dar la longitud del intervalo', () =>{
        //Arrange (mocks)
        expect(intervalLength(4,9)).toBe("La longitud del intervalo [4, 9] es 5");
        expect(intervalLength(4,4)).toBe("La longitud del intervalo [4, 4] es 0");
        expect(intervalLength(9,4)).toBe("El máximo del intervalo no es superior o igual al mínimo");
    })
})