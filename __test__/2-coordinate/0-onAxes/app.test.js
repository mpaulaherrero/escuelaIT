const {coordinateOnAxes} = require("./../../../2-coordinate/0-onAxes/coordinateOnAxes");

describe('Pruebas de Coordinate-OnAxes', () =>{

    test('Debería indicar si la coordenada esta en algún eje', () =>{
        //Arrange (mocks)
        expect(coordinateOnAxes(2,2)).toBe("La coordenada (2,2) no está en ningún eje");
        expect(coordinateOnAxes(0,2)).toBe("La coordenada (0,2) está en el eje de abcisas");
        expect(coordinateOnAxes(2,0)).toBe("La coordenada (2,0) está en el eje de ordenadas");
        expect(coordinateOnAxes(0,0)).toBe("La coordenada (0,0) está en el eje de abcisas y de ordenadas");
    })
})