import { Injectable } from '@angular/core';
import { ICalendar, IRecord, IStudent } from '../common/models';
import { AmaranthusDBProvider } from './amaranthus-db/amaranthus-db';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private db: AmaranthusDBProvider) { }

  async getAllActiveStudents(date: ICalendar): Promise<(IStudent & IRecord)[]>{
    const students = await this.db.getAllActiveStudents(date);
    return students;
  }
}
