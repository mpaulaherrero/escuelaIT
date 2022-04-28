const {intervalUnion} = require("./../../../1-interval/8-union/intervalUnion");

describe('Pruebas de Interval-Union', () =>{

    test('Debería retornar el intervalo donde se unen', () =>{
        expect(intervalUnion(4,10,-3,4)).toBe("El intervalo [4, 10] unido con el intervalo [-3, 4] es el intervalo [-3, 10]");
        expect(intervalUnion(4,10,-3,8)).toBe("El intervalo [4, 10] unido con el intervalo [-3, 8] es el intervalo [-3, 10]");
        expect(intervalUnion(4,10, 5,8)).toBe("El intervalo [4, 10] unido con el intervalo [5, 8] es el intervalo [4, 10]");
        expect(intervalUnion(4,10,5,12)).toBe("El intervalo [4, 10] unido con el intervalo [5, 12] es el intervalo [4, 12]");
        expect(intervalUnion(4,10,0,100)).toBe("El intervalo [4, 10] unido con el intervalo [0, 100] es el intervalo [0, 100]");
        expect(intervalUnion(4,10,-3,3)).toBe("El intervalo [4, 10] unido con el intervalo [-3, 3] es [4, 10] ∪ [-3, 3]");
        expect(intervalUnion(4,10,11,12)).toBe("El intervalo [4, 10] unido con el intervalo [11, 12] es [4, 10] ∪ [11, 12]");
        expect(intervalUnion(10,4,-3,3)).toBe("En alguno de los intervalos el máximo del intervalo no es superior o igual al mínimo");
        expect(intervalUnion(4,10,3,-3)).toBe("En alguno de los intervalos el máximo del intervalo no es superior o igual al mínimo");
    })
})