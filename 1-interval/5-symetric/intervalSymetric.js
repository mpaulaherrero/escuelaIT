const intervalSymetric = (min, max) => {
    return `${max >= min ? `El intervalo [${min}, ${max}] simétrico al origen es [${max*-1}, ${min*-1}]` : `El máximo del intervalo no es superior o igual al mínimo`}`;
}
module.exports = {intervalSymetric}