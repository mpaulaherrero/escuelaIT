const coordinateIsVertical = (abscissaOrigin, ordinateOrigin, abscissaDestiny, ordinateDestiny) => {
    const moveText = abscissaOrigin == abscissaDestiny ? "si es un movimiento vertical" : "no es un movimiento vertical"

    return `La coordenada origen (${abscissaOrigin},${ordinateOrigin}) y la coordenada destino (${abscissaDestiny},${ordinateDestiny}) ${moveText}`;
}
module.exports = {coordinateIsVertical}