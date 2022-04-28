const {coordinateIsQueenMovement} = require("./../../../2-coordinate/2-isQueenMovement/coordinateIsQueenMovement");

describe('Pruebas de Coordinate-IsQueenMovement', () =>{

    test('Debería indicar si el movimiento es un movimento de la reina', () =>{
        expect(coordinateIsQueenMovement(2,2,3,2)).toBe("La coordenada origen (2,2) y la coordenada destino (3,2) si es un movimiento de la reina");
        expect(coordinateIsQueenMovement(2,2,2,3)).toBe("La coordenada origen (2,2) y la coordenada destino (2,3) si es un movimiento de la reina");
        expect(coordinateIsQueenMovement(2,2,1,3)).toBe("La coordenada origen (2,2) y la coordenada destino (1,3) si es un movimiento de la reina");
        expect(coordinateIsQueenMovement(2,2,2,6)).toBe("La coordenada origen (2,2) y la coordenada destino (2,6) si es un movimiento de la reina");
        expect(coordinateIsQueenMovement(2,2,6,2)).toBe("La coordenada origen (2,2) y la coordenada destino (6,2) si es un movimiento de la reina");
        expect(coordinateIsQueenMovement(2,2,5,5)).toBe("La coordenada origen (2,2) y la coordenada destino (5,5) si es un movimiento de la reina");
        expect(coordinateIsQueenMovement(2,2,4,8)).toBe("La coordenada origen (2,2) y la coordenada destino (4,8) no es un movimiento de la reina");
    })
})