function indexToTime(cell, increment){
    const remainder = cell % (60/increment);

    const hour = (cell - remainder) / (60/increment);
    const minutes = remainder * increment;

    const final = hour.toString() + ":" + pad(minutes.toString(), 2);

    return final;
}

function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

export default indexToTime