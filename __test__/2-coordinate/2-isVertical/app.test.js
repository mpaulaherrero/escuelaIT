const {coordinateIsVertical} = require("./../../../2-coordinate/2-isVertical/coordinateIsVertical");

describe('Pruebas de Coordinate-IsVertical', () =>{

    test('Debería indicar si el movimiento entre las dos coordenadas es vertical', () =>{
        //Arrange (mocks)
        expect(coordinateIsVertical(2,2,3,2)).toBe("La coordenada origen (2,2) y la coordenada destino (3,2) no es un movimiento vertical");
        expect(coordinateIsVertical(2,2,2,3)).toBe("La coordenada origen (2,2) y la coordenada destino (2,3) si es un movimiento vertical");
    })
})