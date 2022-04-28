const intervalInclude = (min, max, point) => {
    const includeText = min <= point && point <= max ? `si incluye`: `no incluye`;
    return `${max >= min ? `El intervalo [${min}, ${max}] ${includeText} el punto ${point}`  : `El máximo del intervalo no es superior o igual al mínimo`}`;
}
module.exports = {intervalInclude}