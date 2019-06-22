import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { IRecord, IResponse } from 'src/app/common/models';
import { recordType } from 'src/app/common/constants';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class TextTabDelimitedProvider {

  constructor(private platform: Platform) { }

  async exportTextTabDelimited(opts: { type: string, records: IRecord[] }): Promise<IResponse<Blob>> {
    let response: IResponse<Blob> = {
      success: false,
      error: null,
      data: undefined
    };
    try {
      const data = await this.createTextTab({ type: opts.type, records: opts.records });
      response = {
        ...response,
        success: true,
        data: data
      };
      return response;
    } catch (error) {
      return {
        ...response,
        error: error
      };
    }
  }

  private createTextTab(opts: { type: string, records: IRecord[] }): Promise<Blob> {
    let headers;
    return new Promise((resolve, reject) => {
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
        const text = XLSX.utils.sheet_to_txt(ws);
        let blob;
        if (this.platform.is('desktop')) {
          blob = text;
        } else {
          blob = new Blob([text], { type: 'application/octet-stream' });
        }
        resolve(blob);
      } catch (error) {
        reject('There are no students created in database!');
      }
    });
  }
}
