import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { IRecord, IResponse } from 'src/app/common/models';
import { recordType } from 'src/app/common/constants';

@Injectable({ providedIn: 'root' })
export class XLSXProvider {

  constructor() { }

  async exportXLSXToFile(opts: { type: string, records: IRecord[] }): Promise<IResponse<Blob>> {
    let response: IResponse<Blob> = {
      success: false,
      error: null,
      data: undefined
    };
    try {
      const data = await this.createXLSX({ type: opts.type, records: opts.records });
      response = {
        ...response,
        success: true,
        data: data
      };
      return response;
    } catch (error) {
      response = {
        ...response,
        error: error
      };
      return error;
    }
  }

  private createXLSX(opts: { type: string, records: IRecord[] }): Promise<Blob> {
    let headers;
    return new Promise((resolve, reject) => {
      if (opts.type === recordType.month) {
        headers = ['Id', 'Name', 'Attendance', 'Absence', 'Attendance %'];
      }
      if (opts.type === recordType.day) {
        headers =           ['Id', 'Name', 'Attendance', 'Absence'];
      }
      try {
        const studentRecords = opts.records.map((record) => {
          let temp = [];
          if (opts.type === recordType.month) {
            temp = [...[record.id, record.fullName, record.attendance, record.absence, record.percent]];
          }
          if (opts.type === recordType.day) {
            temp = [...[record.id, record.fullName, record.attendance, record.absence]];
          }
          return temp;
        });
        studentRecords.unshift(headers);
        const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(studentRecords);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Students Attendance Records');
        const wbout: ArrayBuffer = XLSX.write(wb, {
          bookType: 'xlsx',
          type: 'array'
        });
        const blob = new Blob([wbout], { type: 'application/octet-stream' });
        resolve(blob);
      } catch (error) {
        reject('There are no students created in database!');
      }
    });
  }

}
