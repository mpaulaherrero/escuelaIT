const {coordinateQuadrant} = require("./../../../2-coordinate/1-quadrant/coordinateQuadrant");

describe('Pruebas de Coordinate-Quadrant', () =>{

    test('Debería indicar en que cuadrante esta la coordenada', () =>{
        //Arrange (mocks)
        expect(coordinateQuadrant(2,2)).toBe("La coordenada (2,2) está en el 1º cuadrante.");
        expect(coordinateQuadrant(-2,2)).toBe("La coordenada (-2,2) está en el 2º cuadrante.");
        expect(coordinateQuadrant(-2,-2)).toBe("La coordenada (-2,-2) está en el 3º cuadrante.");
        expect(coordinateQuadrant(2,-2)).toBe("La coordenada (2,-2) está en el 4º cuadrante.");
        expect(coordinateQuadrant(0,0)).toBe("La coordenada (0,0) no esta en ningun cuadrante.");
    })
})