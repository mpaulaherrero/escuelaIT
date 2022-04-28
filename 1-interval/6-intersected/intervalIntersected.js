const intervalIntersected = (min1, max1, min2, max2) => {
    
    const interText = max1 < min2 || max2 < min1 ? "no intersecta" : "si intersecta";

    return `${max1 >= min1 && max2 >= min2 ? `El intervalo [${min1}, ${max1}] ${interText} con el intervalo [${min2}, ${max2}]` : `En alguno de los intervalos el máximo del intervalo no es superior o igual al mínimo`}`;
    
}
module.exports = {intervalIntersected}