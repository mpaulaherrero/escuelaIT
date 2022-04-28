const timeAdd = (hour1, min1, seg1, hour2, min2, seg2) => {
    let addValue = 0;
    let newSeg = seg1 + seg2 
    newSeg = newSeg < 60 ? newSeg: (addValue = 1, newSeg - 60);
    let newMin = min1 + min2 + addValue;
    addValue = 0;
    newMin = newMin < 60 ? newMin: (addValue = 1, newMin - 60);
    const newHour = hour1 + hour2 + addValue;

    return `La hora ${hour1}:${min1}:${seg1} sumada con la hora ${hour2}:${min2}:${seg2} es ${newHour}:${newMin}:${newSeg}`;
}
module.exports = {timeAdd}