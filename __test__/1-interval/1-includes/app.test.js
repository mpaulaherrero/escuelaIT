const {intervalInclude} = require("./../../../1-interval/1-includes/intervalInclude");

describe('Pruebas de Interval-Includes', () =>{

    test('Debería indicar si un intervalo esta incluído en el otro', () =>{
        //Arrange (mocks)
        expect(intervalInclude(4,9,2)).toBe("El intervalo [4, 9] no incluye el punto 2");
        expect(intervalInclude(4,9,5)).toBe("El intervalo [4, 9] si incluye el punto 5");
        expect(intervalInclude(4,9,9)).toBe("El intervalo [4, 9] si incluye el punto 9");
        expect(intervalInclude(4,9,12)).toBe("El intervalo [4, 9] no incluye el punto 12");
        expect(intervalInclude(4,4,4)).toBe("El intervalo [4, 4] si incluye el punto 4");
    })
})