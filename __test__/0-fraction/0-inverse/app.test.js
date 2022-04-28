const {fractionInverse} = require("./../../../0-fraction/0-inverse/fractionInverse");

describe('Pruebas de Fraction-Inverse', () =>{

    test('Debería Invertir la fracción 2/3', () =>{
        //Arrange (mocks)
        const answer = fractionInverse(2,3);
        //Assert
        expect(answer).toBe("La fracción 2/3 invertida es la fracción 3/2");
    })


})