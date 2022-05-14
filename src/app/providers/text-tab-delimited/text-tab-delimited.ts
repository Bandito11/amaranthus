import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { IRecord } from 'src/app/common/models';
import { recordType } from 'src/app/common/constants';
import * as XLSX from 'xlsx';
import { Storage } from '@ionic/storage';
import { getTableHeaders } from 'src/app/common/utils';

@Injectable({
  providedIn: 'root',
})
export class TextTabDelimitedProvider {
  constructor(private platform: Platform, private storage: Storage) {}

  async exportTextTabDelimited(opts: {
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
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(studentRecords);
    const text = XLSX.utils.sheet_to_txt(ws);
    const data = text.slice(2, text.length - 1);

    if (this.platform.is('desktop') || this.platform.is('mobileweb')) {
      const hiddenElement = document.createElement('a');
      hiddenElement.href = 'data:text/plain;charset=utf-8,' + encodeURI(data);
      hiddenElement.target = '_blank';

      //provide the name for the CSV file to be downloaded
      hiddenElement.download = `${opts.fileName}.txt`;
      hiddenElement.click();
    }
    return data;
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
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);
    const text = XLSX.utils.sheet_to_txt(ws);
    const textTabData = text.slice(2, text.length - 1);

    if (this.platform.is('desktop') || this.platform.is('mobileweb')) {
      const hiddenElement = document.createElement('a');
      hiddenElement.href =
        'data:text/plain;charset=utf-8,' + encodeURI(textTabData);
      hiddenElement.target = '_blank';

      //provide the name for the CSV file to be downloaded
      hiddenElement.download = `${opts.fileName}.txt`;
      hiddenElement.click();
    }
    return textTabData;
  }
}
