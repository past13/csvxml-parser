import moment from 'moment';

export function isNumber(value: any) {
    if (!value.match(/\d+/g)) {
        return false;
    }
    
    return true;
}

export function isDecimal(value: any) {
    if (!/^\s*-?\d+(\.\d{1,2})?\s*$/.test(value)) {
        return false;
    } 

    return true;
}

export function isDateValid(value: string) {
    var dateTime = new Date(value);
    if(!moment(dateTime, 'YYYY/MM/DD HH:mm:ss').isValid()) {
        return false;
    }

    return true;
}