const {datePrevious} = require("./../../../3-date/2-previous/datePrevious");

describe('Pruebas de Date-Previous', () =>{

    test('Debería retornar la fecha previa', () =>{
        expect(datePrevious(12,12,12)).toBe("La fecha 12/12/12 y la anterior es 11/12/12");
        expect(datePrevious(1,1,12)).toBe("La fecha 1/1/12 y la anterior es 31/12/11");
        expect(datePrevious(1,4,12)).toBe("La fecha 1/4/12 y la anterior es 31/3/12");
        expect(datePrevious(1,5,12)).toBe("La fecha 1/5/12 y la anterior es 30/4/12");
        //meses de 30 días
        expect(datePrevious(30,4,2022)).toBe("La fecha 30/4/2022 y la anterior es 29/4/2022");
        expect(datePrevious(31,4,2022)).toBe("La fecha 31/4/2022 no es válida");
        expect(datePrevious(31,6,2022)).toBe("La fecha 31/6/2022 no es válida");
        expect(datePrevious(31,9,2022)).toBe("La fecha 31/9/2022 no es válida");
        expect(datePrevious(31,11,2022)).toBe("La fecha 31/11/2022 no es válida");
        //febrero y años bisiestos
        expect(datePrevious(29,2,2020)).toBe("La fecha 29/2/2020 y la anterior es 28/2/2020");
        expect(datePrevious(30,2,2020)).toBe("La fecha 30/2/2020 no es válida");
        expect(datePrevious(29,2,2022)).toBe("La fecha 29/2/2022 no es válida");
        expect(datePrevious(28,2,2022)).toBe("La fecha 28/2/2022 y la anterior es 27/2/2022");
        //mes de 31 dias
        expect(datePrevious(32,12,2022)).toBe("La fecha 32/12/2022 no es válida");
        //año negativo
        expect(datePrevious(12,12,-22)).toBe("La fecha 12/12/-22 no es válida");
    })
})