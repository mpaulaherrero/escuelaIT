const coordinateIsHorizontal = (abscissaOrigin, ordinateOrigin, abscissaDestiny, ordinateDestiny) => {
    const moveText = ordinateOrigin == ordinateDestiny ? "si es un movimiento horizontal" : "no es un movimiento horizontal"

    return `La coordenada origen (${abscissaOrigin},${ordinateOrigin}) y la coordenada destino (${abscissaDestiny},${ordinateDestiny}) ${moveText}`;

}
module.exports = {coordinateIsHorizontal}