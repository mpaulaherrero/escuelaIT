const {fractionAdd} = require("./../../../0-fraction/2-add/fractionAdd");

describe('Pruebas de Fraction-Add', () =>{

    test('Debería sumar las fracciones 2/3 y 3/4', () =>{
        //Arrange (mocks)
        const answer = fractionAdd(2, 3, 3, 4);
        //Assert
        expect(answer).toBe("La suma de la fracción 2/3 y la fracción 3/4 es la fracción 17/12");
    })
})