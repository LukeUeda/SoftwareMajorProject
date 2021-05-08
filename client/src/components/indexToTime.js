function indexToTime(cell, increment){
    const remainder = cell % (60/increment);

    const hour = (cell - remainder) / (60/increment);
    const minutes = remainder * increment;

    const final = pad(hour.toString(), 2) + ":" + pad(minutes.toString(), 2);

    return final;
}

function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function DBtoIndex(time){
    let timeList = (`${time}`).split('.');
    const hours = parseInt(timeList[0]) * 2;
    const minutes = parseFloat(timeList[1]) / 30

    return hours + minutes;
}

function timeToDB(time){
    let timeList = time.split(':');
    timeList = timeList[0] + '.' + timeList[1];
    return timeList;
}

export {
    indexToTime,
    timeToDB,
    DBtoIndex
}