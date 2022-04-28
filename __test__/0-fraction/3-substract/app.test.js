const {fractionSubstract} = require("./../../../0-fraction/3-substract/fractionSubstract");

describe('Pruebas de Fraction-Substract', () =>{

    test('Debería restar las fracciones 2/3 y 3/4', () =>{
        //Arrange (mocks)
        const answer = fractionSubstract(2, 3, 3, 4);
        //Assert
        expect(answer).toBe("La resta de la fracción 2/3 y la fracción 3/4 es la fracción -1/12");
    })
})