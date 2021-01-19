export function dateToISO(year, month, day){
    if (month < 10) {
        month = `0${month}`
    }
    if (day < 10) {
        day = `0${day}`
    }
    return `${month}${day}${year}`
}