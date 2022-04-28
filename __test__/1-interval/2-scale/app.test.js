const {intervalScale} = require("./../../../1-interval/2-scale/intervalScale");

describe('Pruebas de Interval-Scale', () =>{

    test('Debería retornar el intervalo escalado', () =>{
        expect(intervalScale(4,10,2)).toBe("El intervalo [4, 10] con factor de escala 2 es el intervalo [1, 13]");
        expect(intervalScale(4,10,0.5)).toBe("El intervalo [4, 10] con factor de escala 0.5 es el intervalo [5.5, 8.5]");
        expect(intervalScale(4,10,0)).toBe("El intervalo [4, 10] con factor de escala 0 es el intervalo [7, 7]");
        expect(intervalScale(10,4,2)).toBe("El máximo del intervalo no es superior o igual al mínimo o el factor de escala no es positivo");
        expect(intervalScale(4,10,-2)).toBe("El máximo del intervalo no es superior o igual al mínimo o el factor de escala no es positivo");
    })
})