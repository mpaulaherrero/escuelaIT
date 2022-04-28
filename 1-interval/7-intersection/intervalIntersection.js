const intervalIntersection = (min1, max1, min2, max2) => {
    
    const minInter = min1 <= min2 ? min2 : min1;
    const maxInter = max1 <= max2 ? max1 : max2;

    const interText = max1 < min2 || max2 < min1 ? `El intervalo [${min1}, ${max1}] no intersecta con el intervalo [${min2}, ${max2}]` : `El intervalo [${min1}, ${max1}] intersección con el intervalo [${min2}, ${max2}] es el intervalo [${minInter}, ${maxInter}]`;

    return `${max1 >= min1 && max2 >= min2 ? `${interText}` : `En alguno de los intervalos el máximo del intervalo no es superior o igual al mínimo`}`;
    
}
module.exports = {intervalIntersection}