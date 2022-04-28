const {fractionMultiply} = require("./../../../0-fraction/4-multiply/fractionMultiply");

describe('Pruebas de Fraction-Multiply', () =>{

    test('Debería multiplicar las fracciones 2/3 y 3/4', () =>{
        //Arrange (mocks)
        const answer = fractionMultiply(2, 3, 3, 4);
        //Assert
        expect(answer).toBe("La multiplicación de la fracción 2/3 y la fracción 3/4 es la fracción 6/12");
    })
})