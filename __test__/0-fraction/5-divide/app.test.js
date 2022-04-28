const {fractionDivide} = require("./../../../0-fraction/5-divide/fractionDivide");

describe('Pruebas de Fraction-Divide', () =>{

    test('Debería dividir las fracciones 2/3 y 3/4', () =>{
        //Arrange (mocks)
        const answer = fractionDivide(2, 3, 3, 4);
        //Assert
        expect(answer).toBe("La división de la fracción 2/3 y la fracción 3/4 es la fracción 8/9");
    })
})