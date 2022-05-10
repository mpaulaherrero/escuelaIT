const {validateMinMax} = require("../../../1-interval/4-split/validateMinMax");
const {validateNumInterval} = require("../../../1-interval/4-split/validateNumInterval");
const {intervalSplit} = require("../../../1-interval/4-split/intervalSplit");
describe('Pruebas de Interval-Split', () =>{

    test('Debería retornar los mensajes de error y los intervalos en que se dividió', () =>{
        expect(validateMinMax(4,-10)).toBe(true);
        expect(validateMinMax(4,10)).toBe(false);
        expect(validateNumInterval(-3)).toBe(true);
        expect(validateNumInterval(0)).toBe(true);
        expect(validateNumInterval(2)).toBe(false);
        expect(intervalSplit(4,10,3)).toBe("El intervalo [4, 10] dividido en 3 intervalos son [4, 6], [6, 8] y [8, 10]");
        expect(intervalSplit(4,10,2)).toBe("El intervalo [4, 10] dividido en 2 intervalos son [4, 7] y [7, 10]");
    })
})