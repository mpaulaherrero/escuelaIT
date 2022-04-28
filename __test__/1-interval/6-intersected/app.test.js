const {intervalIntersected} = require("./../../../1-interval/6-intersected/intervalIntersected");

describe('Pruebas de Interval-Intersected', () =>{

    test('Debería indicar si los intervalos se intersectan', () =>{
        expect(intervalIntersected(4,10,-3,3)).toBe("El intervalo [4, 10] no intersecta con el intervalo [-3, 3]");
        expect(intervalIntersected(4,10,-3,4)).toBe("El intervalo [4, 10] si intersecta con el intervalo [-3, 4]");
        expect(intervalIntersected(4,10,-3,8)).toBe("El intervalo [4, 10] si intersecta con el intervalo [-3, 8]");
        expect(intervalIntersected(4,10, 5,8)).toBe("El intervalo [4, 10] si intersecta con el intervalo [5, 8]");
        expect(intervalIntersected(4,10,5,12)).toBe("El intervalo [4, 10] si intersecta con el intervalo [5, 12]");
        expect(intervalIntersected(4,10,11,12)).toBe("El intervalo [4, 10] no intersecta con el intervalo [11, 12]");
        expect(intervalIntersected(4,10,0,100)).toBe("El intervalo [4, 10] si intersecta con el intervalo [0, 100]");
        expect(intervalIntersected(10,4,-3,3)).toBe("En alguno de los intervalos el máximo del intervalo no es superior o igual al mínimo");
        expect(intervalIntersected(4,10,3,-3)).toBe("En alguno de los intervalos el máximo del intervalo no es superior o igual al mínimo");
    })
})