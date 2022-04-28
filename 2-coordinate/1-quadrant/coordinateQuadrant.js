const coordinateQuadrant = (abscissa, ordinate) => {
    const axisText = abscissa == 0 && ordinate == 0 ? "no esta en ningun cuadrante" : (abscissa > 0 ? (ordinate > 0 ? "está en el 1º cuadrante" : "está en el 4º cuadrante") : (ordinate > 0 ? "está en el 2º cuadrante" : "está en el 3º cuadrante"));

    return `La coordenada (${abscissa},${ordinate}) ${axisText}.`;
}
module.exports = {coordinateQuadrant}