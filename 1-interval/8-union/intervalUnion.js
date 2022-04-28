const intervalUnion = (min1, max1, min2, max2) => {
    const minUnion = min1 <= min2 ? min1 : min2;
    const maxUnion = max1 <= max2 ? max2 : max1;

    const unionText = max1 < min2 || max2 < min1 ? `[${min1}, ${max1}] ∪ [${min2}, ${max2}]` : `el intervalo [${minUnion}, ${maxUnion}]`;

    return `${max1 >= min1 && max2 >= min2 ? `El intervalo [${min1}, ${max1}] unido con el intervalo [${min2}, ${max2}] es ${unionText}` : `En alguno de los intervalos el máximo del intervalo no es superior o igual al mínimo`}`;
}
module.exports = {intervalUnion}