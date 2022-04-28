const {coordinateIsHorseMovement} = require("./../../../2-coordinate/2-isHorseMovement/coordinateIsHorseMovement");

describe('Pruebas de Coordinate-IsHorseMovement', () =>{

    test('Debería indicar si el movimiento es un movimento del caballo', () =>{
        expect(coordinateIsHorseMovement(1,2,3,3)).toBe("La coordenada origen (1,2) y la coordenada destino (3,3) si es un movimiento del caballo");
        expect(coordinateIsHorseMovement(1,2,2,3)).toBe("La coordenada origen (1,2) y la coordenada destino (2,3) no es un movimiento del caballo");
        expect(coordinateIsHorseMovement(8,1,6,2)).toBe("La coordenada origen (8,1) y la coordenada destino (6,2) si es un movimiento del caballo");
        expect(coordinateIsHorseMovement(2,2,4,8)).toBe("La coordenada origen (2,2) y la coordenada destino (4,8) no es un movimiento del caballo");
    })
})