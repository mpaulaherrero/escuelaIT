const coordinateIsKingMovement = (abscissaOrigin, ordinateOrigin, abscissaDestiny, ordinateDestiny) => {
    //movimiento a una casilla adyasente
    const moveText = abscissaDestiny == abscissaOrigin && ordinateDestiny == ordinateOrigin ? "no es un movimiento" : (abscissaDestiny == abscissaOrigin-1 || abscissaDestiny == abscissaOrigin+1 || abscissaDestiny == abscissaOrigin) && (ordinateDestiny==ordinateOrigin-1 || ordinateDestiny==ordinateOrigin+1 || ordinateDestiny==ordinateOrigin) ? "si es un movimiento del rey" : "no es un movimiento del rey";

    return `La coordenada origen (${abscissaOrigin},${ordinateOrigin}) y la coordenada destino (${abscissaDestiny},${ordinateDestiny}) ${moveText}`;
}
module.exports = {coordinateIsKingMovement}