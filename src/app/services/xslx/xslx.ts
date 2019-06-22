import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { IRecord, IResponse } from 'src/app/common/models';
import { recordType } from 'src/app/common/constants';
import { addZeroInFront } from 'src/app/common/validation';

@Injectable({
  providedIn: 'root'
})
export class XLSXProvider {

  constructor(private platform: Platform) { }

  exportXLSXToFile(opts: { type: string, records: IRecord[] }): IResponse<Blob | string> {
    const response: IResponse<any> = {
      success: false,
      error: null,
      data: undefined
    };
    try {
      const blob = this.createXLSX({ type: opts.type, records: opts.records });
      return {
        ...response,
        success: true,
        data: blob
      };;
    } catch (error) {
      return {
        ...response,
        error: error
      };
    }
  }

  private createXLSX(opts: { type: string, records: IRecord[] }): Blob| string {
    let headers;
      if (opts.type === recordType.month) {
        headers = ['Id', 'Name', 'Attendance', 'Absence', 'Attendance %'];
      }
      if (opts.type === recordType.day) {
        headers = ['Id', 'Name', 'Attendance', 'Absence'];
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
        if (this.platform.is('desktop')) {
          const date = new Date();
// tslint:disable-next-line: max-line-length
          const fileName = `AttendanceLog-${date.getFullYear()}-${addZeroInFront(date.getMonth() + 1)}-${addZeroInFront(date.getDate())}.xlsx`;
          XLSX.writeFile(wb, fileName);
          return undefined;
        } else {
          const wbout: ArrayBuffer = XLSX.write(wb, {
            bookType: 'xlsx',
            type: 'array'
          });
          const blob = new Blob([wbout], { type: 'application/octet-stream' });
          return blob;
        }
      } catch (error) {
        return 'There are no students created in database!';
      }
  }

}
