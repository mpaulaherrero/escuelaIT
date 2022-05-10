const {dateSeasonWithPart} = require("../../../../3-date/1-seasonWithPart/v0/dateSeasonWithPart");
const { validateDay } = require("../../../../3-date/1-seasonWithPart/v0/validateDay");
const { validateMonth } = require("../../../../3-date/1-seasonWithPart/v0/validateMonth");
const { validateYear } = require("../../../../3-date/1-seasonWithPart/v0/validateYear");

describe('Pruebas de Date-SeasonWithPart', () =>{

    test('Debería indicar en que estación esta la fecha y a qué altura', () =>{
        expect(dateSeasonWithPart(29,1,2022)).toBe("El día 29 del 1 de 2022 cae a mediados de invierno.");
        expect(validateDay(29)).toBe(false);
        expect(validateDay(31)).toBe(true);
        expect(validateDay(0)).toBe(true);
        expect(validateMonth(13)).toBe(true);
        expect(validateMonth(0)).toBe(true);
        expect(validateMonth(1)).toBe(false);
        expect(validateYear(1)).toBe(false);
        expect(validateYear(0)).toBe(true);
    })
})