const intervalLength = (min, max) => {
    return `${max >= min ? `La longitud del intervalo [${min}, ${max}] es ${max-min}` : `El máximo del intervalo no es superior o igual al mínimo`}`;
}
module.exports = {intervalLength}