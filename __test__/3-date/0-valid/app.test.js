const {dateValid} = require("./../../../3-date/0-valid/dateValid");

describe('Pruebas de Date-Valid', () =>{

    test('Debería indicar si la fecha es válida', () =>{
        expect(dateValid(12,12,12)).toBe("La fecha 12/12/12 sí es válida");
        expect(dateValid(30,30,30)).toBe("La fecha 30/30/30 no es válida");
        expect(dateValid(2022,2022,2022)).toBe("La fecha 2022/2022/2022 no es válida");
        //meses de 30 días
        expect(dateValid(30,4,2022)).toBe("La fecha 30/4/2022 sí es válida");
        expect(dateValid(31,4,2022)).toBe("La fecha 31/4/2022 no es válida");
        expect(dateValid(31,6,2022)).toBe("La fecha 31/6/2022 no es válida");
        expect(dateValid(31,9,2022)).toBe("La fecha 31/9/2022 no es válida");
        expect(dateValid(31,11,2022)).toBe("La fecha 31/11/2022 no es válida");
        //febrero y años bisiestos
        expect(dateValid(29,2,2020)).toBe("La fecha 29/2/2020 sí es válida");
        expect(dateValid(30,2,2020)).toBe("La fecha 30/2/2020 no es válida");
        expect(dateValid(29,2,2022)).toBe("La fecha 29/2/2022 no es válida");
        expect(dateValid(28,2,2022)).toBe("La fecha 28/2/2022 sí es válida");
        //mes de 31 dias
        expect(dateValid(32,12,2022)).toBe("La fecha 32/12/2022 no es válida");
        //año negativo
        expect(dateValid(12,12,-22)).toBe("La fecha 12/12/-22 no es válida");
    })
})