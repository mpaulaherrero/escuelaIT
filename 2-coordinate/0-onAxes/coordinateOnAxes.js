const coordinateOnAxes = (abscissa, ordinate) => {
    const axisText = abscissa == 0 && ordinate == 0 ? "está en el eje de abcisas y de ordenadas" : (abscissa == 0 ? "está en el eje de abcisas" : (ordinate == 0 ? "está en el eje de ordenadas" : "no está en ningún eje"));

    return`La coordenada (${abscissa},${ordinate}) ${axisText}`;
}
module.exports = {coordinateOnAxes}