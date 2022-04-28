const coordinateIsQueenMovement = (abscissaOrigin, ordinateOrigin, abscissaDestiny, ordinateDestiny) => {
    let diffAbscissa = abscissaOrigin - abscissaDestiny;
    diffAbscissa = diffAbscissa < 0 ? diffAbscissa * -1 : diffAbscissa;
    let diffOrdinate = ordinateOrigin - ordinateDestiny;
    diffOrdinate = diffOrdinate < 0 ? diffOrdinate * -1 : diffOrdinate;

    // movimiento horizontal, vertical o diagonal
    const moveText = ordinateOrigin == ordinateDestiny || abscissaOrigin == abscissaDestiny || diffAbscissa ==  diffOrdinate ? "si es un movimiento de la reina" : "no es un movimiento de la reina";

    return `La coordenada origen (${abscissaOrigin},${ordinateOrigin}) y la coordenada destino (${abscissaDestiny},${ordinateDestiny}) ${moveText}`;
}
module.exports = {coordinateIsQueenMovement}