const intervalSplit = (min, max, numInterval) => {
    const longInterval=(max-min)/numInterval;
    //console.writeln(`Tamaño intervalo dividido ${longInterval}`);
    let resultText = `El intervalo [${min}, ${max}] dividido en ${numInterval} intervalos son`
    let minInterval = min;
    let maxInterval = min+longInterval; 

    for(let i=1; i<= numInterval; i++){
        resultText += ` [${minInterval}, ${maxInterval}]`;
        if(i===numInterval-1){
            resultText += ` y`;
        } else {
            if(i<numInterval-1){
                resultText += `,`;
            }    
        }
        minInterval = maxInterval;
        maxInterval = maxInterval + longInterval;
    }
    return resultText;
}
module.exports = {intervalSplit}