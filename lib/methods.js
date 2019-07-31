function isRequired(value) {
    return Boolean(value) || value == 0;
}

function isName(value){
    const regName = new RegExp('^[a-zа-я-]+$', 'i');
    return regName.test(value);
}

function isEmail(value) {
    const regEmail = new RegExp('^[0-9a-z-_\\+.]+\\@([0-9a-z-]{2,}\\.)+[a-z]{2,}$', 'i');
    return regEmail.test(value);
}

function isInteger(value) {
    return Number.isInteger(+value);
}

function isRangeNumber(min, max) { 
    return value => +min <= +value && +max >= +value;
}


module.exports = {
    isRequired,
    isEmail,
    isInteger,
    isName,
    isRangeNumber
}
