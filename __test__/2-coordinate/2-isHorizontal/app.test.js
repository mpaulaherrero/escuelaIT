const {coordinateIsHorizontal} = require("./../../../2-coordinate/2-isHorizontal/coordinateIsHorizontal");

describe('Pruebas de Coordinate-IsHorizontal', () =>{

    test('Debería indicar si el movimiento entre las dos coordenadas es horizontal', () =>{
        //Arrange (mocks)
        expect(coordinateIsHorizontal(2,2,3,2)).toBe("La coordenada origen (2,2) y la coordenada destino (3,2) si es un movimiento horizontal");
        expect(coordinateIsHorizontal(2,2,2,3)).toBe("La coordenada origen (2,2) y la coordenada destino (2,3) no es un movimiento horizontal");
    })
})