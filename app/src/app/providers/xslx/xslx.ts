import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { IRecord } from 'src/app/common/models';
import { Storage } from '@ionic/storage';
import { recordType } from 'src/app/common/constants';
import { getTableHeaders } from 'src/app/common/utils';
import { DatabaseService } from 'src/app/services/database.service';

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
    let language;
    try {
      language = await this.storage.get('language');
    } catch (error) {
      throw error;
    }
    let headers = getTableHeaders({ ...opts, language });
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
    let title;
    if (language === 'spanish') {
      if (opts.type === recordType.day) {
        title = 'Récord diario de asistencias';
      } else if (opts.type === recordType.month) {
        title = 'Récord del total de asistencias';
      }
    } else {
      if (opts.type === recordType.day) {
        title = 'Daily Attendance Records';
      } else if (opts.type === recordType.month) {
        title = 'Total Attendance Records';
      }
    }
    const workSheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(studentRecords);
    const workBook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, title);
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

  async exportAttendancePerMonth(opts: {
    type: string;
    data: { names: any[]; records: any[] };
    fileName: string;
  }) {
    let language;
    try {
      language = await this.storage.get('language');
    } catch (error) {
      throw error;
    }
    let records = [];
    let headers = ['Date'];
    opts.data.names.forEach((name) => {
      headers.push(name);
    });
    opts.data.records.forEach((record) => {
      let newRecord = [record.date];
      record.record.forEach((data) => {
        if (data.attendance) {
          newRecord.push('o');
        } else {
          newRecord.push('x');
        }
      });
      records.push(newRecord);
    });
    const data = [headers, ...records];
    let title;
    if (language === 'spanish') {
      if (opts.type === recordType.day) {
        title = 'Récord diario de asistencias';
      } else if (opts.type === recordType.month) {
        title = 'Récord del total de asistencias';
      }
    } else {
      if (opts.type === recordType.day) {
        title = 'Daily Attendance Records';
      } else if (opts.type === recordType.month) {
        title = 'Total Attendance Records';
      }
    }
    const workSheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);
    const workBook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, title);
    if (this.platform.is('mobileweb')) {
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
