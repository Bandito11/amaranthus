import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { IRecord } from 'src/app/common/models';
import { recordType } from 'src/app/common/constants';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root',
})
export class XLSXProvider {
  constructor(private platform: Platform, private storage: Storage) {}

  async exportXLSXToFile(opts: {
    type: string;
    records: IRecord[];
    fileName: string;
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
      throw error;
    }
    const workSheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(studentRecords);
    const workBook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      workBook,
      workSheet,
      'Students Attendance Records'
    );
    if (this.platform.is('desktop') || this.platform.is('mobileweb')) {
      XLSX.writeFile(workBook, opts.fileName);
      return 'success';
    } else {
      const outfile = XLSX.write(workBook, {
        bookType: 'xlsx',
        type: 'base64',
      });
      return outfile;
    }
  }
}
