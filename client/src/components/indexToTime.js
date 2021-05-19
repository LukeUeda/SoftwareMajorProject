function indexToTime(cell, increment){
    /**
     * Function takes in index of cell and converts to readable time.
     * @param {[int]} cell <= Cell is the index.
     * @param {[int]} increment <= Time in minutes.
     * @returns {[string]} <= Time in hours and minutes (24hr time.)
     */
    const remainder = cell % (60/increment);

    const hour = (cell - remainder) / (60/increment);
    const minutes = remainder * increment;

    const final = pad(hour.toString(), 2) + ":" + pad(minutes.toString(), 2);

    return final;
}

function pad(n, width, z) { // Padding function for indexToTime.
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function DBtoIndex(time){
    /**
     * Converts Database form (hh.mm) back to index (hard coded 30min increments)
     * @param {[string]} time <= Time in hh.mm
     * @returns {[int]} <= Index of cell in day.
     */
    let timeList = (`${time}`).split('.');
    const hours = parseInt(timeList[0]) * 2;
    const minutes = parseFloat(timeList[1]) / 30

    return hours + minutes;
}

function timeToIndex(time){
    /**
     * Converts Database form (hh:mm) back to index (hard coded 30min increments)
     * @param {[string]} time <= Time in hh.mm
     * @returns {[int]} <= Index of cell in day.
     */
    let timeList = (`${time}`).split(':');
    const hours = parseInt(timeList[0]) * 2;
    const minutes = parseFloat(timeList[1]) / 30

    return hours + minutes;
}


function timeToDB(time){
    /**
     * Database did not allow for colons so this function replaces it with a decimal. Furthermore, a decimal allows
     * for conversion tn to floating point number, hence allowing for two times to be compared.
     * @param {[string]} time <= Time in hh:mm
     * @returns {[string]} <= Time in hh.mm
     */
    let timeList = time.split(':');
    timeList = timeList[0] + '.' + timeList[1];
    return timeList;
}

function DBtoTime(time){ // Reverse of timeToDB
    let timeList = time.split('.');
    timeList = timeList[0] + ':' + timeList[1];
    return timeList;
}

export {
    indexToTime,
    timeToDB,
    timeToIndex,
    DBtoIndex,
    DBtoTime,
}