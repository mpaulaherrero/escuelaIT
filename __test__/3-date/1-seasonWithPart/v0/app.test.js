const {dateSeasonWithPart} = require("../../../../3-date/1-seasonWithPart/v0/dateSeasonWithPart");

describe('Pruebas de Date-SeasonWithPart', () =>{

    test('Debería indicar en que estación esta la fecha y a qué altura', () =>{
        expect(dateSeasonWithPart(29,1,2022)).toBe("El día 29 del 1 de 2022 cae a mediados de invierno.");
    })
})