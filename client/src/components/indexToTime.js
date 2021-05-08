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

function timeToDB(time){
    let timeList = time.split(':');
    timeList = timeList[0] + '.' + timeList[1];
    timeList = parseFloat(timeList);
    return timeList;
}

export {
    indexToTime,
    timeToDB
}