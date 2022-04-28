const intervalScale = (min, max, scale) => {
    const middle = max >= min && scale >=0 ? (min + max) / 2 : undefined;
    const distance = middle != undefined ? (max-middle) * scale : undefined;
    return `${distance != undefined ? `El intervalo [${min}, ${max}] con factor de escala ${scale} es el intervalo [${middle-distance}, ${middle+distance}]` : `El máximo del intervalo no es superior o igual al mínimo o el factor de escala no es positivo`}`;
}
module.exports = {intervalScale}