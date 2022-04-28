const {coordinateIsKingMovement} = require("./../../../2-coordinate/2-isKingMovement/coordinateIsKingMovement");

describe('Pruebas de Coordinate-IsKingMovement', () =>{

    test('Debería indicar si el movimiento es un movimento del rey', () =>{
        expect(coordinateIsKingMovement(2,2,3,2)).toBe("La coordenada origen (2,2) y la coordenada destino (3,2) si es un movimiento del rey");
        expect(coordinateIsKingMovement(2,2,2,3)).toBe("La coordenada origen (2,2) y la coordenada destino (2,3) si es un movimiento del rey");
        expect(coordinateIsKingMovement(2,2,1,3)).toBe("La coordenada origen (2,2) y la coordenada destino (1,3) si es un movimiento del rey");
        expect(coordinateIsKingMovement(2,2,4,5)).toBe("La coordenada origen (2,2) y la coordenada destino (4,5) no es un movimiento del rey");
    })
})