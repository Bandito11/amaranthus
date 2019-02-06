import { Injectable } from '@angular/core';
import { IRecord, IResponse } from 'src/app/common/models';

@Injectable({ providedIn: 'root' })
export class CSVProvider {

  constructor() { }

  exportCSV(tableRecords: IRecord[]): IResponse<string> {
    let response: IResponse<string> = {
      success: false,
      error: null,
      data: undefined
    };
    try {
      const data = this.createCSV(tableRecords);
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

  private createCSV(tableRecords: IRecord[]): string {
    let value = 'Id|Name|Attendance|Absence|Attendance %\n';
    try {
      tableRecords.map(tableRecord => {
        value += `${tableRecord.id}|`;
        value += `${tableRecord.fullName}|`;
        value += `${tableRecord.attendance}|`;
        value += `${tableRecord.absence}|`;
        value += `${tableRecord.percent}\n`;
      });
      return value;
    } catch (error) {
      return 'There are no students created!';
    }
  }

}
