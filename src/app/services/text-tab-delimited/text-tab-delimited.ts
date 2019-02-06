import {Injectable} from '@angular/core';
import { IRecord, IResponse } from 'src/app/common/models';

@Injectable({ providedIn: 'root' })
export class TextTabDelimitedProvider {

  constructor() {}

  exportTextTabDelimited(tableRecords: IRecord[]): IResponse < string > {
    let response: IResponse < string > = {
      success: false,
      error: null,
      data: undefined
    };
      try {
        const data = this.createTextTabTable(tableRecords);
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

  private createTextTabTable(tableRecords: IRecord[]): string {
    let value = 'Id\tName\tAttendance\tAbsence\tAttendance %\n';
    try {
      tableRecords.map(tableRecord => {
        value += `${tableRecord.id}\t`;
        value += `${tableRecord.fullName}\t`;
        value += `${tableRecord.attendance}\t`;
        value += `${tableRecord.absence}\t`;
        value += `${tableRecord.percent}\n`;
      });
      return value;
    } catch (error) {
      return 'There are no students created!';
    }
  }
}
