const {fractionInverse} = require("./../../../0-fraction/0-1-inverse/fractionInverse");

describe('Pruebas de Fraction-Inverse', () =>{

    test('Debería Invertir la fracción con simplificación', () =>{
        expect(fractionInverse(2,3)).toBe("La fracción 2/3 invertida es la fracción 3/2");
        expect(fractionInverse(3,18)).toBe("La fracción 3/18 = 1/6 invertida es la fracción 6/1");
        expect(fractionInverse(2,5)).toBe("La fracción 2/5 invertida es la fracción 5/2");
    })


})