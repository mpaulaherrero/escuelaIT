const intervalShifted = (min, max, factor) => {
    return `${max >= min ? `El intervalo [${min}, ${max}] con factor de desplazamiento ${factor} es el intervalo [${min+factor}, ${max+factor}]` : `El máximo del intervalo no es superior o igual al mínimo`}`;
}
module.exports = {intervalShifted}