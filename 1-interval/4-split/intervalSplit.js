const intervalSplit = (min, max, numIntervals) => {
    const longInterval=(max-min)/numIntervals;

    let resultText = `El intervalo [${min}, ${max}] dividido en ${numIntervals} intervalos son`
    let minInterval = min;

    for(let i=0; i<numIntervals; i++){
        resultText += ` [${minInterval}, ${minInterval + longInterval}]`;
        resultText += i < numIntervals-2 ? `,`: i===numIntervals-2 ? ` y`: ``;
        minInterval = minInterval + longInterval;
    }
    return resultText;
}
module.exports = {intervalSplit}