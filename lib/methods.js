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
    const regStreet = new RegExp('^[A-z0-9\- ]{3,}$', 'gi');
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

function isObjectId( value = undefined) {
    if( value === undefined) return true;
    const regObjectId = new RegExp('^[a-f0-9]{24}$', 'gi');
    return regObjectId.test(value);
}


function isEnum(arr) {
    return (value = undefined) => {
        if( value === undefined) return true;
        if(Array.isArray(arr) && arr.includes(value)) {
            return true;
        }
        return false;
    }
}

function isArray(arr) {
    if(arr === undefined) return true;
    if(Array.isArray(arr)) {
        return true;
    }
   return false;
}


function isDateISO8601(date) {
    if( date === undefined ) return true;
    const regDate = new RegExp('^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(\\.[0-9]+)?(Z)?$', 'g');
    return regDate.test(date);
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
    isUUID,
    isObjectId,
    isEnum,
    isArray,
    isDateISO8601
}
