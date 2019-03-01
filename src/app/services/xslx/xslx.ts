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
      let data = null;
      switch (opts.type) {
        case recordType.month:
          data = await this.createXLSX(opts.records);
          break;
      }

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

  private createXLSX(records: IRecord[]): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const headers = [
        ['Id', 'Name', 'Attendance', 'Absence', 'Attendance %']
      ];
      try {
        records.map(record => {
          const studentsRecords = [
            ...headers,
            [record.id, record.fullName, record.attendance, record.absence, record.percent]
          ];
          const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(studentsRecords);
          const wb: XLSX.WorkBook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, 'Students Attendance Records');
          const wbout: ArrayBuffer = XLSX.write(wb, {
            bookType: 'xlsx',
            type: 'array'
          });
          const blob = new Blob([wbout], { type: 'application/octet-stream' });
          resolve(blob);
        });
      } catch (error) {
        reject('There are no students created in database!');
      }
    });
  }

}
