import { recordType } from "./constants";

export function dateToISO(year, month, day){
    if (month < 10) {
        month = `0${month}`
    }
    if (day < 10) {
        day = `0${day}`
    }
    return `${month}${day}${year}`
}

export function getTableHeaders(opts: {language: string, type: string}){
let headers;
    if (opts.language === 'spanish') {
        if (opts.type === recordType.month) {
          headers = ['Id', 'Nombre', 'Asistencia', 'Ausencia', '% de Asistencia'];
        }
        if (opts.type === recordType.day) {
          headers = ['Id', 'Nombre', 'Asistencia', 'Ausencia'];
        }
      } else {
        if (opts.type === recordType.month) {
          headers = ['Id', 'Name', 'Attendance', 'Absence', 'Attendance %'];
        }
        if (opts.type === recordType.day) {
          headers = ['Id', 'Name', 'Attendance', 'Absence'];
        }
      }
      return headers
}