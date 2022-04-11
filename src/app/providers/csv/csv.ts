import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { IRecord, IResponse } from 'src/app/common/models';
import { recordType } from 'src/app/common/constants';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root',
})
export class CSVProvider {
  constructor(private platform: Platform, private storage: Storage) {}

  async exportCSV(opts: {
    fileName: string;
    type: string;
    records: IRecord[];
  }) {
    let headers;
    let language;
    try {
      language = await this.storage.get('language');
    } catch (error) {
      throw error;
    }
    if (language === 'spanish') {
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
    let studentRecords: IRecord[][] = [];
    try {
      studentRecords = opts.records.map((record) => {
        let temp = [];
        if (opts.type === recordType.month) {
          temp = [
            ...[
              record.id,
              record.fullName,
              record.attendance,
              record.absence,
              record.percent,
            ],
          ];
        }
        if (opts.type === recordType.day) {
          temp = [
            ...[record.id, record.fullName, record.attendance, record.absence],
          ];
        }
        return temp;
      });
      studentRecords.unshift(headers);
    } catch (error) {
      if (language === 'spanish') {
        throw '¡No hay estudiantes en la base de datos!';
      } else {
        throw 'There are no students created in database!';
      }
    }
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(studentRecords);
    const csv = XLSX.utils.sheet_to_csv(ws);
    if (this.platform.is('desktop') || this.platform.is('mobileweb')) {
      const hiddenElement = document.createElement('a');
      hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
      hiddenElement.target = '_blank';

      //provide the name for the CSV file to be downloaded
      hiddenElement.download = `${opts.fileName}.csv`;
      hiddenElement.click();
    }
    return csv;
  }
}
