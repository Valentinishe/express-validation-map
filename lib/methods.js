function isRequired(value) {
    return Boolean(value) || value == 0;
}

function isName(value = undefined){
    if( value === undefined) return true;
    const regName = new RegExp('^[a-zа-я-]+$', 'i');
    return regName.test(value);
}

function isNameWithSpace(value = undefined) { 
    if( value === undefined) return true;
    const regName = new RegExp('^[a-zа-я- ]+$', 'i');
    return regName.test(value);
}

function isEmail(value = undefined) {
    if( value === undefined) return true;
    const regEmail = new RegExp('^[0-9a-z-_\\+.]+\\@([0-9a-z-]{2,}\\.)+[a-z]{2,}$', 'i');
    return regEmail.test(value);
}

function isInteger(value = undefined ) {
    if( value === undefined) return true;
    return Number(value) === +value && +value % 1 === 0 && value !== '';

}

function isDecimal(value = undefined ) {
    if( value === undefined) return true;
    console.log('isDecimal', value );
    return Number(value) === +value && +value % 1 !== 0 && value !== '';

}

function isRangeNumber(min, max) { 
    return value => {
        if( value === undefined) return true;
        return +min <= +value && +max >= +value && value !== '';
    }
}

function isPhoneUSA(value = undefined) {
    if( value === undefined) return true;
    const regPhone = new RegExp('^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$', 'im');
    return regPhone.test(value);
}

function isWebsite(value = undefined) {
    if( value === undefined) return true;
    const regWebsite = new RegExp('^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$', 'gm');
    return regWebsite.test(value);
}

function isStreetAddressUSA ( value = undefined) {
    if( value === undefined) return true;
    const regStreet = new RegExp('^\d+\s[A-z]+\s[A-z]+', 'gi');
    return regStreet.test(value);
   
}

function isZipAddressUSA( value = undefined) {
    if( value === undefined) return true;
    const regZip = new RegExp('^[0-9]{5}(?:-[0-9]{4})?$', 'gi');
    return regZip.test(value);
   
}

function isStateAddressUSA( value = undefined) {
    if( value === undefined) return true;
    const regState = new RegExp('([A-Z]{2})', 'g');
    return regState.test(value);
}

function isUUID( value = undefined) {
    if( value === undefined) return true;
    const regUUID = new RegExp('[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}', 'gm');
    return regUUID.test(value);
}




module.exports = {
    isRequired,
    isEmail,
    isInteger,
    isName,
    isNameWithSpace,
    isRangeNumber,
    isPhoneUSA,
    isWebsite,
    isStreetAddressUSA,
    isZipAddressUSA,
    isStateAddressUSA,
    isDecimal,
    isUUID
}
