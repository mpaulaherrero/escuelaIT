const {timeAdd} = require("./../../../4-time/0-add/timeAdd");

describe('Pruebas de Time-Add', () =>{

    test('Debería retornar las dos hora sumadas', () =>{
        expect(timeAdd(12,12,12,10,10,10)).toBe("La hora 12:12:12 sumada con la hora 10:10:10 es 22:22:22");
        expect(timeAdd(40,40,40,30,30,30)).toBe("La hora 40:40:40 sumada con la hora 30:30:30 es 71:11:10");
    })
})