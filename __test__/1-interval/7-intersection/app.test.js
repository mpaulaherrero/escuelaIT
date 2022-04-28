const {intervalIntersection} = require("./../../../1-interval/7-intersection/intervalIntersection");

describe('Pruebas de Interval-Intersection', () =>{

    test('Debería retornar el intervalo donde se intersectan', () =>{
        expect(intervalIntersection(4,10,-3,4)).toBe("El intervalo [4, 10] intersección con el intervalo [-3, 4] es el intervalo [4, 4]");
        expect(intervalIntersection(4,10,-3,8)).toBe("El intervalo [4, 10] intersección con el intervalo [-3, 8] es el intervalo [4, 8]");
        expect(intervalIntersection(4,10, 5,8)).toBe("El intervalo [4, 10] intersección con el intervalo [5, 8] es el intervalo [5, 8]");
        expect(intervalIntersection(4,10,5,12)).toBe("El intervalo [4, 10] intersección con el intervalo [5, 12] es el intervalo [5, 10]");
        expect(intervalIntersection(4,10,0,100)).toBe("El intervalo [4, 10] intersección con el intervalo [0, 100] es el intervalo [4, 10]");
        expect(intervalIntersection(4,10,-3,3)).toBe("El intervalo [4, 10] no intersecta con el intervalo [-3, 3]");
        expect(intervalIntersection(4,10,11,12)).toBe("El intervalo [4, 10] no intersecta con el intervalo [11, 12]");
        expect(intervalIntersection(10,4,-3,3)).toBe("En alguno de los intervalos el máximo del intervalo no es superior o igual al mínimo");
        expect(intervalIntersection(4,10,3,-3)).toBe("En alguno de los intervalos el máximo del intervalo no es superior o igual al mínimo");
    })
})